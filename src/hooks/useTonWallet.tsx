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

    const handleClaim = async () => {
      const res = await fetch(`https://ton-engog-mining-backend.onrender.com/mining/claim`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ walletAddress }),
    });

    if (res.ok) {
      const data = await res.json();
      alert(`${data.claimedPoints} 포인트가 클레임되었습니다.`);
      setPoints(0);
    }
  };

  return { walletAddress, points, handleClaim };
};
