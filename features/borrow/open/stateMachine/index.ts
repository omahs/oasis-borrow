import { of } from 'rxjs'
import { assign, createMachine } from 'xstate'

import {
  AllowanceInfo,
  BorrowPositionMachineContext,
  BorrowPositionMachineEvent,
  PositionInfo,
  ProxyInfo,
} from './types'

// Todo: Drop state-machine into UI
// Todo: Put Proxy logic in separate state machine
// Todo: Put Allowance logic in separate state machine
// Todo: Allow machine to accept adapter
// Todo: Plumb in real pipes

const borrowPositionStateMachine = createMachine(
  {
    schema: {
      context: {} as BorrowPositionMachineContext,
      events: {} as BorrowPositionMachineEvent,
      services: {} as {
        proxyService: { data: { type: 'PROXY_CREATED'; info: ProxyInfo } }
        allowanceService: { data: { type: 'ALLOWANCE_SET'; info: AllowanceInfo } }
        openPosition: { data: { type: 'POSITION_CREATED'; info: PositionInfo } }
      },
    },
    tsTypes: {} as import('./index.typegen').Typegen0,
    id: 'BorrowPosition',
    initial: 'editing',
    context: {
      allowanceAmount: undefined,
      allowanceHash: undefined,
      proxy: undefined,
      errorMessage: undefined,
      id: undefined,
    },
    states: {
      editing: {
        id: 'editing',
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
        id: 'createProxy',
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
                target: '#editing',
              },
            },
          },
          submitting: {
            invoke: {
              src: 'proxyService',
              onError: {
                target: 'idle',
                actions: 'assignErrorMessageToContext',
              },
            },
            on: {
              PROXY_CREATED: { actions: 'assignProxyToContext', target: 'complete' },
            },
          },
          complete: { type: 'final' },
        },
      },
      setAllowance: {
        id: 'setAllowance',
        onDone: {
          target: 'confirm',
        },
        initial: 'idle',
        states: {
          idle: {
            exit: ['clearErrorMessage'],
            on: {
              SET_ALLOWANCE: 'submitting',
              BACK: [{ target: '#createProxy', cond: 'proxyNotCreated' }, { target: '#editing' }],
            },
          },
          submitting: {
            invoke: {
              src: 'allowanceService',
              onError: {
                target: 'idle',
                actions: 'assignErrorMessageToContext',
              },
            },
            on: {
              ALLOWANCE_SET: { actions: 'assignAllowanceHashToContext', target: 'complete' },
            },
          },
          complete: { type: 'final' },
        },
      },
      confirm: {
        id: 'confirm',
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
                { target: '#setAllowance', cond: 'allowanceNotSet' },
                { target: '#createProxy', cond: 'proxyNotCreated' },
                { target: '#editing' },
              ],
            },
          },
          submitting: {
            invoke: {
              src: 'openPosition',
              onError: {
                target: 'idle',
                actions: 'assignErrorMessageToContext',
              },
            },
            on: {
              POSITION_CREATED: { actions: 'assignPositionHashToContext', target: 'complete' },
            },
          },
          complete: { type: 'final' },
        },
      },
      success: {
        id: 'success',
        type: 'final',
      },
    },
  },
  {
    services: {
      proxyService: () => of({ type: 'PROXY_CREATED', info: { proxyAddress: `0xProxyAddress` } }),
      allowanceService: () => of({ type: 'ALLOWANCE_SET', info: { txHash: `0xAllowanceSuccess` } }),
      openPosition: () => of({ type: 'POSITION_CREATED', info: { txHash: `0xPositionCreated` } }),
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
          proxy: event.info.proxyAddress,
        }
      }),
      assignAllowanceHashToContext: assign((context, event) => {
        if (event.type !== 'ALLOWANCE_SET') return {}
        return {
          allowanceHash: event.info.txHash,
        }
      }),
      assignPositionHashToContext: assign((context, event) => {
        if (event.type !== 'POSITION_CREATED') return {}
        return {
          positionHash: event.info.txHash,
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
      clearErrorMessage: assign(() => {
        return { errorMessage: undefined }
      }) as any,
      assignErrorMessageToContext: assign((context, event: any) => {
        return {
          errorMessage: event.data?.message || 'An unknown error occurred',
        }
      }),
    },
  },
)

export { borrowPositionStateMachine }
