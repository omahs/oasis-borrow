import BigNumber from 'bignumber.js'

export interface BorrowPositionMachineContext {
  depositAmount?: BigNumber
  depositAmountUSD?: BigNumber
  generateAmount?: BigNumber
  generateOn?: boolean
  proxy?: string
  allowanceAmount?: BigNumber
  allowance?: BigNumber
  allowanceHash?: string
  positionHash?: string
  errorMessage?: string
  id?: BigNumber
}

export interface ProxyInfo {
  proxyAddress: string
}

interface AllowanceAmountInfo {
  amount: number
}

export interface AllowanceInfo {
  txHash: string
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

export interface PositionInfo {
  txHash: string
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
