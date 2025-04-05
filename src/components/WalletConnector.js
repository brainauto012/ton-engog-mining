import React, { useEffect } from "react";
import { TonConnectButton, useTonConnectUI } from "@tonconnect/ui-react";
import { useWallet } from "../context/WalletContext";

const WalletConnector = () => {
  const [tonConnectUI] = useTonConnectUI();
  const { setWalletAddress } = useWallet();

  useEffect(() => {
    tonConnectUI.onStatusChange(wallet => {
      if (wallet && wallet.account) {
        setWalletAddress(wallet.account.address);
        console.log("🔗 연결된 지갑 주소:", wallet.account.address);
      } else {
        setWalletAddress(null);
        console.log("❌ 지갑 연결 해제됨");
      }
    });
  }, [tonConnectUI, setWalletAddress]);

  return (
    <div>
      <TonConnectButton />
    </div>
  );
};

export default WalletConnector;
