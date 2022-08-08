import { Vault } from 'blockchain/vaults'
import BigNumber from "bignumber.js";
import { IlkData } from "blockchain/ilks";
import { collateralPriceAtRatio } from "blockchain/vault.maths";
import { AppLink } from "components/Links";
import { BasicBSTriggerData } from "features/automation/common/basicBSTriggerData";
import { VaultErrorMessage } from "features/form/errorMessagesHandler";
import { VaultWarningMessage } from "features/form/warningMessagesHandler";
import { useTranslation } from "next-i18next";
import { BasicBSFormChange } from "../../common/UITypes/basicBSFormChange";
import { Text } from 'theme-ui';

export interface SidebarAutoEditingProps {
  vault: Vault
  ilkData: IlkData
  isEditing: boolean
  basicBuySellState: BasicBSFormChange
  autoBuyTriggerData: BasicBSTriggerData
  errors: VaultErrorMessage[]
  warnings: VaultWarningMessage[]
  debtDelta: BigNumber
  collateralDelta: BigNumber
  sliderMin: BigNumber
  sliderMax: BigNumber
}

export function SidebarAutoStopLossConfirmation({
  basicBuySellState,
  vault,

}: SidebarAutoEditingProps) {
  const { t } = useTranslation();

  const executionPrice = collateralPriceAtRatio({
    colRatio: basicBuySellState.execCollRatio.div(100),
    collateral: vault.lockedCollateral,
    vaultDebt: vault.debt,
  })

  return (
    <>
      <Text as="p" variant="paragraph3" sx={{ color: 'neutral80' }}>
        {basicBuySellState.maxBuyOrMinSellPrice !== undefined
          ? t('auto-buy.set-trigger-description', {
            targetCollRatio: basicBuySellState.targetCollRatio.toNumber(),
            token: vault.token,
            execCollRatio: basicBuySellState.execCollRatio,
            executionPrice: executionPrice.toFixed(2),
            minBuyPrice: basicBuySellState.maxBuyOrMinSellPrice,
          })
          : t('auto-buy.set-trigger-description-no-threshold', {
            targetCollRatio: basicBuySellState.targetCollRatio.toNumber(),
            token: vault.token,
            execCollRatio: basicBuySellState.execCollRatio,
            executionPrice: executionPrice.toFixed(2),
          })}{' '}
        {/* TODO ŁW link to article in kb */}
        <AppLink href="https://kb.oasis.app/help/" sx={{ fontSize: 2 }}>
          {t('here')}.
        </AppLink>
      </Text>
    </>
  )
}