import { useEffect, useState } from "react";
import { useTonWallet  } from "@tonconnect/ui-react";
import { useWallet } from "../context/WalletContext";

export const useTonWalletManager = () => {
  const tonWallet = useTonWallet(); // @tonconnect/ui-react 제공
  const { walletAddress, setWalletAddress } = useWallet();
  const [points, setPoints] = useState<number>(0);

  // 지갑 주소를 WalletContext에 저장
  useEffect(() => {
    if (tonWallet?.account?.address) {
      setWalletAddress(tonWallet.account.address);
    }
  }, [tonWallet, setWalletAddress]);

  return { walletAddress };
};
