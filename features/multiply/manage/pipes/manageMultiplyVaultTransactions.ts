import { TxStatus } from '@oasisdex/transactions'
import { BigNumber } from 'bignumber.js'
import { approve, ApproveData } from 'blockchain/calls/erc20'
import { createDsProxy, CreateDsProxyData } from 'blockchain/calls/proxy'
import {
  adjustMultiplyVault,
  closeVaultCall,
  MultiplyAdjustData,
} from 'blockchain/calls/proxyActions/proxyActions'
import { TxMetaKind } from 'blockchain/calls/txMeta'
import { Context } from 'blockchain/network'
import { AddGasEstimationFunction, TxHelpers } from 'components/AppContext'
import { ExchangeAction, getQuote$, getTokenMetaData } from 'features/exchange/exchange'
import { transactionToX } from 'helpers/form'
import { OAZO_FEE, SLIPPAGE } from 'helpers/multiply/calculations'
import { one, zero } from 'helpers/zero'
import { iif, Observable, of } from 'rxjs'
import { catchError, filter, first, startWith, switchMap } from 'rxjs/operators'

import {
  DepositAndGenerateData,
  WithdrawAndPaybackData,
} from '../../../../blockchain/calls/proxyActions/adapters/ProxyActionsSmartContractAdapterInterface'
import { StandardDssProxyActionsContractAdapter } from '../../../../blockchain/calls/proxyActions/adapters/standardDssProxyActionsContractAdapter'
import { vaultActionsLogic } from '../../../../blockchain/calls/proxyActions/vaultActionsLogic'
import { TxError } from '../../../../helpers/types'
import { ManageMultiplyVaultChange, ManageMultiplyVaultState } from './manageMultiplyVault'

type ProxyChange =
  | {
      kind: 'proxyWaitingForApproval'
    }
  | {
      kind: 'proxyInProgress'
      proxyTxHash: string
    }
  | {
      kind: 'proxyFailure'
      txError?: TxError
    }
  | {
      kind: 'proxyConfirming'
      proxyConfirmations?: number
    }
  | {
      kind: 'proxySuccess'
      proxyAddress: string
    }

type CollateralAllowanceChange =
  | { kind: 'collateralAllowanceWaitingForApproval' }
  | {
      kind: 'collateralAllowanceInProgress'
      collateralAllowanceTxHash: string
    }
  | {
      kind: 'collateralAllowanceFailure'
      txError?: TxError
    }
  | {
      kind: 'collateralAllowanceSuccess'
      collateralAllowance: BigNumber
    }

type DaiAllowanceChange =
  | { kind: 'daiAllowanceWaitingForApproval' }
  | {
      kind: 'daiAllowanceInProgress'
      daiAllowanceTxHash: string
    }
  | {
      kind: 'daiAllowanceFailure'
      txError?: TxError
    }
  | {
      kind: 'daiAllowanceSuccess'
      daiAllowance: BigNumber
    }

export type ManageChange =
  | { kind: 'manageWaitingForApproval' }
  | {
      kind: 'manageInProgress'
      manageTxHash: string
    }
  | {
      kind: 'manageFailure'
      txError?: TxError
    }
  | {
      kind: 'manageSuccess'
    }

export type ManageVaultTransactionChange =
  | ProxyChange
  | CollateralAllowanceChange
  | DaiAllowanceChange
  | ManageChange

