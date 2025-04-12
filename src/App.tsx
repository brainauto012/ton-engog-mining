import React, { useEffect, useState } from "react";
import { MiningCard } from "./components/MiningCard"; // MiningCard 가져오기
import { useTonWallet } from "@tonconnect/ui-react";
import { getMiningStatus, claimPoints } from "./api/miningApi";
import WalletConnector from "./components/WalletConnector";

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
  const [points, setPoints] = useState(0);
  const wallet = useTonWallet();
  const walletAddress = wallet?.account?.address;
  const [userInfo, setUserInfo] = useState<TelegramUser | null>(null);

  useEffect(() => {
    const tg = window.Telegram.WebApp;
    tg.ready();
    tg.expand();
    setUserInfo(tg.initDataUnsafe?.user || null);
  }, []);

  const handleMineClick = async () => {
    if (!walletAddress) {
      alert("TON 지갑을 먼저 연결해주세요.");
      return;
    }
    try {
      alert("채굴 시작! (지갑 주소: " + wallet.account.address + ")");
      const status = await getMiningStatus(walletAddress);
      setPoints(status.points);
      //setLastMinedAt(status.lastMinedAt);
    } catch (err) {
      console.error("Failed to get mining info", err);
    }
  };

  const handleClaimClick = async () => {
    if (!walletAddress) return;
    try {
      const res = await claimPoints(walletAddress);
      alert(`${res.claimedPoints} 포인트가 클레임되었습니다.`);
      setPoints(0); // 클레임 완료 후 포인트 초기화
    } catch (err) {
      console.error("Claim 실패:", err);
    }
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
    {walletAddress ? (
      <MiningCard
        walletAddress={walletAddress}
        points={points}
        onMine={handleMineClick}
        onClaim={handleClaimClick}
      />
    ) : (
      <p>지갑을 연결해주세요</p>
    )}
    </div>
  );
};

export default App;
