import React, { useState } from "react";
import { MiningCard } from "./components/MiningCard"; // MiningCard 가져오기
import { useTonWallet } from "@tonconnect/ui-react";
import { getMiningStatus, claimPoints } from "./api/miningApi";

const App: React.FC = () => {
  const [points, setPoints] = useState(0);
  const wallet = useTonWallet();
  const walletAddress = wallet?.account?.address;

  const handleMineClick = async () => {
    if (!walletAddress) return;
    try {
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
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
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