export function applyManageVaultTransaction<VS extends ManageMultiplyVaultState>(
  change: ManageMultiplyVaultChange,
  state: VS,
): VS {
  if (change.kind === 'proxyWaitingForApproval') {
    return {
      ...state,
      stage: 'proxyWaitingForApproval',
    }
  }

  if (change.kind === 'proxyInProgress') {
    const { proxyTxHash } = change
    return {
      ...state,
      stage: 'proxyInProgress',
      proxyTxHash,
    }
  }

  if (change.kind === 'proxyFailure') {
    const { txError } = change
    return { ...state, stage: 'proxyFailure', txError }
  }

  if (change.kind === 'proxyConfirming') {
    const { proxyConfirmations } = change
    return {
      ...state,
      proxyConfirmations,
    }
  }

  if (change.kind === 'proxySuccess') {
    const { proxyAddress } = change
    return {
      ...state,
      proxyAddress,
      stage: 'proxySuccess',
    }
  }

  if (change.kind === 'collateralAllowanceWaitingForApproval') {
    return {
      ...state,
      stage: 'collateralAllowanceWaitingForApproval',
    }
  }

  if (change.kind === 'collateralAllowanceInProgress') {
    const { collateralAllowanceTxHash } = change
    return {
      ...state,
      collateralAllowanceTxHash,
      stage: 'collateralAllowanceInProgress',
    }
  }

  if (change.kind === 'collateralAllowanceFailure') {
    const { txError } = change
    return {
      ...state,
      stage: 'collateralAllowanceFailure',
      txError,
    }
  }

  if (change.kind === 'collateralAllowanceSuccess') {
    const { collateralAllowance } = change
    return { ...state, stage: 'collateralAllowanceSuccess', collateralAllowance }
  }

  if (change.kind === 'daiAllowanceWaitingForApproval') {
    return {
      ...state,
      stage: 'daiAllowanceWaitingForApproval',
    }
  }

  if (change.kind === 'daiAllowanceInProgress') {
    const { daiAllowanceTxHash } = change
    return {
      ...state,
      daiAllowanceTxHash,
      stage: 'daiAllowanceInProgress',
    }
  }

  if (change.kind === 'daiAllowanceFailure') {
    const { txError } = change
    return {
      ...state,
      stage: 'daiAllowanceFailure',
      txError,
    }
  }

  if (change.kind === 'daiAllowanceSuccess') {
    const { daiAllowance } = change
    return { ...state, stage: 'daiAllowanceSuccess', daiAllowance }
  }

  if (change.kind === 'manageWaitingForApproval') {
    return {
      ...state,
      stage: 'manageWaitingForApproval',
    }
  }

  if (change.kind === 'manageInProgress') {
    const { manageTxHash } = change
    return {
      ...state,
      manageTxHash,
      stage: 'manageInProgress',
    }
  }

  if (change.kind === 'manageFailure') {
    const { txError } = change
    return {
      ...state,
      stage: 'manageFailure',
      txError,
    }
  }

  if (change.kind === 'manageSuccess') {
    return { ...state, stage: 'manageSuccess' }
  }

  return state
}

