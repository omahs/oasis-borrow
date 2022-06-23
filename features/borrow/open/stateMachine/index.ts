import { of } from 'rxjs'
import { assign, createMachine } from 'xstate'

export interface BorrowPositionMachineContext {
  depositAmount?: number
  depositAmountUSD?: number
  generateAmount?: number
  generateOn?: boolean
  proxy?: string
  allowanceAmount?: number
  allowanceHash?: string
  positionHash?: string
  errorMessage?: string
}

interface ProxyInfo {
  address: string
}

interface AllowanceAmountInfo {
  amount: number
}

interface AllowanceInfo {
  hash: string
}

interface DepositInfo {
  amount: number
}

interface DepositUSDInfo {
  amount: number
}

interface GenerateInfo {
  amount: number
}

interface ToggleGenerateInfo {
  generateOn: boolean
}

interface PositionInfo {
  hash: string
}

export type BorrowPositionMachineEvent =
  | {
      type: 'BACK'
    }
  | {
      type: 'EDITING'
    }
  | {
      type: 'UPDATE_DEPOSIT'
      info: DepositInfo
    }
  | {
      type: 'UPDATE_DEPOSIT_USD'
      info: DepositUSDInfo
    }
  | {
      type: 'UPDATE_DEPOSIT_MAX'
      info: DepositInfo
    }
  | {
      type: 'UPDATE_GENERATE'
      info: GenerateInfo
    }
  | {
      type: 'UPDATE_GENERATE_MAX'
      info: GenerateInfo
    }
  | {
      type: 'TOGGLE_GENERATE'
      info: ToggleGenerateInfo
    }
  | {
      type: 'POSITION_CONFIGURED'
    }
  | {
      type: 'CREATE_PROXY'
    }
  | {
      type: 'PROXY_CREATED'
      info: ProxyInfo
    }
  | {
      type: 'SET_ALLOWANCE_AMOUNT'
      info: AllowanceAmountInfo
    }
  | {
      type: 'SET_ALLOWANCE'
    }
  | {
      type: 'ALLOWANCE_SET'
      info: AllowanceInfo
    }
  | {
      type: 'CONFIRM'
    }
  | {
      type: 'POSITION_CREATED'
      info: PositionInfo
    }

const borrowPositionStateMachine = createMachine<
  BorrowPositionMachineContext,
  BorrowPositionMachineEvent
