import { BigNumber } from 'bignumber.js'
import { maxUint256 } from 'blockchain/calls/erc20'
import { createIlkDataChange$, IlkData } from 'blockchain/ilks'
import { Context } from 'blockchain/network'
import { createVaultChange$, Vault } from 'blockchain/vaults'
import { TxHelpers } from 'components/AppContext'
import { PriceInfo, priceInfoChange$ } from 'features/shared/priceInfo'
import { zero } from 'helpers/zero'
import { curry } from 'lodash'
import { combineLatest, merge, Observable, of, Subject } from 'rxjs'
import { first, map, scan, shareReplay, switchMap } from 'rxjs/operators'

import { BalanceInfo, balanceInfoChange$ } from '../shared/balanceInfo'
import {
  applyManageVaultAllowance,
  ManageVaultAllowanceChange,
} from './manageMultiplyVaultAllowances'
import {
  applyManageVaultCalculations,
  defaultManageVaultCalculations,
  ManageVaultCalculations,
} from './manageMultiplyVaultCalculations'
import {
  applyManageVaultConditions,
  applyManageVaultStageCategorisation,
  defaultManageVaultConditions,
  ManageVaultConditions,
} from './manageMultiplyVaultConditions'
import {
  applyManageVaultEnvironment,
  ManageVaultEnvironmentChange,
} from './manageMultiplyVaultEnvironment'
import { applyManageVaultForm, ManageVaultFormChange } from './manageMultiplyVaultForm'
import { applyManageVaultInput, ManageVaultInputChange } from './manageMultiplyVaultInput'
import {
  applyManageVaultSummary,
  defaultManageVaultSummary,
  ManageVaultSummary,
} from './manageMultiplyVaultSummary'
import {
  applyManageVaultTransaction,
  createProxy,
  ManageVaultTransactionChange,
  setCollateralAllowance,
  setDaiAllowance,
} from './manageMultiplyVaultTransactions'
import {
  applyManageVaultTransition,
  ManageVaultTransitionChange,
  progressManage,
} from './manageMultiplyVaultTransitions'
import {
  ManageVaultErrorMessage,
  ManageVaultWarningMessage,
  validateErrors,
  validateWarnings,
} from './manageMultiplyVaultValidations'

interface ManageVaultInjectedOverrideChange {
  kind: 'injectStateOverride'
  stateToOverride: Partial<ManageMultiplyVaultState>
}

function applyManageVaultInjectedOverride(
  change: ManageVaultChange,
  state: ManageMultiplyVaultState,
) {
  if (change.kind === 'injectStateOverride') {
    return {
      ...state,
      ...change.stateToOverride,
    }
  }
  return state
}

export type ManageVaultChange =
  | ManageVaultInputChange
  | ManageVaultFormChange
  | ManageVaultAllowanceChange
  | ManageVaultTransitionChange
  | ManageVaultTransactionChange
  | ManageVaultEnvironmentChange
  | ManageVaultInjectedOverrideChange

function apply(state: ManageMultiplyVaultState, change: ManageVaultChange) {
  const s1 = applyManageVaultInput(change, state)
  const s2 = applyManageVaultForm(change, s1)
  const s3 = applyManageVaultAllowance(change, s2)
  const s4 = applyManageVaultTransition(change, s3)
  const s5 = applyManageVaultTransaction(change, s4)
  const s6 = applyManageVaultEnvironment(change, s5)
  const s7 = applyManageVaultInjectedOverride(change, s6)
  const s8 = applyManageVaultCalculations(s7)
  const s9 = applyManageVaultStageCategorisation(s8)
  const s10 = applyManageVaultConditions(s9)
  return applyManageVaultSummary(s10)
}

export type ManageMultiplyVaultEditingStage = 'adjustPosition' | 'otherActions'

export type ManageMultiplyVaultStage =
  | ManageMultiplyVaultEditingStage
  | 'proxyWaitingForConfirmation'
  | 'proxyWaitingForApproval'
  | 'proxyInProgress'
  | 'proxyFailure'
  | 'proxySuccess'
  | 'collateralAllowanceWaitingForConfirmation'
  | 'collateralAllowanceWaitingForApproval'
  | 'collateralAllowanceInProgress'
  | 'collateralAllowanceFailure'
  | 'collateralAllowanceSuccess'
  | 'daiAllowanceWaitingForConfirmation'
  | 'daiAllowanceWaitingForApproval'
  | 'daiAllowanceInProgress'
  | 'daiAllowanceFailure'
  | 'daiAllowanceSuccess'
  | 'manageWaitingForConfirmation'
  | 'manageWaitingForApproval'
  | 'manageInProgress'
  | 'manageFailure'
  | 'manageSuccess'