export function adjustPosition(
  txHelpers$: Observable<TxHelpers>,
  { tokensMainnet, defaultExchange }: Context,
  change: (ch: ManageMultiplyVaultChange) => void,
  {
    account,
    proxyAddress,
    vault: { ilk, token, id },
    exchangeAction,
    depositDaiAmount,
    debtDelta,
    depositAmount,
    withdrawAmount,
    generateAmount,
    collateralDelta,
    slippage,
    oneInchAmount,
  }: ManageMultiplyVaultState,
) {
  txHelpers$
    .pipe(
      first(),
      switchMap(({ sendWithGasEstimation, send }) =>
        getQuote$(
          getTokenMetaData('DAI', tokensMainnet),
          getTokenMetaData(token, tokensMainnet),
          defaultExchange.address,
          oneInchAmount,
          slippage,
          exchangeAction!,
        ).pipe(
          first(),
          switchMap((swap) => {
            log(
              {
                kind: TxMetaKind.adjustPosition,
                depositCollateral: depositAmount || zero,
                depositDai: depositDaiAmount || zero,
                withdrawCollateral: withdrawAmount || zero,
                withdrawDai: generateAmount || zero,
                requiredDebt: debtDelta?.abs() || zero,
                borrowedCollateral: collateralDelta?.abs() || zero,
                slippage,
                userAddress: account!,
                proxyAddress: proxyAddress!,
                exchangeAddress: swap?.status === 'SUCCESS' ? swap.tx.to : '',
                exchangeData: swap?.status === 'SUCCESS' ? swap.tx.data : '',
                action: exchangeAction!,
                token,
                id,
                ilk,
              },
              'adjustPosition',
            )
            // @ts-ignore
            document.txnSent = true
            return send(adjustMultiplyVault, {
              kind: TxMetaKind.adjustPosition,
              depositCollateral: depositAmount || zero,
              depositDai: depositDaiAmount || zero,
              withdrawCollateral: withdrawAmount || zero,
              withdrawDai: generateAmount || zero,
              requiredDebt: debtDelta?.abs() || zero,
              borrowedCollateral: collateralDelta?.abs() || zero,
              userAddress: account!,
              proxyAddress: proxyAddress!,
              exchangeAddress: swap?.status === 'SUCCESS' ? swap.tx.to : '',
              exchangeData: swap?.status === 'SUCCESS' ? swap.tx.data : '',
              slippage,
              action: exchangeAction!,
              token,
              id,
              ilk,
            }).pipe(
              transactionToX<ManageMultiplyVaultChange, MultiplyAdjustData>(
                { kind: 'manageWaitingForApproval' },
                (txState) =>
                  of({
                    kind: 'manageInProgress',
                    manageTxHash: (txState as any).txHash as string,
                  }),
                (txState) => {
                  return of({
                    kind: 'manageFailure',
                    txError:
                      txState.status === TxStatus.Error ||
                      txState.status === TxStatus.CancelledByTheUser
                        ? txState.error
                        : undefined,
                  })
                },
                () => of({ kind: 'manageSuccess' }),
              ),
            )
          }),
        ),
      ),
      startWith({ kind: 'manageWaitingForApproval' } as ManageMultiplyVaultChange),
      catchError(() => of({ kind: 'manageFailure' } as ManageMultiplyVaultChange)),
    )
    .subscribe((ch) => change(ch))
}

export function manageVaultDepositAndGenerate(
  txHelpers$: Observable<TxHelpers>,
  change: (ch: ManageMultiplyVaultChange) => void,
  {
    proxyAddress,
    vault: { ilk, token, id },
    depositAmount = zero,
    generateAmount = zero,
  }: ManageMultiplyVaultState,
) {
  txHelpers$
    .pipe(
      first(),
      switchMap(({ sendWithGasEstimation }) =>
        sendWithGasEstimation(
          vaultActionsLogic(StandardDssProxyActionsContractAdapter).depositAndGenerate,
          {
            kind: TxMetaKind.depositAndGenerate,
            generateAmount,
            depositAmount,
            proxyAddress: proxyAddress!,
            ilk,
            token,
            id,
          },
        ).pipe(
          transactionToX<ManageMultiplyVaultChange, DepositAndGenerateData>(
            { kind: 'manageWaitingForApproval' },
            (txState) =>
              of({
                kind: 'manageInProgress',
                manageTxHash: (txState as any).txHash as string,
              }),
            (txState) => {
              return of({
                kind: 'manageFailure',
                txError:
                  txState.status === TxStatus.Error ||
                  txState.status === TxStatus.CancelledByTheUser
                    ? txState.error
                    : undefined,
              })
            },
            () => of({ kind: 'manageSuccess' }),
          ),
        ),
      ),
    )
    .subscribe((ch) => change(ch))
}
export function manageVaultWithdrawAndPayback(
  txHelpers$: Observable<TxHelpers>,
  change: (ch: ManageMultiplyVaultChange) => void,
  {
    proxyAddress,
    vault: { ilk, token, id },
    shouldPaybackAll,
    withdrawAmount = zero,
    paybackAmount = zero,
  }: ManageMultiplyVaultState,
) {
  txHelpers$
    .pipe(
      first(),
      switchMap(({ sendWithGasEstimation }) =>
        sendWithGasEstimation(
          vaultActionsLogic(StandardDssProxyActionsContractAdapter).withdrawAndPayback,
          {
            kind: TxMetaKind.withdrawAndPayback,
            withdrawAmount,
            paybackAmount,
            proxyAddress: proxyAddress!,
            ilk,
            token,
            id,
            shouldPaybackAll,
          },
        ).pipe(
          transactionToX<ManageMultiplyVaultChange, WithdrawAndPaybackData>(
            { kind: 'manageWaitingForApproval' },
            (txState) =>
              of({
                kind: 'manageInProgress',
                manageTxHash: (txState as any).txHash as string,
              }),
            (txState) => {
              return of({
                kind: 'manageFailure',
                txError:
                  txState.status === TxStatus.Error ||
                  txState.status === TxStatus.CancelledByTheUser
                    ? txState.error
                    : undefined,
              })
            },
            () => of({ kind: 'manageSuccess' }),
          ),
        ),
      ),
    )
    .subscribe((ch) => change(ch))
}

