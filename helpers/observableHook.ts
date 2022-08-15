import * as Sentry from '@sentry/nextjs'
import { useEffect, useState } from 'react'
import { Observable } from 'rxjs'

export type Unpack<T extends Observable<any>> = T extends Observable<infer U> ? U : never

function raiseObservableErrorInSentry(e: any) {
  if (e instanceof Error) {
    Sentry.captureException(e)
  } else {
    Sentry.captureException(new Error(JSON.stringify(e)))
  }
}

if (typeof window !== 'undefined') {
  // @ts-ignore
  window.subscriptions = {}
}

export function useObservable<O extends Observable<any>>(o$: O, subs = 'unknown'): [Unpack<O> | undefined, any] {
  const [value, setValue] = useState<Unpack<O> | undefined>(undefined)
  const [error, setError] = useState<any>(undefined)
  // @ts-ignore
  if (!window.subscriptions[subs]) {
    // @ts-ignore
    window.subscriptions[subs] = 0
  }
  useEffect(() => {
    const subName = subs
    console.log(`send - subscribing ${subName}`)
    // @ts-ignore
    window.subscriptions[subName]++
    const subscription = o$.subscribe(
      (v: Unpack<O>) => setValue(v),
      (e) => {
        setError(e)
        raiseObservableErrorInSentry(e)
      },
    )
    return () => {
      // @ts-ignore
      window.subscriptions[subName]--
      console.log(`send - unsub ${subName}`)
      subscription.unsubscribe()
    }
  }, [o$])

  return [value, error]
}