export type MainAction = 'buy' | 'sell'
export interface MutableManageVaultState {
  stage: ManageMultiplyVaultStage
  originalEditingStage: ManageMultiplyVaultEditingStage
  showDepositAndGenerateOption: boolean
  showPaybackAndWithdrawOption: boolean
  depositAmount?: BigNumber
  depositAmountUSD?: BigNumber
  withdrawAmount?: BigNumber
  withdrawAmountUSD?: BigNumber
  generateAmount?: BigNumber
  paybackAmount?: BigNumber
  collateralAllowanceAmount?: BigNumber
  daiAllowanceAmount?: BigNumber
  selectedCollateralAllowanceRadio: 'unlimited' | 'depositAmount' | 'custom'
  selectedDaiAllowanceRadio: 'unlimited' | 'paybackAmount' | 'custom'

  mainAction: MainAction
  showSliderController: boolean
  slider?: BigNumber
  buyAmount?: BigNumber
  buyAmountUSD?: BigNumber
  sellAmount?: BigNumber
  sellAmountUSD?: BigNumber
}

export interface ManageVaultEnvironment {
  account?: string
  accountIsController: boolean
  proxyAddress?: string
  collateralAllowance?: BigNumber
  daiAllowance?: BigNumber
  vault: Vault
  ilkData: IlkData
  balanceInfo: BalanceInfo
  priceInfo: PriceInfo
}

interface ManageVaultFunctions {
  progress?: () => void
  regress?: () => void
  toggle?: () => void
  toggleDepositAndGenerateOption?: () => void
  togglePaybackAndWithdrawOption?: () => void
  updateDeposit?: (depositAmount?: BigNumber) => void
  updateDepositUSD?: (depositAmountUSD?: BigNumber) => void
  updateDepositMax?: () => void
  updateGenerate?: (generateAmount?: BigNumber) => void
  updateGenerateMax?: () => void
  updateWithdraw?: (withdrawAmount?: BigNumber) => void
  updateWithdrawUSD?: (withdrawAmountUSD?: BigNumber) => void
  updateWithdrawMax?: () => void
  updatePayback?: (paybackAmount?: BigNumber) => void
  updatePaybackMax?: () => void
  updateCollateralAllowanceAmount?: (amount?: BigNumber) => void
  setCollateralAllowanceAmountUnlimited?: () => void
  setCollateralAllowanceAmountToDepositAmount?: () => void
  resetCollateralAllowanceAmount?: () => void
  updateDaiAllowanceAmount?: (amount?: BigNumber) => void
  setDaiAllowanceAmountUnlimited?: () => void
  setDaiAllowanceAmountToPaybackAmount?: () => void
  resetDaiAllowanceAmount?: () => void
  injectStateOverride: (state: Partial<MutableManageVaultState>) => void

  toggleSliderController?: () => void
  adjustSlider?: (value: BigNumber) => void
  setMainAction?: (mainAction: MainAction) => void
  updateBuy?: (buyAmount?: BigNumber) => void
  updateBuyUSD?: (buyAmountUSD?: BigNumber) => void
  updateBuyMax?: () => void
  updateSell?: (sellAmount?: BigNumber) => void
  updateSellUSD?: (sellAmountUSD?: BigNumber) => void
  updateSellMax?: () => void
}

interface ManageVaultTxInfo {
  collateralAllowanceTxHash?: string
  daiAllowanceTxHash?: string
  proxyTxHash?: string
  manageTxHash?: string
  txError?: any
  etherscan?: string
  proxyConfirmations?: number
  safeConfirmations: number
}

export type ManageMultiplyVaultState = MutableManageVaultState &
  ManageVaultCalculations &
  ManageVaultConditions &
  ManageVaultEnvironment &
  ManageVaultFunctions &
  ManageVaultTxInfo & {
    errorMessages: ManageVaultErrorMessage[]
    warningMessages: ManageVaultWarningMessage[]
    summary: ManageVaultSummary
  }

