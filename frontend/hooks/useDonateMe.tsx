import { useContractWrite, useAccount } from 'wagmi'
import { utils } from 'ethers'
import DonateAbi from '../abis/DonateAbi.json'
import { donateAddress } from '../constants'

const useDonateMe = () => {
  const { address } = useAccount()
  const { writeAsync, status, data } = useContractWrite({
    mode: 'recklesslyUnprepared',
    address: donateAddress,
    abi: DonateAbi,
    functionName: 'donateMe',
    args: [utils.parseEther('0.001')],
    overrides: {
      from: address,
      value: utils.parseEther('0.001'),
    },
  })

  return {
    mint: writeAsync,
    status,
    data,
  }
}

export default useDonateMe
