import React, { useState, useEffect } from "react";
import { useTonWallet } from "@tonconnect/ui-react";
import WalletConnector from "./components/WalletConnector"; // 이미 구현된 WalletConnector

declare global {
  interface Window {
    Telegram: any;
  }
}

interface TelegramUser {
  first_name: string;
  id: number;
}

const App: React.FC = () => {
  const [userInfo, setUserInfo] = useState<TelegramUser | null>(null);
  const wallet = useTonWallet();

  useEffect(() => {
    const tg = window.Telegram.WebApp;
    tg.ready();
    tg.expand();
    setUserInfo(tg.initDataUnsafe?.user || null);
  }, []);

  const handleMineClick = () => {
    if (!wallet) {
      alert("TON 지갑을 먼저 연결해주세요.");
      return;
    }
    alert("채굴 시작! (지갑 주소: " + wallet.account.address + ")");
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>TON 채굴 Web App</h2>
      {userInfo ? (
        <div>
          <p><strong>이름:</strong> {userInfo.first_name}</p>
          <p><strong>Telegram ID:</strong> {userInfo.id}</p>
        </div>
      ) : (
        <p>유저 정보를 불러오는 중...</p>
      )}
      <WalletConnector />
      <button onClick={handleMineClick}>채굴 시작</button>
    </div>
  );
};

export default App;
