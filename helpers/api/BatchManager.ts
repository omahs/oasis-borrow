import { Network } from '@ethersproject/networks/src.ts/types'
import crypto from 'crypto'
import { fetchJson } from 'ethers/lib/utils'

export interface Request {
  method: any
  params: any
  network: Network
  id: number
  jsonrpc: string
}

interface Cache {
  getStats: () => Promise<string>
  get: (hash: string) => Promise<string | null>
  set: (hash: string, entry: string) => void
}

interface Options {
  fetchJsonFn?: typeof fetchJson
  debug?: boolean
}

export class BatchManager {
  private _cache: Cache
  private _connection: string
  private _fetchJson: typeof fetchJson
  private _debug: boolean | undefined

  constructor(url: string, cache: Cache, options?: Options) {
    this._cache = cache
    this._connection = url
    this._fetchJson = options?.fetchJsonFn || fetchJson
    this._debug = options?.debug
  }

  private _createHash(request: Request) {
    const requestExtract = {
      method: request.method,
      params: { data: request.params[0].data, to: request.params[0].to },
      network: request.network,
    }

    const hashString = JSON.stringify(requestExtract)
    const hash = crypto.createHash('sha256').update(hashString).digest('hex')

    return hash
  }

  async batchCall(batchCallData: Array<Request>) {
    // 1. Extract cache hits
    const promises = batchCallData.map((callData) => this._cache.get(this._createHash(callData)))
    const batchResults: Array<{
      requestIdx: number
      data: unknown
      callData: Request
      fromCache: boolean
    }> = (await Promise.all(promises)).map((cachedResult, index) => {
      return {
        data: cachedResult,
        callData: batchCallData[index],
        fromCache: !!cachedResult,
        requestIdx: index,
      }
    })

    // 2. Extract cache miss requests
    const batchRequests: Array<Request> = batchResults
      .filter((call) => !call.fromCache)
      .map((call) => call.callData)

    // 3. Make the call to infura
    let batchResponse: Array<{ data: unknown; error?: Error }> = []
    if (batchRequests.length > 0) {
      batchResponse = await this._fetchJson(this._connection, JSON.stringify(batchRequests)).then(
        (responses) => {
          return responses.map(
            (response: { result?: string; error: Error } | null, index: number) => {
              if (response?.result) {
                this._cache.set(this._createHash(batchRequests[index] as Request), response.result)
                return { data: response?.result }
              }
              if (response?.error) {
                return { error: new Error(response?.error.message) }
              }
              return null
            },
          )
        },
      )
    }

    // 4. Print stats (Debug mode only)
    this._debug && this._cache.getStats().then(console.log)

    // 5. Integrate responses into batchResults
    return batchResults.map((result) => {
      if (result.fromCache) {
        return result
      } else {
        return { ...result, ...batchResponse.shift() }
      }
    })
  }
}
