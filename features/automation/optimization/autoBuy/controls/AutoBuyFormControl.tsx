import { TriggerType } from '@oasisdex/automation'
import { AutomationEventIds, Pages } from 'analytics/analytics'
import BigNumber from 'bignumber.js'
import { IlkData } from 'blockchain/ilks'
import { Context } from 'blockchain/network'
import { Vault } from 'blockchain/vaults'
import { TxHelpers } from 'components/AppContext'
import { AddAndRemoveTriggerControl } from 'features/automation/common/controls/AddAndRemoveTriggerControl'
import { resolveMaxBuyPriceAnalytics } from 'features/automation/common/helpers'
import {
  AUTO_BUY_FORM_CHANGE,
  AutoBSFormChange,
} from 'features/automation/common/state/autoBSFormChange'
import { getAutoBSStatus } from 'features/automation/common/state/autoBSStatus'
import { AutoBSTriggerData } from 'features/automation/common/state/autoBSTriggerData'
import { getAutoBSTxHandlers } from 'features/automation/common/state/autoBSTxHandlers'
import { getAutomationFeatureStatus } from 'features/automation/common/state/automationFeatureStatus'
import { AutomationFeatures } from 'features/automation/common/types'
import { SidebarSetupAutoBuy } from 'features/automation/optimization/autoBuy/sidebars/SidebarSetupAutoBuy'
import { AutoTakeProfitTriggerData } from 'features/automation/optimization/autoTakeProfit/state/autoTakeProfitTriggerData'
import { ConstantMultipleTriggerData } from 'features/automation/optimization/constantMultiple/state/constantMultipleTriggerData'
import { StopLossTriggerData } from 'features/automation/protection/stopLoss/state/stopLossTriggerData'
import { VaultType } from 'features/generalManageVault/vaultType'
import { BalanceInfo } from 'features/shared/balanceInfo'
import { useUIChanges } from 'helpers/uiChangesHook'
import React from 'react'

interface AutoBuyFormControlProps {
  autoBuyTriggerData: AutoBSTriggerData
  autoSellTriggerData: AutoBSTriggerData
  constantMultipleTriggerData: ConstantMultipleTriggerData
  autoTakeProfitTriggerData: AutoTakeProfitTriggerData
  balanceInfo: BalanceInfo
  context: Context
  ethMarketPrice: BigNumber
  ilkData: IlkData
  isAutoBuyActive: boolean
  isAutoBuyOn: boolean
  shouldRemoveAllowance: boolean
  stopLossTriggerData: StopLossTriggerData
  txHelpers?: TxHelpers
  vault: Vault
  vaultType: VaultType
}

export function AutoBuyFormControl({
  autoBuyTriggerData,
  autoSellTriggerData,
  constantMultipleTriggerData,
  autoTakeProfitTriggerData,
  balanceInfo,
  context,
  ethMarketPrice,
  ilkData,
  isAutoBuyActive,
  isAutoBuyOn,
  shouldRemoveAllowance,
  stopLossTriggerData,
  txHelpers,
  vault,
  vaultType,
}: AutoBuyFormControlProps) {
  const [autoBuyState] = useUIChanges<AutoBSFormChange>(AUTO_BUY_FORM_CHANGE)

  const feature = AutomationFeatures.AUTO_BUY
  const publishType = AUTO_BUY_FORM_CHANGE
  const {
    isAddForm,
    isFirstSetup,
    isOwner,
    isProgressStage,
    isRemoveForm,
    stage,
  } = getAutomationFeatureStatus({
    context,
    currentForm: autoBuyState.currentForm,
    feature: AutomationFeatures.AUTO_BUY,
    triggersId: [autoBuyTriggerData.triggerId],
    txStatus: autoBuyState.txDetails?.txStatus,
    vaultController: vault.controller,
  })
  const {
    collateralDelta,
    debtDelta,
    isDisabled,
    isEditing,
    resetData,
    executionPrice,
  } = getAutoBSStatus({
    autoBSState: autoBuyState,
    autoBSTriggerData: autoBuyTriggerData,
    isAddForm,
    isOwner,
    isProgressStage,
    isRemoveForm,
    publishType,
    stage,
    vault,
  })
  const { addTxData, textButtonHandlerExtension } = getAutoBSTxHandlers({
    autoBSState: autoBuyState,
    isAddForm,
    publishType,
    triggerType: TriggerType.BasicBuy,
    vault,
  })

  return (
    <AddAndRemoveTriggerControl
      addTxData={addTxData}
      ethMarketPrice={ethMarketPrice}
      isActiveFlag={isAutoBuyActive}
      isAddForm={isAddForm}
      isEditing={isEditing}
      isRemoveForm={isRemoveForm}
      publishType={publishType}
      resetData={resetData}
      shouldRemoveAllowance={shouldRemoveAllowance}
      stage={stage}
      textButtonHandlerExtension={textButtonHandlerExtension}
      triggersId={[autoBuyTriggerData.triggerId.toNumber()]}
      txHelpers={txHelpers}
      vault={vault}
      analytics={{
        id: {
          add: AutomationEventIds.AddAutoBuy,
          edit: AutomationEventIds.EditAutoBuy,
          remove: AutomationEventIds.RemoveAutoBuy,
        },
        page: Pages.AutoBuy,
        additionalParams: {
          triggerBuyValue: autoBuyState.execCollRatio.toString(),
          targetValue: autoBuyState.targetCollRatio.toString(),
          maxBuyPrice: resolveMaxBuyPriceAnalytics({
            withMaxBuyPriceThreshold: autoBuyState.withThreshold,
            maxBuyPrice: autoBuyState.maxBuyOrMinSellPrice,
          }),
          maxGasFee: autoBuyState.maxBaseFeeInGwei.toString(),
        },
      }}
    >
      {(textButtonHandler, txHandler) => (
        <SidebarSetupAutoBuy
          autoBuyState={autoBuyState}
          autoBuyTriggerData={autoBuyTriggerData}
          autoSellTriggerData={autoSellTriggerData}
          constantMultipleTriggerData={constantMultipleTriggerData}
          autoTakeProfitTriggerData={autoTakeProfitTriggerData}
          balanceInfo={balanceInfo}
          collateralDelta={collateralDelta}
          context={context}
          debtDelta={debtDelta}
          ethMarketPrice={ethMarketPrice}
          feature={feature}
          ilkData={ilkData}
          isAddForm={isAddForm}
          isAutoBuyActive={isAutoBuyActive}
          isAutoBuyOn={isAutoBuyOn}
          isDisabled={isDisabled}
          isEditing={isEditing}
          isFirstSetup={isFirstSetup}
          isRemoveForm={isRemoveForm}
          stage={stage}
          stopLossTriggerData={stopLossTriggerData}
          textButtonHandler={textButtonHandler}
          txHandler={txHandler}
          vault={vault}
          vaultType={vaultType}
          executionPrice={executionPrice}
        />
      )}
    </AddAndRemoveTriggerControl>
  )
}