>(
  {
    id: 'BorrowPosition',
    initial: 'editing',
    context: {
      allowanceAmount: 0,
      allowanceHash: undefined,
      proxy: undefined,
      errorMessage: undefined,
    },
    states: {
      editing: {
        initial: 'idle',
        onDone: [
          { target: 'createProxy', cond: 'proxyNotCreated' },
          { target: 'setAllowance', cond: 'allowanceNotSet' },
          { target: 'confirm' },
        ],
        states: {
          idle: {
            exit: ['clearErrorMessage'],
            on: {
              POSITION_CONFIGURED: {
                target: 'complete',
              },
            },
          },
          complete: { type: 'final' },
        },
        on: {
          UPDATE_DEPOSIT: { actions: 'assignDepositToContext' },
          UPDATE_DEPOSIT_USD: { actions: 'assignDepositUSDToContext' },
          UPDATE_DEPOSIT_MAX: { actions: 'assignDepositToContext' },
          UPDATE_GENERATE: { actions: 'assignGenerateToContext' },
          UPDATE_GENERATE_MAX: { actions: 'assignGenerateToContext' },
          TOGGLE_GENERATE: { actions: 'assignGenerateVisibilityToContext' },
        },
      },
      createProxy: {
        onDone: [{ target: 'setAllowance', cond: 'allowanceNotSet' }, { target: 'confirm' }],
        initial: 'idle',
        states: {
          idle: {
            exit: ['clearErrorMessage'],
            on: {
              CREATE_PROXY: {
                target: 'submitting',
              },
              BACK: {
                target: 'editing',
              },
            },
          },
          submitting: {
            invoke: {
              src: 'createProxy',
              onDone: {
                target: 'complete',
                actions: 'assignProxyToContext',
              },
              // onError: {
              //   target: 'idle',
              //   actions: 'assignErrorMessageToContext',
              // },
            },
          },
          complete: { type: 'final' },
        },
      },
      setAllowance: {
        onDone: {
          target: 'confirm',
        },
        initial: 'idle',
        states: {
          idle: {
            exit: ['clearErrorMessage'],
            on: {
              SET_ALLOWANCE: 'submitting',
              BACK: [{ target: 'createProxy', cond: 'proxyNotCreated' }, { target: 'confirm' }],
            },
          },
          submitting: {
            invoke: {
              src: 'setAllowance',
              onDone: {
                target: 'complete',
                actions: 'assignAllowanceHashToContext',
              },
              // onError: {
              //   target: 'idle',
              //   actions: 'assignErrorMessageToContext',
              // },
            },
          },
          complete: { type: 'final' },
        },
      },
      confirm: {
        onDone: {
          target: 'success',
        },
        initial: 'idle',
        states: {
          idle: {
            exit: ['clearErrorMessage'],
            on: {
              CONFIRM: 'submitting',
              BACK: [
                { target: 'setAllowance', cond: 'allowanceNotSet' },
                { target: 'createProxy', cond: 'proxyNotCreated' },
                { target: 'editing' },
              ],
            },
          },
          submitting: {
            invoke: {
              src: 'openPosition',
              onDone: {
                target: 'complete',
                actions: 'assign',
              },
              // onError: {
              //   target: 'idle',
              //   actions: 'assignErrorMessageToContext',
              // },
            },
          },
          complete: { type: 'final' },
        },
      },
      success: {
        type: 'final',
      },
    },
  },
  {
    services: {
      createProxy: (context, event) =>
        of({ type: 'PROXY_CREATED', value: { address: `0xProxyAddress` } }),
      setAllowance: (context, event) =>
        of({ type: 'ALLOWANCE_SET', value: { hash: `0xAllowanceSuccess` } }),
      openPosition: (context, event) =>
        of({ type: 'POSITION_CREATED', value: { hash: `0xPositionCreated` } }),
    },
    guards: {
      allowanceNotSet: (context) => {
        return !context.allowanceHash
      },
      proxyNotCreated: (context) => {
        return !context.proxy
      },
    },
    actions: {
      assignProxyToContext: assign((context, event) => {
        if (event.type !== 'PROXY_CREATED') return {}
        return {
          proxy: event.info.address,
        }
      }),
      assignAllowanceHashToContext: assign((context, event) => {
        if (event.type !== 'ALLOWANCE_SET') return {}
        return {
          proxy: event.info.hash,
        }
      }),
      assignPositionHashToContext: assign((context, event) => {
        if (event.type !== 'POSITION_CREATED') return {}
        return {
          positionHash: event.info.hash,
        }
      }),
      assignDepositToContext: assign((context, event) => {
        if (event.type !== 'UPDATE_DEPOSIT') return {}
        return {
          depositAmount: event.info.amount,
        }
      }),

      assignDepositUSDToContext: assign((context, event) => {
        if (event.type !== 'UPDATE_DEPOSIT_USD') return {}
        return {
          depositAmountUSD: event.info.amount,
        }
      }),
      assignGenerateToContext: assign((context, event) => {
        if (event.type !== 'UPDATE_GENERATE') return {}
        return {
          generateAmount: event.info.amount,
        }
      }),
      assignGenerateVisibilityToContext: assign((context, event) => {
        if (event.type !== 'TOGGLE_GENERATE') return {}
        return {
          generateOn: event.info.generateOn,
        }
      }),
      clearErrorMessage: assign((context, event) => {
        return { errorMessage: undefined }
      }),
    },
  },
)

export { borrowPositionStateMachine }