export function setDaiAllowance(
  txHelpers$: Observable<TxHelpers>,
  change: (ch: ManageMultiplyVaultChange) => void,
  state: ManageMultiplyVaultState,
) {
  txHelpers$
    .pipe(
      first(),
      switchMap(({ sendWithGasEstimation }) =>
        sendWithGasEstimation(approve, {
          kind: TxMetaKind.approve,
          token: 'DAI',
          spender: state.proxyAddress!,
          amount: state.daiAllowanceAmount!,
        }).pipe(
          transactionToX<ManageMultiplyVaultChange, ApproveData>(
            { kind: 'daiAllowanceWaitingForApproval' },
            (txState) =>
              of({
                kind: 'daiAllowanceInProgress',
                daiAllowanceTxHash: (txState as any).txHash as string,
              }),
            (txState) =>
              of({
                kind: 'daiAllowanceFailure',
                txError:
                  txState.status === TxStatus.Error ||
                  txState.status === TxStatus.CancelledByTheUser
                    ? txState.error
                    : undefined,
              }),
            (txState) => of({ kind: 'daiAllowanceSuccess', daiAllowance: txState.meta.amount }),
          ),
        ),
      ),
    )
    .subscribe((ch) => change(ch))
}

export function setCollateralAllowance(
  txHelpers$: Observable<TxHelpers>,
  change: (ch: ManageMultiplyVaultChange) => void,
  state: ManageMultiplyVaultState,
) {
  txHelpers$
    .pipe(
      first(),
      switchMap(({ sendWithGasEstimation }) =>
        sendWithGasEstimation(approve, {
          kind: TxMetaKind.approve,
          token: state.vault.token,
          spender: state.proxyAddress!,
          amount: state.collateralAllowanceAmount!,
        }).pipe(
          transactionToX<ManageMultiplyVaultChange, ApproveData>(
            { kind: 'collateralAllowanceWaitingForApproval' },
            (txState) =>
              of({
                kind: 'collateralAllowanceInProgress',
                collateralAllowanceTxHash: (txState as any).txHash as string,
              }),
            (txState) =>
              of({
                kind: 'collateralAllowanceFailure',
                txError:
                  txState.status === TxStatus.Error ||
                  txState.status === TxStatus.CancelledByTheUser
                    ? txState.error
                    : undefined,
              }),
            (txState) =>
              of({
                kind: 'collateralAllowanceSuccess',
                collateralAllowance: txState.meta.amount,
              }),
          ),
        ),
      ),
    )
    .subscribe((ch) => change(ch))
}

export function createProxy(
  txHelpers$: Observable<TxHelpers>,
  proxyAddress$: Observable<string | undefined>,
  change: (ch: ManageMultiplyVaultChange) => void,
  { safeConfirmations }: ManageMultiplyVaultState,
) {
  txHelpers$
    .pipe(
      first(),
      switchMap(({ sendWithGasEstimation }) =>
        sendWithGasEstimation(createDsProxy, { kind: TxMetaKind.createDsProxy }).pipe(
          transactionToX<ManageMultiplyVaultChange, CreateDsProxyData>(
            { kind: 'proxyWaitingForApproval' },
            (txState) =>
              of({
                kind: 'proxyInProgress',
                proxyTxHash: (txState as any).txHash as string,
              }),
            (txState) =>
              of({
                kind: 'proxyFailure',
                txError:
                  txState.status === TxStatus.Error ||
                  txState.status === TxStatus.CancelledByTheUser
                    ? txState.error
                    : undefined,
              }),
            (txState) => {
              return proxyAddress$.pipe(
                filter((proxyAddress) => !!proxyAddress),
                switchMap((proxyAddress) => {
                  return iif(
                    () => (txState as any).confirmations < safeConfirmations,
                    of({
                      kind: 'proxyConfirming',
                      proxyConfirmations: (txState as any).confirmations,
                    }),
                    of({ kind: 'proxySuccess', proxyAddress: proxyAddress! }),
                  )
                }),
              )
            },
            safeConfirmations,
          ),
        ),
      ),
    )
    .subscribe((ch) => change(ch))
}

