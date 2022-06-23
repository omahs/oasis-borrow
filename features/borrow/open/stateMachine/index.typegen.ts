// This file was automatically generated. Edits will be overwritten

export interface Typegen0 {
  '@@xstate/typegen': true
  eventsCausingActions: {
    assignDepositToContext: 'UPDATE_DEPOSIT' | 'UPDATE_DEPOSIT_MAX'
    assignDepositUSDToContext: 'UPDATE_DEPOSIT_USD'
    assignGenerateToContext: 'UPDATE_GENERATE' | 'UPDATE_GENERATE_MAX'
    assignGenerateVisibilityToContext: 'TOGGLE_GENERATE'
    assignErrorMessageToContext:
      | 'error.platform.BorrowPosition.createProxy.submitting:invocation[0]'
      | 'error.platform.BorrowPosition.setAllowance.submitting:invocation[0]'
      | 'error.platform.BorrowPosition.confirm.submitting:invocation[0]'
    assignProxyToContext: 'PROXY_CREATED'
    assignAllowanceHashToContext: 'ALLOWANCE_SET'
    assignPositionHashToContext: 'POSITION_CREATED'
    clearErrorMessage: 'xstate.init'
  }
  internalEvents: {
    'error.platform.BorrowPosition.createProxy.submitting:invocation[0]': {
      type: 'error.platform.BorrowPosition.createProxy.submitting:invocation[0]'
      data: unknown
    }
    'error.platform.BorrowPosition.setAllowance.submitting:invocation[0]': {
      type: 'error.platform.BorrowPosition.setAllowance.submitting:invocation[0]'
      data: unknown
    }
    'error.platform.BorrowPosition.confirm.submitting:invocation[0]': {
      type: 'error.platform.BorrowPosition.confirm.submitting:invocation[0]'
      data: unknown
    }
    'xstate.init': { type: 'xstate.init' }
  }
  invokeSrcNameMap: {
    proxyService: 'done.invoke.BorrowPosition.createProxy.submitting:invocation[0]'
    allowanceService: 'done.invoke.BorrowPosition.setAllowance.submitting:invocation[0]'
    openPosition: 'done.invoke.BorrowPosition.confirm.submitting:invocation[0]'
  }
  missingImplementations: {
    actions: never
    services: never
    guards: never
    delays: never
  }
  eventsCausingServices: {
    proxyService: 'CREATE_PROXY'
    allowanceService: 'SET_ALLOWANCE'
    openPosition: 'CONFIRM'
  }
  eventsCausingGuards: {
    proxyNotCreated: 'done.state.editing' | 'BACK'
    allowanceNotSet: 'done.state.editing' | 'done.state.createProxy' | 'BACK'
  }
  eventsCausingDelays: {}
  matchesStates:
    | 'editing'
    | 'editing.idle'
    | 'editing.complete'
    | 'createProxy'
    | 'createProxy.idle'
    | 'createProxy.submitting'
    | 'createProxy.complete'
    | 'setAllowance'
    | 'setAllowance.idle'
    | 'setAllowance.submitting'
    | 'setAllowance.complete'
    | 'confirm'
    | 'confirm.idle'
    | 'confirm.submitting'
    | 'confirm.complete'
    | 'success'
    | {
        editing?: 'idle' | 'complete'
        createProxy?: 'idle' | 'submitting' | 'complete'
        setAllowance?: 'idle' | 'submitting' | 'complete'
        confirm?: 'idle' | 'submitting' | 'complete'
      }
  tags: never
}
