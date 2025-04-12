import React, { useState, useEffect } from "react";
import { useTonWallet, TonConnectButton } from "@tonconnect/ui-react";
import { MiningCard } from "./components/MiningCard";

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
  const wallet = useTonWallet();
  const [walletAddress, setWalletAddress] = useState("");
  const [points, setPoints] = useState(0);
  const [userInfo, setUserInfo] = useState<TelegramUser | null>(null);

  useEffect(() => {
    if (wallet?.account?.address) {
      setWalletAddress(wallet.account.address);
    }
  }, [wallet]);

  useEffect(() => {
    const tg = window.Telegram.WebApp;
    tg.ready();
    tg.expand();
    setUserInfo(tg.initDataUnsafe?.user || null);
  }, []);

  useEffect(() => {
    const fetchPoints = async () => {
      if (!walletAddress) return;
      try {
        const res = await fetch(`https://ton-engog-mining-backend.onrender.com/mining/status?walletAddress=${walletAddress}`);
        const data = await res.json();
        setPoints(data.points || 0);
      } catch (err) {
        console.error("포인트 조회 실패:", err);
      }
    };
    fetchPoints();
  }, [walletAddress]);

  const handleMineClick = async () => {
    if (!wallet) {
      alert("TON 지갑을 먼저 연결해주세요.");
      return;
    }
    try {
      const res = await fetch(`https://ton-engog-mining-backend.onrender.com/mining/mine`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ walletAddress }),
      });
      const data = await res.json();
      alert(`${data.updatedPoints} 포인트를 채굴했습니다!`);
      setPoints(data.updatedPoints || 0);
    } catch (err) {
      console.error("채굴 실패:", err);
    }
  };

  const handleClaim = async () => {
    try {
      const res = await fetch(`https://ton-engog-mining-backend.onrender.com/mining/claim`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ walletAddress }),
      });
      const data = await res.json();
      if (res.ok) {
        alert(`${data.claimedPoints} 포인트를 클레임 했습니다.`);
        setPoints(0);
      } else {
        alert(data.message || "클레임 실패");
      }
    } catch (err) {
      console.error("클레임 에러:", err);
    }
  };

  return (
    <main className="min-h-screen bg-gray-100 py-10 px-4 flex flex-col items-center">
      <h2 className="text-2xl font-bold mb-4">TON 채굴 Web App</h2>

      {userInfo ? (
        <div className="mb-4 text-center">
          <p><strong>이름:</strong> {userInfo.first_name}</p>
          <p><strong>Telegram ID:</strong> {userInfo.id}</p>
        </div>
      ) : (
        <p className="mb-4">유저 정보를 불러오는 중...</p>
      )}

      <TonConnectButton className="mb-6" />

      {walletAddress && (
        <MiningCard walletAddress={walletAddress} points={points} onClaim={handleClaim} />
      )}

      <button
        onClick={handleMineClick}
        className="mt-6 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-6 rounded-2xl shadow transition-all"
      >
        채굴 시작
      </button>
    </main>
  );
};

export default App;
