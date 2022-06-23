import { useMachine } from '@xstate/react'
import { trackingEvents } from 'analytics/analytics'
import BigNumber from 'bignumber.js'
import { ALLOWED_MULTIPLY_TOKENS } from 'blockchain/tokensMetadata'
import { useAppContext } from 'components/AppContextProvider'
import { DefaultVaultHeader } from 'components/vault/DefaultVaultHeader'
import { VaultAllowance, VaultAllowanceStatus } from 'components/vault/VaultAllowance'
import { VaultChangesWithADelayCard } from 'components/vault/VaultChangesWithADelayCard'
import { VaultFormVaultTypeSwitch, WithVaultFormStepIndicator } from 'components/vault/VaultForm'
import { VaultFormContainer } from 'components/vault/VaultFormContainer'
import {
  VaultProxyContentBox,
  VaultProxyStatusCard,
  VaultProxySubtitle,
} from 'components/vault/VaultProxy'
import { SidebarOpenBorrowVault } from 'features/borrow/open/sidebars/SidebarOpenBorrowVault'
import { WithLoadingIndicator } from 'helpers/AppSpinner'
import { WithErrorHandler } from 'helpers/errorHandlers/WithErrorHandler'
import { useObservable } from 'helpers/observableHook'
import { useFeatureToggle } from 'helpers/useFeatureToggle'
import { useTranslation } from 'next-i18next'
import React, { useEffect } from 'react'
import { Box, Container, Grid, Text } from 'theme-ui'
import { State } from 'xstate'

import { VaultErrors } from '../../../../components/vault/VaultErrors'
import { VaultWarnings } from '../../../../components/vault/VaultWarnings'
import { extractGasDataFromState } from '../../../../helpers/extractGasDataFromState'
import { OpenVaultEnvironment, OpenVaultState } from '../pipes/openVault'
import { createOpenVaultAnalytics$ } from '../pipes/openVaultAnalytics'
import { applyOpenVaultCalculations } from '../pipes/openVaultCalculations'
import { borrowPositionStateMachine } from '../stateMachine'
import { BorrowPositionMachineContext, BorrowPositionMachineEvent } from '../stateMachine/types'
import { OpenVaultButton } from './OpenVaultButton'
import { OpenVaultConfirmation, OpenVaultStatus } from './OpenVaultConfirmation'
import { OpenVaultDetails } from './OpenVaultDetails'
import { OpenVaultEditing } from './OpenVaultEditing'

function OpenVaultTitle({
  isEditingStage,
  isProxyStage,
  isAllowanceStage,
  token,
  stage,
  totalSteps,
  currentStep,
}: OpenVaultState) {
  const { t } = useTranslation()
  return (
    <Box>
      <WithVaultFormStepIndicator {...{ totalSteps, currentStep }}>
        <Text variant="paragraph2" sx={{ fontWeight: 'semiBold' }}>
          {isEditingStage
            ? t('vault-form.header.edit')
            : isProxyStage
            ? stage === 'proxySuccess'
              ? t('vault-form.header.proxy-success')
              : t('vault-form.header.proxy')
            : isAllowanceStage
            ? t('vault-form.header.allowance', { token: token.toUpperCase() })
            : stage === 'txInProgress'
            ? t('vault-form.header.confirm-in-progress')
            : t('vault-form.header.confirm')}
        </Text>
      </WithVaultFormStepIndicator>
      <Text variant="paragraph3" sx={{ color: 'text.subtitle', lineHeight: '22px' }}>
        {isEditingStage ? (
          t('vault-form.subtext.edit')
        ) : isProxyStage ? (
          <VaultProxySubtitle stage={stage} />
        ) : isAllowanceStage ? (
          t('vault-form.subtext.allowance')
        ) : stage === 'txInProgress' ? (
          t('vault-form.subtext.confirm-in-progress')
        ) : (
          t('vault-form.subtext.review-manage')
        )}
      </Text>
    </Box>
  )
}