export function closeVault(
  txHelpers$: Observable<TxHelpers>,
  { tokensMainnet, defaultExchange }: Context,
  change: (ch: ManageMultiplyVaultChange) => void,
  {
    proxyAddress,
    vault: { ilk, token, id, lockedCollateral, debt, debtOffset },
    closeVaultTo,
    slippage,
    account,
    closeToDaiParams,
    closeToCollateralParams,
  }: ManageMultiplyVaultState,
) {
  const { fromTokenAmount, toTokenAmount, minToTokenAmount } =
    closeVaultTo === 'dai' ? closeToDaiParams : closeToCollateralParams

  txHelpers$
    .pipe(
      first(),
      switchMap(({ sendWithGasEstimation }) =>
        getQuote$(
          getTokenMetaData('DAI', tokensMainnet),
          getTokenMetaData(token, tokensMainnet),
          defaultExchange.address,
          fromTokenAmount,
          slippage,
          'SELL_COLLATERAL',
        ).pipe(
          first(),
          switchMap((swap) => {
            return sendWithGasEstimation(closeVaultCall, {
              kind: TxMetaKind.closeVault,
              closeTo: closeVaultTo!,
              token,
              ilk,
              id,
              exchangeAddress: swap?.status === 'SUCCESS' ? swap.tx.to : '',
              exchangeData: swap?.status === 'SUCCESS' ? swap.tx.data : '',
              userAddress: account!,
              totalCollateral: lockedCollateral,
              totalDebt: debt.plus(debtOffset),
              proxyAddress: proxyAddress!,
              fromTokenAmount,
              toTokenAmount,
              minToTokenAmount,
            }).pipe(
              transactionToX<ManageMultiplyVaultChange, WithdrawAndPaybackData>(
                { kind: 'manageWaitingForApproval' },
                (txState) =>
                  of({
                    kind: 'manageInProgress',
                    manageTxHash: (txState as any).txHash as string,
                  }),
                (txState) => {
                  return of({
                    kind: 'manageFailure',
                    txError:
                      txState.status === TxStatus.Error ||
                      txState.status === TxStatus.CancelledByTheUser
                        ? txState.error
                        : undefined,
                  })
                },
                () => of({ kind: 'manageSuccess' }),
              ),
            )
          }),
        ),
      ),
      startWith({ kind: 'manageWaitingForApproval' } as ManageMultiplyVaultChange),
      catchError(() => of({ kind: 'manageFailure' } as ManageMultiplyVaultChange)),
    )
    .subscribe((ch) => change(ch))
}

// @ts-ignore
if (process.browser) document.txnSent = false