function addTransitions(
  txHelpers$: Observable<TxHelpers>,
  proxyAddress$: Observable<string | undefined>,
  change: (ch: ManageVaultChange) => void,
  state: ManageMultiplyVaultState,
): ManageMultiplyVaultState {
  if (state.stage === 'adjustPosition' || state.stage === 'otherActions') {
    return {
      ...state,
      updateDeposit: (depositAmount?: BigNumber) => {
        change({ kind: 'deposit', depositAmount })
      },
      updateDepositUSD: (depositAmountUSD?: BigNumber) =>
        change({ kind: 'depositUSD', depositAmountUSD }),
      updateDepositMax: () => change({ kind: 'depositMax' }),
      updateGenerate: (generateAmount?: BigNumber) => {
        change({ kind: 'generate', generateAmount })
      },
      updateGenerateMax: () => change({ kind: 'generateMax' }),
      updateWithdraw: (withdrawAmount?: BigNumber) => {
        change({ kind: 'withdraw', withdrawAmount })
      },
      updateWithdrawUSD: (withdrawAmountUSD?: BigNumber) =>
        change({ kind: 'withdrawUSD', withdrawAmountUSD }),
      updateWithdrawMax: () => change({ kind: 'withdrawMax' }),
      updatePayback: (paybackAmount?: BigNumber) => {
        change({ kind: 'payback', paybackAmount })
      },
      updatePaybackMax: () => change({ kind: 'paybackMax' }),
      toggleDepositAndGenerateOption: () =>
        change({
          kind: 'toggleDepositAndGenerateOption',
        }),
      togglePaybackAndWithdrawOption: () =>
        change({
          kind: 'togglePaybackAndWithdrawOption',
        }),
      toggle: () => change({ kind: 'toggleEditing' }),
      progress: () => change({ kind: 'progressEditing' }),
      toggleSliderController: () => change({ kind: 'toggleSliderController' }),
      adjustSlider: (slider: BigNumber) => change({ kind: 'slider', slider }),
      setMainAction: (mainAction: MainAction) => change({ kind: 'mainAction', mainAction }),
      updateBuy: (buyAmount?: BigNumber) => change({ kind: 'buyAmount', buyAmount }),
      updateBuyUSD: (buyAmountUSD?: BigNumber) => change({ kind: 'buyAmountUSD', buyAmountUSD }),
      updateBuyMax: () => change({ kind: 'buyMax' }),
      updateSell: (sellAmount?: BigNumber) => change({ kind: 'sellAmount', sellAmount }),
      updateSellUSD: (sellAmountUSD?: BigNumber) =>
        change({ kind: 'sellAmountUSD', sellAmountUSD }),
      updateSellMax: () => change({ kind: 'sellMax' }),
    }
  }

  if (state.stage === 'proxyWaitingForConfirmation' || state.stage === 'proxyFailure') {
    return {
      ...state,
      progress: () => createProxy(txHelpers$, proxyAddress$, change, state),
      regress: () => change({ kind: 'backToEditing' }),
    }
  }

  if (state.stage === 'proxySuccess') {
    return {
      ...state,
      progress: () => change({ kind: 'progressProxy' }),
    }
  }

  if (
    state.stage === 'collateralAllowanceWaitingForConfirmation' ||
    state.stage === 'collateralAllowanceFailure'
  ) {
    return {
      ...state,
      updateCollateralAllowanceAmount: (collateralAllowanceAmount?: BigNumber) =>
        change({
          kind: 'collateralAllowance',
          collateralAllowanceAmount,
        }),
      setCollateralAllowanceAmountUnlimited: () => change({ kind: 'collateralAllowanceUnlimited' }),
      setCollateralAllowanceAmountToDepositAmount: () =>
        change({
          kind: 'collateralAllowanceAsDepositAmount',
        }),
      resetCollateralAllowanceAmount: () =>
        change({
          kind: 'collateralAllowanceReset',
        }),
      progress: () => setCollateralAllowance(txHelpers$, change, state),
      regress: () => change({ kind: 'regressCollateralAllowance' }),
    }
  }

  if (state.stage === 'collateralAllowanceSuccess') {
    return {
      ...state,
      progress: () => change({ kind: 'progressCollateralAllowance' }),
    }
  }

  if (
    state.stage === 'daiAllowanceWaitingForConfirmation' ||
    state.stage === 'daiAllowanceFailure'
  ) {
    return {
      ...state,
      updateDaiAllowanceAmount: (daiAllowanceAmount?: BigNumber) =>
        change({ kind: 'daiAllowance', daiAllowanceAmount }),
      setDaiAllowanceAmountUnlimited: () => change({ kind: 'daiAllowanceUnlimited' }),
      setDaiAllowanceAmountToPaybackAmount: () => change({ kind: 'daiAllowanceAsPaybackAmount' }),
      resetDaiAllowanceAmount: () =>
        change({
          kind: 'daiAllowanceReset',
        }),
      progress: () => setDaiAllowance(txHelpers$, change, state),
      regress: () => change({ kind: 'regressDaiAllowance' }),
    }
  }

  if (state.stage === 'daiAllowanceSuccess') {
    return {
      ...state,
      progress: () => change({ kind: 'backToEditing' }),
    }
  }

  if (state.stage === 'manageWaitingForConfirmation' || state.stage === 'manageFailure') {
    return {
      ...state,
      progress: () => progressManage(txHelpers$, state, change),
      regress: () => change({ kind: 'backToEditing' }),
    }
  }

  if (state.stage === 'manageSuccess') {
    return {
      ...state,
      progress: () => change({ kind: 'resetToEditing' }),
    }
  }

  return state
}

