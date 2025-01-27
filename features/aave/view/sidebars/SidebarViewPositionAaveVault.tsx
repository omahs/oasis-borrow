import BigNumber from 'bignumber.js'
import { SliderValuePicker } from 'components/dumb/SliderValuePicker'
import { SidebarSection, SidebarSectionProps } from 'components/sidebar/SidebarSection'
import { StrategyConfig } from 'features/aave/common/StrategyConfigType'
import { aaveStETHMinimumRiskRatio } from 'features/aave/constants'
import { AaveProtocolData } from 'features/aave/manage/state'
import { formatBigNumber } from 'helpers/formatters/format'
import { zero } from 'helpers/zero'
import { useTranslation } from 'next-i18next'
import React from 'react'
import { Flex, Grid, Link, Text } from 'theme-ui'

export function SidebarViewPositionAaveVault({
  aaveProtocolData,
  strategyConfig,
}: {
  aaveProtocolData: AaveProtocolData
  strategyConfig?: StrategyConfig
}) {
  const { t } = useTranslation()
  enum RiskLevel {
    OK = 'OK',
    AT_RISK = 'AT_RISK',
  }
  const warningHealthFactor = new BigNumber('1.25')
  const liquidationPrice = !aaveProtocolData.position.liquidationPrice.isNaN()
    ? aaveProtocolData.position.liquidationPrice
    : zero
  const healthFactor = aaveProtocolData.position.healthFactor
  const riskTrafficLight = healthFactor?.gt(warningHealthFactor) ? RiskLevel.OK : RiskLevel.AT_RISK
  const maxRisk = aaveProtocolData.position.category.maxLoanToValue
  const sliderValue = aaveProtocolData.position.riskRatio.loanToValue

  const sidebarSectionProps: SidebarSectionProps = {
    title: t('open-earn.aave.vault-form.title'),
    content: (
      <Grid gap={3}>
        <SliderValuePicker
          sliderPercentageFill={new BigNumber(0)}
          leftBoundry={liquidationPrice}
          leftBoundryFormatter={(value) => formatBigNumber(value, 2)}
          rightBoundry={aaveProtocolData.oraclePrice}
          rightBoundryFormatter={(value) => `Current: ${formatBigNumber(value, 2)}`}
          rightBoundryStyling={{
            color: riskTrafficLight === RiskLevel.OK ? 'success100' : 'warning100',
          }}
          onChange={() => {}}
          minBoundry={aaveStETHMinimumRiskRatio.loanToValue}
          maxBoundry={maxRisk || zero}
          lastValue={sliderValue}
          disabled={true}
          step={0.01}
          leftLabel={t('open-earn.aave.vault-form.configure-multiple.liquidation-price', {
            collateralToken: strategyConfig!.tokens!.collateral,
            debtToken: strategyConfig!.tokens!.debt,
          })}
          rightLabel={
            <Link target="_blank" href="https://dune.com/dataalways/stETH-De-Peg">
              <Text variant="paragraph4" color="interactive100">
                {t('open-earn.aave.vault-form.configure-multiple.historical-ratio', {
                  collateralToken: strategyConfig!.tokens!.collateral,
                  debtToken: strategyConfig!.tokens!.debt,
                })}{' '}
                &gt;
              </Text>
            </Link>
          }
        />
        <Flex
          sx={{
            variant: 'text.paragraph4',
            justifyContent: 'space-between',
            color: 'neutral80',
          }}
        >
          <Text as="span">{t('open-earn.aave.vault-form.configure-multiple.decrease-risk')}</Text>
          <Text as="span">{t('open-earn.aave.vault-form.configure-multiple.increase-risk')}</Text>
        </Flex>
      </Grid>
    ),
    primaryButton: {
      disabled: true,
      label: t('manage-earn.aave.vault-form.adjust-risk'),
    },
    textButton: {
      disabled: true,
      label: t('manage-earn.aave.vault-form.close'),
    },
  }
  return <SidebarSection {...sidebarSectionProps} />
}