function log(
  args: {
    kind: TxMetaKind
    depositCollateral: BigNumber
    depositDai: BigNumber
    withdrawCollateral: BigNumber
    withdrawDai: BigNumber
    requiredDebt: BigNumber
    borrowedCollateral: BigNumber
    slippage: BigNumber
    userAddress: string
    proxyAddress: string
    exchangeAddress: string
    exchangeData: string
    action: ExchangeAction | undefined
    token: string
    id: BigNumber
    ilk: string
  },
  place: string,
) {
  console.log(`
  place ${place}
  depositCollateral ${args.depositCollateral}
  depositDai ${args.depositDai}
  withdrawCollateral ${args.withdrawCollateral}
  withdrawDai ${args.withdrawDai}
  requiredDebt ${args.requiredDebt}
  borrowedCollateral ${args.borrowedCollateral}
  slippage ${args.slippage}
  userAddress ${args.userAddress}
  proxyAddress ${args.proxyAddress}
  exchangeAddress ${args.exchangeAddress}
  exchangeData ${args.exchangeData}
  action ${args.action}
  token ${args.token}
  id ${args.id}
  ilk ${args.ilk}
  txnSent ${
    // @ts-ignore
    document.txnSent
  }
  collateral * debt = ${args.requiredDebt.times(args.borrowedCollateral)}
  `)
  // console.log(`depositCollateral ${args.depositCollateral}`)
  // console.log(`depositDai ${args.depositDai}`)
  // console.log(`withdrawCollateral ${args.withdrawCollateral}`)
  // console.log(`withdrawDai ${args.withdrawDai}`)
  // console.log(`requiredDebt ${args.requiredDebt}`)
  // console.log(`borrowedCollateral ${args.borrowedCollateral}`)
  // console.log(`slippage ${args.slippage}`)
  // console.log(`userAddress ${args.userAddress}`)
  // console.log(`proxyAddress ${args.proxyAddress}`)
  // console.log(`exchangeAddress ${args.exchangeAddress}`)
  // // console.log(`exchangeData ${args.exchangeData}`)
  // console.log(`action ${args.action}`)
  // console.log(`token ${args.token}`)
  // console.log(`id ${args.id}`)
  // console.log(`ilk ${args.ilk}`)
}

