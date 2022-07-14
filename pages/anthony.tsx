import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import React from 'react'

import { WithConnection } from '../components/connectWallet/ConnectWallet'
import { ProductPagesLayout } from '../components/Layouts'
import { BorrowView } from '../features/borrow/BorrowView'
import { useAppContext } from '../components/AppContextProvider'
import { useObservable } from '../helpers/observableHook'
import {
  adjustMultiplyVault,
  MultiplyAdjustData,
} from '../blockchain/calls/proxyActions/proxyActions'
import { TxMetaKind } from '../blockchain/calls/txMeta'
import { zero } from '../helpers/zero'
import BigNumber from 'bignumber.js'

export const getStaticProps = async ({ locale }: { locale: string }) => ({
  props: {
    ...(await serverSideTranslations(locale, ['common'])),
  },
})

function BorrowPage() {
  return (
    <WithConnection>
      <Anthony />
    </WithConnection>
  )
}

const args: MultiplyAdjustData = {
  kind: TxMetaKind.adjustPosition,
  depositCollateral: zero,
  depositDai: zero,
  withdrawCollateral: zero,
  withdrawDai: zero,
  requiredDebt: new BigNumber('1575.281922641062522997524872497118260205255608432'),
  borrowedCollateral: new BigNumber('1.477568869742403674406312987334923081147643276'),
  userAddress: '0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266',
  proxyAddress: '0xadFd5682b1d87A681aD52e9167aF83d0178749E5',
  exchangeAddress: '0x1111111254fb6c44bac0bed2854e76f90643097d',
  exchangeData:
    '0xe449022e00000000000000000000000000000000000000000000000014816128b621647700000000000000000000000000000000000000000000005591271aeb5cfd56800000000000000000000000000000000000000000000000000000000000000060000000000000000000000000000000000000000000000000000000000000000180000000000000000000000060594a405d53811d3bc4766596efd80fd545a270b03a8694',
  slippage: new BigNumber('0.01'),
  action: 'SELL_COLLATERAL',
  token: 'ETH',
  id: new BigNumber(28981),
  ilk: 'ETH-C',
}

function Anthony() {
  const { txHelpers$ } = useAppContext()
  const [txHelpers] = useObservable(txHelpers$)
  // eth b vault. deposit 200 eth.  col. ratio 330% (liq price 420.45)
  // increase col ratio to 335%
  //
  function estimateGas() {
    txHelpers && txHelpers.estimateGas(adjustMultiplyVault, args)
  }

  function send() {
    txHelpers && txHelpers.send(adjustMultiplyVault, args)
  }

  if (!txHelpers) {
    return <>no txn helpers</>
  } else {
    return (
      <>
        <button onClick={estimateGas}>estimate gas</button>
        <button onClick={send}>send </button>
      </>
    )
  }
}

BorrowPage.layout = ProductPagesLayout
BorrowPage.theme = 'Landing'

export default BorrowPage

// place estimateGas
// depositCollateral 0
// depositDai 0
// withdrawCollateral 0
// withdrawDai 0
// requiredDebt 2130.522736886296016679051832527593803468776276506
// borrowedCollateral 2.006942556599002896783717050670858961284082275
// slippage 0.01
// userAddress 0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266
// proxyAddress 0xb1E0A97452fA7DB61494114631A0f6149461e17f
// exchangeAddress 0x1111111254fb6c44bac0bed2854e76f90643097d
// exchangeData 0xe449022e0000000000000000000000000000000000000000000000001bda179f3ab2a711000000000000000000000000000000000000000000000073ba138b7cbcb353ae00000000000000000000000000000000000000000000000000000000000000600000000000000000000000000000000000000000000000000000000000000001800000000000000000000000c2e9f25be6257c210d7adf0d4cd6e3e881ba25f8b03a8694
// action SELL_COLLATERAL
// token ETH
// id 28979
// ilk ETH-B
// txnSent false
// collateral * debt = 4275.83674845888770014493924887316376855964118065981885536825044416172592406357672636185353115

// first send from where we estimated gas (failed) - https://dashboard.tenderly.co/sennettoasis/project/local-transactions/552e453a-bda2-4a7f-9ab6-211ca9d867e8/debugger?trace=0.0.0.1.1.5.5.9

// place send
// depositCollateral 0
// depositDai 0
// withdrawCollateral 0
// withdrawDai 0
// requiredDebt 2130.522736886296016615073998075673018993840707219
// borrowedCollateral 2.006942556599002896600328188565585935315148071
// slippage 0.01
// userAddress 0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266
// proxyAddress 0xb1E0A97452fA7DB61494114631A0f6149461e17f
// exchangeAddress 0x1111111254fb6c44bac0bed2854e76f90643097d
// exchangeData 0xe449022e0000000000000000000000000000000000000000000000001bda179f3ab29ad3000000000000000000000000000000000000000000000073ba138b7cbc80762f00000000000000000000000000000000000000000000000000000000000000600000000000000000000000000000000000000000000000000000000000000001800000000000000000000000c2e9f25be6257c210d7adf0d4cd6e3e881ba25f8b03a8694
// action SELL_COLLATERAL
// token ETH
// id 28979
// ilk ETH-B
// txnSent false
// collateral * debt = 4275.836748458887699625825269825568276799531901475374270190973326367131008768174624526343624549

// second send that passed

// place send
// depositCollateral 0
// depositDai 0
// withdrawCollateral 0
// withdrawDai 0
// requiredDebt 2130.522736886296016679051832527593803468776276506
// borrowedCollateral 2.006942556599002896783717050670858961284082275
// slippage 0.01
// userAddress 0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266
// proxyAddress 0xb1E0A97452fA7DB61494114631A0f6149461e17f
// exchangeAddress 0x1111111254fb6c44bac0bed2854e76f90643097d
// exchangeData 0xe449022e0000000000000000000000000000000000000000000000001bda179f3ab2a711000000000000000000000000000000000000000000000073ba138b7cbcb353ae00000000000000000000000000000000000000000000000000000000000000600000000000000000000000000000000000000000000000000000000000000001800000000000000000000000c2e9f25be6257c210d7adf0d4cd6e3e881ba25f8b03a8694
// action SELL_COLLATERAL
// token ETH
// id 28979
// ilk ETH-B
// txnSent false
// collateral * debt = 4275.83674845888770014493924887316376855964118065981885536825044416172592406357672636185353115
