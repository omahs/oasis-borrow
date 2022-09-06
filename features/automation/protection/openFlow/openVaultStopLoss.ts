import BigNumber from 'bignumber.js'
import { IlkData } from 'blockchain/ilks'
import { getToken } from 'blockchain/tokensMetadata'
import { collateralPriceAtRatio } from 'blockchain/vault.maths'
import { Vault } from 'blockchain/vaults'
import {
  MIX_MAX_COL_RATIO_TRIGGER_OFFSET,
  NEXT_COLL_RATIO_OFFSET,
} from 'features/automation/common/consts'
import { closeVaultOptions } from 'features/automation/protection/common/consts/closeTypeConfig'
import { stopLossSliderBasicConfig } from 'features/automation/protection/common/consts/sliderConfig'
import { getSliderPercentageFill } from 'features/automation/protection/common/helpers'
import { defaultStopLossData } from 'features/automation/protection/common/stopLossTriggerData'
import { StopLossFormChange } from 'features/automation/protection/common/UITypes/StopLossFormChange'
import { SidebarAdjustStopLossEditingStageProps } from 'features/automation/protection/controls/sidebar/SidebarAdjustStopLossEditingStage'
import { CloseVaultTo } from 'features/multiply/manage/pipes/manageMultiplyVault'
import { BalanceInfo } from 'features/shared/balanceInfo'
import { PriceInfo } from 'features/shared/priceInfo'

export type OpenVaultStopLossLevelChange = {
  kind: 'stopLossLevel'
  level: BigNumber
}

export type OpenVaultStopLossCloseTypeChange = {
  kind: 'stopLossCloseType'
  type: 'dai' | 'collateral'
}

export type OpenVaultStopLossChanges =
  | OpenVaultStopLossLevelChange
  | OpenVaultStopLossCloseTypeChange

export function applyOpenVaultStopLoss<S>(state: S, change: OpenVaultStopLossChanges) {
  if (change.kind === 'stopLossLevel') {
    return {
      ...state,
      stopLossLevel: change.level,
    }
  }

  if (change.kind === 'stopLossCloseType') {
    return {
      ...state,
      stopLossCloseType: change.type,
    }
  }

  return state
}

export function getDataForStopLoss(
  props: {
    token: string
    priceInfo: PriceInfo
    ilkData: IlkData
    balanceInfo: BalanceInfo
    afterCollateralizationRatioAtNextPrice: BigNumber
    afterCollateralizationRatio: BigNumber
    afterLiquidationPrice: BigNumber
    setStopLossCloseType: (type: CloseVaultTo) => void
    setStopLossLevel: (level: BigNumber) => void
    stopLossCloseType: CloseVaultTo
    stopLossLevel: BigNumber
    totalExposure?: BigNumber
    depositAmount?: BigNumber
    generateAmount?: BigNumber
    afterOutstandingDebt?: BigNumber
  },
  feature: 'borrow' | 'multiply',
) {
  const {
    token,
    priceInfo: { currentEthPrice, nextCollateralPrice },
    ilkData,
    afterCollateralizationRatioAtNextPrice,
    afterLiquidationPrice,
    totalExposure,
    depositAmount,

    setStopLossCloseType,
    setStopLossLevel,
    stopLossCloseType,
    stopLossLevel,
    afterOutstandingDebt,
    generateAmount,
  } = props

  const debt = feature === 'multiply' ? afterOutstandingDebt : generateAmount
  const lockedCollateral = feature === 'multiply' ? totalExposure : depositAmount
  const tokenData = getToken(token)

  const sliderPercentageFill = getSliderPercentageFill({
    value: stopLossLevel,
    min: ilkData.liquidationRatio.plus(MIX_MAX_COL_RATIO_TRIGGER_OFFSET.div(100)),
    max: afterCollateralizationRatioAtNextPrice.minus(NEXT_COLL_RATIO_OFFSET.div(100)),
  })

  const afterNewLiquidationPrice = stopLossLevel
    .dividedBy(100)
    .multipliedBy(nextCollateralPrice)
    .dividedBy(afterCollateralizationRatioAtNextPrice)

  const executionPrice = collateralPriceAtRatio({
    colRatio: stopLossLevel, // TODO potentialy div by 100
    collateral: lockedCollateral!,
    vaultDebt: debt!,
  })

  const sidebarProps: SidebarAdjustStopLossEditingStageProps = {
    vault: {
      liquidationPrice: afterLiquidationPrice,
      lockedCollateral,
      debt,
      token,
    } as Vault,
    ilkData,
    ethMarketPrice: currentEthPrice,
    executionPrice,
    errors: [],
    warnings: [],
    stopLossTriggerData: defaultStopLossData,
    stopLossState: {
      selectedSLValue: stopLossLevel,
      collateralActive: stopLossCloseType === 'collateral',
      currentForm: 'add',
    } as StopLossFormChange,
    isEditing: !stopLossLevel.isZero(),
    closePickerConfig: {
      optionNames: closeVaultOptions,
      onclickHandler: (optionName: string) => setStopLossCloseType(optionName as CloseVaultTo),
      isCollateralActive: stopLossCloseType === 'collateral',
      collateralTokenSymbol: token,
      collateralTokenIconCircle: tokenData.iconCircle,
    },
    sliderConfig: {
      ...stopLossSliderBasicConfig,
      sliderPercentageFill,
      leftBoundry: stopLossLevel,
      rightBoundry: afterNewLiquidationPrice,
      lastValue: stopLossLevel,
      maxBoundry: new BigNumber(
        afterCollateralizationRatioAtNextPrice
          .minus(NEXT_COLL_RATIO_OFFSET.div(100))
          .multipliedBy(100)
          .toFixed(0, BigNumber.ROUND_DOWN),
      ),
      minBoundry: ilkData.liquidationRatio.multipliedBy(100).plus(MIX_MAX_COL_RATIO_TRIGGER_OFFSET),
      onChange: (level) => setStopLossLevel(level),
    },
    isOpenFlow: true,
  }

  return sidebarProps
}

export type StopLossOpenFlowStages =
  | 'stopLossEditing'
  | 'stopLossTxWaitingForConfirmation'
  | 'stopLossTxWaitingForApproval'
  | 'stopLossTxInProgress'
  | 'stopLossTxFailure'
  | 'stopLossTxSuccess'