function OpenVaultForm(props: OpenVaultState) {
  const { isEditingStage, isProxyStage, isAllowanceStage, isOpenStage, ilk, stage } = props
  const newComponentsEnabled = useFeatureToggle('NewComponents')

  const gasData = extractGasDataFromState(props)

  return (
    <>
      {newComponentsEnabled ? (
        <SidebarOpenBorrowVault {...props} />
      ) : (
        <VaultFormContainer toggleTitle="Open Vault">
          <OpenVaultTitle {...props} />
          {isProxyStage && <VaultProxyContentBox stage={stage} gasData={gasData} />}
          {isEditingStage && <OpenVaultEditing {...props} />}
          {isAllowanceStage && <VaultAllowance {...props} />}
          {isOpenStage && <OpenVaultConfirmation {...props} />}
          <VaultErrors {...props} />
          <VaultWarnings {...props} />
          {stage === 'txSuccess' && <VaultChangesWithADelayCard />}
          <OpenVaultButton {...props} />
          {isProxyStage && <VaultProxyStatusCard {...props} />}
          {isAllowanceStage && <VaultAllowanceStatus {...props} />}
          {isOpenStage && <OpenVaultStatus {...props} />}
          {isEditingStage ? (
            <VaultFormVaultTypeSwitch
              href={`/vaults/open-multiply/${ilk}`}
              title="Switch to Multiply"
              visible={ALLOWED_MULTIPLY_TOKENS.includes(props.token)}
            />
          ) : null}
        </VaultFormContainer>
      )}
    </>
  )
}

export function OpenVaultContainer(props: OpenVaultState) {
  const { ilk, clear } = props
  const { t } = useTranslation()

  useEffect(() => {
    return () => {
      clear()
    }
  }, [])

  return (
    <>
      <DefaultVaultHeader {...props} header={t('vault.open-vault', { ilk })} />
      <Grid variant="vaultContainer">
        <Box>
          <OpenVaultDetails {...props} />
        </Box>
        <Box>
          <OpenVaultForm {...props} />
        </Box>
      </Grid>
    </>
  )
}

// DONE export interface MutableOpenVaultState {
// DONE export interface OpenVaultCalculations {

// interface OpenVaultFunctions {
//   progress?: () => void
//   regress?: () => void
//   skipStopLoss?: () => void
//   toggleGenerateOption?: () => void
//   updateDeposit?: (depositAmount?: BigNumber) => void
//   updateDepositUSD?: (depositAmountUSD?: BigNumber) => void
//   updateDepositMax?: () => void
//   updateGenerate?: (generateAmount?: BigNumber) => void
//   updateGenerateMax?: () => void
//   updateAllowanceAmount?: (amount?: BigNumber) => void
//   setAllowanceAmountUnlimited?: () => void
//   setAllowanceAmountToDepositAmount?: () => void
//   setAllowanceAmountCustom?: () => void
//   clear: () => void
//   injectStateOverride: (state: Partial<MutableOpenVaultState>) => void
// }

// GET from app context
// interface OpenVaultEnvironment {
//   ilk: string
//   account: string
//   token: string
//   priceInfo: PriceInfo
//   balanceInfo: BalanceInfo
//   ilkData: IlkData
//   proxyAddress?: string
//   allowance?: BigNumber
// }

// USE state matches
// export interface OpenVaultConditions {
//   isEditingStage: boolean
//   isStopLossEditingStage: boolean
//   isProxyStage: boolean
//   isAllowanceStage: boolean
//   isOpenStage: boolean

//   inputAmountsEmpty: boolean

//   vaultWillBeAtRiskLevelWarning: boolean
//   vaultWillBeAtRiskLevelDanger: boolean
//   vaultWillBeUnderCollateralized: boolean

//   vaultWillBeAtRiskLevelWarningAtNextPrice: boolean
//   vaultWillBeAtRiskLevelDangerAtNextPrice: boolean
//   vaultWillBeUnderCollateralizedAtNextPrice: boolean
//   potentialGenerateAmountLessThanDebtFloor: boolean

//   depositingAllEthBalance: boolean
//   depositAmountExceedsCollateralBalance: boolean
//   generateAmountExceedsDaiYieldFromDepositingCollateral: boolean
//   generateAmountExceedsDaiYieldFromDepositingCollateralAtNextPrice: boolean
//   generateAmountExceedsDebtCeiling: boolean
//   generateAmountLessThanDebtFloor: boolean
//   ledgerWalletContractDataDisabled: boolean

