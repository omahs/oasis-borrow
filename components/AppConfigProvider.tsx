import axios from 'axios'
import { AppSpinner } from 'helpers/AppSpinner'
import React, { useContext, useEffect, useState } from 'react'

import { WithChildren } from '../helpers/types'

type AppConfigContext = {
  translations: Record<string, Record<string, string>>
}

export const appConfigContext = React.createContext<AppConfigContext | undefined>(undefined)

export function isAppConfigContextAvailable(): boolean {
  return !!useContext(appConfigContext)
}

export function useAppConfigContext(): AppConfigContext {
  const acc = useContext(appConfigContext)
  if (!acc) {
    throw new Error('AppConfigContext not available!')
  }
  return acc
}

export function AppConfigContextProvider({ children }: WithChildren) {
  const [context, setContext] = useState<AppConfigContext | undefined>(undefined)
  const [isConfigLoading, setIsConfigLoading] = useState(true)

  useEffect(() => {
    void axios({
      url: '/api/translations',
      method: 'GET',
    })
      .then(({ data }) => {
        setContext({ translations: data })
        setIsConfigLoading(false)
      })
      .catch((e) => {
        console.error(e)
      })
  }, [])

  return (
    <appConfigContext.Provider value={context}>
      {isConfigLoading ? <AppSpinner /> : children}
    </appConfigContext.Provider>
  )
}