export const defaultMutableManageVaultState: MutableManageVaultState = {
  stage: 'adjustPosition' as const,
  originalEditingStage: 'adjustPosition' as const,
  showDepositAndGenerateOption: false,
  showPaybackAndWithdrawOption: false,
  collateralAllowanceAmount: maxUint256,
  daiAllowanceAmount: maxUint256,
  selectedCollateralAllowanceRadio: 'unlimited' as const,
  selectedDaiAllowanceRadio: 'unlimited' as const,
  showSliderController: true,
  slider: zero,
  mainAction: 'buy',
}

export function createManageMultiplyVault$(
  context$: Observable<Context>,
  txHelpers$: Observable<TxHelpers>,
  proxyAddress$: (address: string) => Observable<string | undefined>,
  allowance$: (token: string, owner: string, spender: string) => Observable<BigNumber>,
  priceInfo$: (token: string) => Observable<PriceInfo>,
  balanceInfo$: (token: string, address: string | undefined) => Observable<BalanceInfo>,
  ilkData$: (ilk: string) => Observable<IlkData>,
  vault$: (id: BigNumber) => Observable<Vault>,
  id: BigNumber,
): Observable<ManageMultiplyVaultState> {
  return context$.pipe(
    switchMap((context) => {
      const account = context.status === 'connected' ? context.account : undefined
      return vault$(id).pipe(
        first(),
        switchMap((vault) => {
          return combineLatest(
            priceInfo$(vault.token),
            balanceInfo$(vault.token, account),
            ilkData$(vault.ilk),
            account ? proxyAddress$(account) : of(undefined),
          ).pipe(
            first(),
            switchMap(([priceInfo, balanceInfo, ilkData, proxyAddress]) => {
              const collateralAllowance$ =
                account && proxyAddress
                  ? allowance$(vault.token, account, proxyAddress)
                  : of(undefined)
              const daiAllowance$ =
                account && proxyAddress ? allowance$('DAI', account, proxyAddress) : of(undefined)

              return combineLatest(collateralAllowance$, daiAllowance$).pipe(
                first(),
                switchMap(([collateralAllowance, daiAllowance]) => {
                  const change$ = new Subject<ManageVaultChange>()

                  function change(ch: ManageVaultChange) {
                    change$.next(ch)
                  }

                  // NOTE: Not to be used in production/dev, test only
                  function injectStateOverride(stateToOverride: Partial<MutableManageVaultState>) {
                    return change$.next({ kind: 'injectStateOverride', stateToOverride })
                  }

                  const initialState: ManageMultiplyVaultState = {
                    ...defaultMutableManageVaultState,
                    ...defaultManageVaultCalculations,
                    ...defaultManageVaultConditions,
                    vault,
                    priceInfo,
                    balanceInfo,
                    ilkData,
                    account,
                    proxyAddress,
                    collateralAllowance,
                    daiAllowance,
                    safeConfirmations: context.safeConfirmations,
                    etherscan: context.etherscan.url,
                    errorMessages: [],
                    warningMessages: [],
                    summary: defaultManageVaultSummary,
                    injectStateOverride,
                  }

                  const environmentChanges$ = merge(
                    priceInfoChange$(priceInfo$, vault.token),
                    balanceInfoChange$(balanceInfo$, vault.token, account),
                    createIlkDataChange$(ilkData$, vault.ilk),
                    createVaultChange$(vault$, id),
                  )

                  const connectedProxyAddress$ = account ? proxyAddress$(account) : of(undefined)

                  return merge(change$, environmentChanges$).pipe(
                    scan(apply, initialState),
                    map(validateErrors),
                    map(validateWarnings),
                    map(curry(addTransitions)(txHelpers$, connectedProxyAddress$, change)),
                  )
                }),
              )
            }),
          )
        }),
      )
    }),
    shareReplay(1),
  )
}