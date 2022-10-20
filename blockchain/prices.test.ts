import BigNumber from 'bignumber.js'
import moment from 'moment'
import { Observable, of, throwError } from 'rxjs'

import { mockContextConnected } from '../helpers/mocks/context.mock'
import { getStateUnpacker } from '../helpers/testHelpers'
import { createOraclePriceData$, createTokenPriceInUSD$, OraclePriceData } from './prices'

describe('createTokenPriceInUSD$', () => {
  const tokenTickers$ = of({
    'mkr-usd': new BigNumber('929.26'),
    'steth-lido-staked-ether': new BigNumber('1462.87'),
    'wrapped-steth': new BigNumber('1573.93'),
  })

  it('maps token price to coinbase ticker', () => {
    const tokenPrice$ = createTokenPriceInUSD$(of(null), tokenTickers$, ['MKR'])

    const tokenPrice = getStateUnpacker(tokenPrice$)

    expect(tokenPrice().MKR.toString()).toBe('929.26')
  })

  it('maps token price to coin paprika ticker', () => {
    const tokenPrice$ = createTokenPriceInUSD$(of(null), tokenTickers$, ['STETH'])

    const tokenPrice = getStateUnpacker(tokenPrice$)

    expect(tokenPrice().STETH.toString()).toBe('1462.87')
  })

  it('maps token price to coingecko ticker', () => {
    const tokenPrice$ = createTokenPriceInUSD$(of(null), tokenTickers$, ['WSTETH'])

    const tokenPrice = getStateUnpacker(tokenPrice$)

    expect(tokenPrice().WSTETH.toString()).toBe('1573.93')
  })

  it('handles concurrent token price requests', () => {
    const tokenPrice$ = createTokenPriceInUSD$(of(null), tokenTickers$, ['MKR', 'STETH'])

    const tokenPrice = getStateUnpacker(tokenPrice$)

    expect(tokenPrice().MKR.toString()).toBe('929.26')
    expect(tokenPrice().STETH.toString()).toBe('1462.87')
  })

  describe('maps unknown quantities to undefined', () => {
    it('handles token with no ticker configured', () => {
      const tokenPrice$ = createTokenPriceInUSD$(of(null), tokenTickers$, ['BAT'])

      const tokenPrice = getStateUnpacker(tokenPrice$)

      expect(tokenPrice().BAT).toBeUndefined()
    })

    it('handles no response from service', () => {
      const tokenPrice$ = createTokenPriceInUSD$(of(null), throwError('some error'), ['MKR'])

      const tokenPrice = getStateUnpacker(tokenPrice$)

      expect(tokenPrice().MKR).toBeUndefined()
    })
  })
})