export function applyEstimateGas(
  addGasEstimation$: AddGasEstimationFunction,
  state: ManageMultiplyVaultState,
): Observable<ManageMultiplyVaultState> {
  return addGasEstimation$(state, ({ estimateGas, send }: TxHelpers) => {
    const {
      proxyAddress,
      generateAmount,
      depositAmount,
      depositDaiAmount,
      withdrawAmount,
      paybackAmount,
      shouldPaybackAll,
      vault: { ilk, token, id, lockedCollateral, debt, debtOffset },
      requiredCollRatio,
      account,
      swap,
      slippage,
      exchangeAction,
      closeVaultTo,
      closeToDaiParams,
      closeToCollateralParams,
      isProxyStage,
      debtDelta,
      collateralDelta,
    } = state

    if (proxyAddress) {
      if (requiredCollRatio) {
        const daiAmount =
          swap?.status === 'SUCCESS'
            ? exchangeAction === 'BUY_COLLATERAL'
              ? swap.daiAmount.div(one.minus(OAZO_FEE))
              : swap.daiAmount
            : zero

        const collateralAmount =
          swap?.status === 'SUCCESS'
            ? exchangeAction === 'BUY_COLLATERAL'
              ? swap.collateralAmount.times(one.minus(SLIPPAGE))
              : swap.collateralAmount
            : zero

        if (
          // state.afterCollateralizationRatio.eq('3.35') &&
          // @ts-ignore
          document.sendTransaction === true
        ) {
          console.log('here')
          log(
            {
              kind: TxMetaKind.adjustPosition,
              depositCollateral: depositAmount || zero,
              depositDai: depositDaiAmount || zero,
              withdrawCollateral: withdrawAmount || zero,
              withdrawDai: generateAmount || zero,
              requiredDebt: debtDelta?.abs() || zero,
              borrowedCollateral: collateralDelta?.abs() || zero,
              slippage,
              userAddress: account!,
              proxyAddress: proxyAddress!,
              exchangeAddress: swap?.status === 'SUCCESS' ? swap.tx.to : '',
              exchangeData: swap?.status === 'SUCCESS' ? swap.tx.data : '',
              action: exchangeAction!,
              token,
              id,
              ilk,
            },
            'send',
          )
          return send(adjustMultiplyVault, {
            kind: TxMetaKind.adjustPosition,
            depositCollateral: depositAmount || zero,
            depositDai: depositDaiAmount || zero,
            withdrawCollateral: withdrawAmount || zero,
            withdrawDai: generateAmount || zero,
            requiredDebt: debtDelta?.abs() || zero,
            borrowedCollateral: collateralDelta?.abs() || zero,
            userAddress: account!,
            proxyAddress: proxyAddress!,
            exchangeAddress: swap?.status === 'SUCCESS' ? swap.tx.to : '',
            exchangeData: swap?.status === 'SUCCESS' ? swap.tx.data : '',
            slippage,
            action: exchangeAction!,
            token,
            id,
            ilk,
          })
        } else {
          log(
            {
              kind: TxMetaKind.adjustPosition,
              depositCollateral: depositAmount || zero,
              depositDai: depositDaiAmount || zero,
              withdrawCollateral: withdrawAmount || zero,
              withdrawDai: generateAmount || zero,
              requiredDebt: debtDelta?.abs() || zero,
              borrowedCollateral: collateralDelta?.abs() || zero,
              slippage,
              userAddress: account!,
              proxyAddress: proxyAddress!,
              exchangeAddress: swap?.status === 'SUCCESS' ? swap.tx.to : '',
              exchangeData: swap?.status === 'SUCCESS' ? swap.tx.data : '',
              action: exchangeAction!,
              token,
              id,
              ilk,
            },
            'estimateGas',
          )
          console.log(`requiredDebt ${debtDelta?.abs()}`)
          return estimateGas(adjustMultiplyVault, {
            kind: TxMetaKind.adjustPosition,
            depositCollateral: depositAmount || zero,
            depositDai: depositDaiAmount || zero,
            withdrawCollateral: withdrawAmount || zero,
            withdrawDai: generateAmount || zero,
            requiredDebt: debtDelta?.abs() || zero,
            borrowedCollateral: collateralDelta?.abs() || zero,
            userAddress: account!,
            proxyAddress: proxyAddress!,
            exchangeAddress: swap?.status === 'SUCCESS' ? swap.tx.to : '',
            exchangeData: swap?.status === 'SUCCESS' ? swap.tx.data : '',
            slippage,
            action: exchangeAction!,
            token,
            id,
            ilk,
          })
        }
      } else {
        if (state.otherAction === 'closeVault' && !debt.isZero()) {
          const { fromTokenAmount, toTokenAmount, minToTokenAmount } =
            closeVaultTo === 'dai' ? closeToDaiParams : closeToCollateralParams

          return estimateGas(closeVaultCall, {
            kind: TxMetaKind.closeVault,
            closeTo: closeVaultTo!,
            token,
            ilk,
            id,
            exchangeAddress: swap?.status === 'SUCCESS' ? swap.tx.to : '',
            exchangeData: swap?.status === 'SUCCESS' ? swap.tx.data : '',
            userAddress: account!,
            totalCollateral: lockedCollateral,
            totalDebt: debt.plus(debtOffset),
            proxyAddress: proxyAddress!,
            fromTokenAmount,
            toTokenAmount,
            minToTokenAmount,
          })
        } else {
          const isDepositAndGenerate = depositAmount || generateAmount

          if (isDepositAndGenerate) {
            return estimateGas(
              vaultActionsLogic(StandardDssProxyActionsContractAdapter).depositAndGenerate,
              {
                kind: TxMetaKind.depositAndGenerate,
                generateAmount: generateAmount || zero,
                depositAmount: depositAmount || zero,
                proxyAddress: proxyAddress!,
                ilk,
                token,
                id,
              },
            )
          } else {
            return estimateGas(
              vaultActionsLogic(StandardDssProxyActionsContractAdapter).withdrawAndPayback,
              {
                kind: TxMetaKind.withdrawAndPayback,
                withdrawAmount: withdrawAmount || zero,
                paybackAmount: paybackAmount || zero,
                proxyAddress: proxyAddress!,
                ilk,
                token,
                id,
                shouldPaybackAll,
              },
            )
          }
        }
      }
    }

    if (isProxyStage) {
      return estimateGas(createDsProxy, { kind: TxMetaKind.createDsProxy })
    }

    return undefined
  })
}