//   customAllowanceAmountEmpty: boolean
//   customAllowanceAmountExceedsMaxUint256: boolean
//   customAllowanceAmountLessThanDepositAmount: boolean
//   insufficientAllowance: boolean

//   isLoadingStage: boolean
//   isSuccessStage: boolean
//   canProgress: boolean
//   canRegress: boolean

//   potentialInsufficientEthFundsForTx: boolean
//   insufficientEthFundsForTx: boolean
// }

// CONTEXT but update
// interface OpenVaultTxInfo {
//   allowanceTxHash?: string
//   proxyTxHash?: string
//   openTxHash?: string
//   txError?: TxError
//   etherscan?: string
//   proxyConfirmations?: number
//   safeConfirmations: number
// }

// GET FROM CONTEXT
// {
//     errorMessages: VaultErrorMessage[]
//     warningMessages: VaultWarningMessage[]
//     summary: OpenVaultSummary // NOT sure about this one
//     totalSteps: number
//     currentStep: number
//     withStopLossStage: boolean
//   }

// export interface HasGasEstimation extends HasGasEstimationCost {
//   gasEstimationStatus: GasEstimationStatus
//   error?: any
//   gasEstimation?: number
// }

function createOpenVaultState(
  openBorrowPositionEnvironment: OpenVaultEnvironment,
  machineState: State<BorrowPositionMachineContext, BorrowPositionMachineEvent, any, any, any>,
  sendToMachine,
): OpenVaultState {
  //   stage: OpenVaultStage // CAN DROP use matches
  //   selectedAllowanceRadio: AllowanceOption
  //   stopLossSkipped: false

  // export interface OpenVaultCalculations {
  //   afterLiquidationPrice: BigNumber
  //   afterCollateralizationRatio: BigNumber
  //   afterCollateralizationRatioAtNextPrice: BigNumber
  //   daiYieldFromDepositingCollateral: BigNumber
  //   daiYieldFromDepositingCollateralAtNextPrice: BigNumber
  //   afterFreeCollateral: BigNumber
  //   maxDepositAmount: BigNumber
  //   maxDepositAmountUSD: BigNumber
  //   maxGenerateAmount: BigNumber
  //   maxGenerateAmountCurrentPrice: BigNumber
  //   maxGenerateAmountNextPrice: BigNumber
  //   afterCollateralBalance: BigNumber
  // }

  // interface OpenVaultEnvironment {
  //   ilk: string
  //   account: string
  //   token: string
  //   priceInfo: PriceInfo
  //   balanceInfo: BalanceInfo
  //   ilkData: IlkData
  // }

  return applyOpenVaultCalculations({
    depositAmount: machineState.context.depositAmount,
    depositAmountUSD: machineState.context.depositAmountUSD,
    generateAmount: machineState.context.generateAmount,
    showGenerateOption: !!machineState.context.generateOn,
    allowanceAmount: machineState.context.allowanceAmount,
    allowance: machineState.context.allowance,
    id: machineState.context.id,
    ...openBorrowPositionEnvironment,
  })
}

export function OpenVaultView({ ilk }: { ilk: string }) {
  const { openVault$, accountData$, context$ } = useAppContext()
  const openVaultWithIlk$ = openVault$(ilk)
  const [state, send] = useMachine(borrowPositionStateMachine)
  const [_openVault, error] = useObservable(openVaultWithIlk$)
  // openVault?.priceInfo

  //   ilk: string
  //   account: string
  //   token: string
  //   priceInfo: PriceInfo
  //   balanceInfo: BalanceInfo
  //   ilkData: IlkData
  const openVault = createOpenVaultState({ ilk: _openVault?.ilk }, state, send)

  useEffect(() => {
    const subscription = createOpenVaultAnalytics$(
      accountData$,
      openVaultWithIlk$,
      context$,
      trackingEvents,
    ).subscribe()

    return () => {
      subscription.unsubscribe()
    }
  }, [])

  return (
    <WithErrorHandler error={error}>
      <WithLoadingIndicator value={openVault}>
        {(openVault) => (
          <Container variant="vaultPageContainer">
            <OpenVaultContainer {...openVault} />
          </Container>
        )}
      </WithLoadingIndicator>
    </WithErrorHandler>
  )
}