describe('createOraclePriceData$', () => {
  let getCodeStub: jest.Mock
  // TODO ŁW figure out how to replace callsFake with mockImplementation, or decide to keep using sinon with jest
  beforeEach(() => {
    getCodeStub = jest.spyOn(mockContextConnected.web3.eth, 'getCode').mockClear().mockImplementation()
      .callsFake((address, callback?: (error: Error, code: string) => void) => {
        // @ts-ignore
        callback && callback(null, Array(6001).fill(0).join(''))
      })
  })
  afterEach(() => {
    getCodeStub.mockRestore()
  })
  it('does not regress', () => {
    const oraclePriceData$ = createOraclePriceData$(
      of(mockContextConnected),
      () => of(['1000', true]),
      () => of(['100000000', true]),
      () => of(new BigNumber('1657811932000')),
      () => of(new BigNumber('3600000')),
      {
        token: 'ETH',
        requestedData: [
          'currentPrice',
          'nextPrice',
          'currentPriceUpdate',
          'nextPriceUpdate',
          'priceUpdateInterval',
          'isStaticPrice',
          'percentageChange',
        ],
      },
    )
    const result = getStateUnpacker(oraclePriceData$)()

    expect(result.currentPrice?.toString()).toBe('0.000000000000001')
    expect(result.nextPrice?.toString()).toBe('0.0000000001')
    expect(moment(result.currentPriceUpdate).unix()).toBe(1657811932)
    expect(moment(result.nextPriceUpdate).unix()).toBe(1657815532)
    expect(result.priceUpdateInterval?.toString()).toBe('3600000')
    expect(result.isStaticPrice).toBe(false)
    expect(result.percentageChange?.toString()).toBe('99999')
  })

  describe('only calling what it needs', () => {
    let pipes: {
      peek$: () => Observable<[string, boolean]>
      peep$: () => Observable<[string, boolean]>
      zzz$: () => Observable<BigNumber>
      hop$: () => Observable<BigNumber>
    }
    beforeEach(() => {
      pipes = {
        peek$: jest.fn().mockReturnValue(of(['1000', true])),
        peep$: jest.fn().mockReturnValue(of(['100000000', true])),
        zzz$: jest.fn().mockReturnValue(of(new BigNumber('1657811932000'))),
        hop$: jest.fn().mockReturnValue(of(new BigNumber('3600000'))),
      }
    })

    type TestCase = {
      requestedValue: keyof OraclePriceData
      runAssertion: (result: Partial<OraclePriceData>) => void
      streamsNotCalled: Array<keyof typeof pipes>
      streamsCalled: Array<keyof typeof pipes>
    }

    function runTest({ requestedValue, runAssertion, streamsCalled, streamsNotCalled }: TestCase) {
      const oraclePriceData$ = createOraclePriceData$(
        of(mockContextConnected),
        pipes.peek$,
        pipes.peep$,
        pipes.zzz$,
        pipes.hop$,
        {
          token: 'ETH',
          requestedData: [requestedValue],
        },
      )

      const result = getStateUnpacker(oraclePriceData$)()

      streamsCalled.forEach((stream$) => {
        // stream$
        expect(pipes[stream$]).toBeCalledTimes(1)
      })

      streamsNotCalled.forEach((stream$) => {
        // stream$
        expect(pipes[stream$]).not.toBeCalled()
      })
      runAssertion(result)
    }

    it('only calls peek$ for currentPrice', () => {
      runTest({
        requestedValue: 'currentPrice',
        runAssertion: (result) => expect(result.currentPrice?.toString()).toBe('0.000000000000001'),
        streamsCalled: ['peek$'],
        streamsNotCalled: ['peep$', 'zzz$', 'hop$'],
      })
    })

    it('calls peek$ and peep$ for nextPrice', () => {
      runTest({
        requestedValue: 'nextPrice',
        runAssertion: (result) => expect(result.nextPrice?.toString()).toBe('0.0000000001'),
        streamsCalled: ['peek$', 'peep$'],
        streamsNotCalled: ['zzz$', 'hop$'],
      })
    })

    it('calls zzz for currentPriceUpdate', () => {
      runTest({
        requestedValue: 'currentPriceUpdate',
        runAssertion: (result) => expect(moment(result.currentPriceUpdate).unix()).toBe(1657811932),
        streamsCalled: ['zzz$'],
        streamsNotCalled: ['hop$', 'peek$', 'peep$'],
      })
    })

    it('calls zzz$ and hop$ for currentPriceUpdate', () => {
      runTest({
        requestedValue: 'nextPriceUpdate',
        runAssertion: (result) => expect(moment(result.nextPriceUpdate).unix()).toBe(1657815532),
        streamsCalled: ['zzz$', 'hop$'],
        streamsNotCalled: ['peek$', 'peep$'],
      })
    })

    it('calls zzz$ and hop$ for priceUpdateInterval', () => {
      runTest({
        requestedValue: 'priceUpdateInterval',
        runAssertion: (result) => expect(result.priceUpdateInterval?.toString()).toBe('3600000'),
        streamsCalled: ['hop$'],
        streamsNotCalled: ['zzz$', 'peek$', 'peep$'],
      })
    })

    it('calls peek$ and peep$ for percentageChange', () => {
      runTest({
        requestedValue: 'percentageChange',
        runAssertion: (result) => expect(result.percentageChange?.toString()).toBe('99999'),
        streamsCalled: ['peek$', 'peep$'],
        streamsNotCalled: ['zzz$', 'hop$'],
      })
    })
  })
})
