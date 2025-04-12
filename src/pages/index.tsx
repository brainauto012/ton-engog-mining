import { useEffect, useState } from 'react';
import React from 'react';
import { MiningCard } from '../components/MiningCard';
import { TonConnectButton, useTonConnectUI, useTonWallet } from '@tonconnect/ui-react';

export default function Home() {
  const wallet = useTonWallet();
  const [walletAddress, setWalletAddress] = useState('');
  const [points, setPoints] = useState(0);
  const [_, setTonConnectUI] = useTonConnectUI();

  // 지갑 주소가 연결되면 상태 업데이트
  useEffect(() => {
    if (wallet?.account?.address) {
      setWalletAddress(wallet.account.address);
    }
  }, [wallet]);

  // 백엔드에서 포인트 불러오기
  useEffect(() => {
    const fetchPoints = async () => {
      if (!walletAddress) return;

      try {
        const res = await fetch(`https://YOUR_RENDER_BACKEND_URL/mining/status?walletAddress=${walletAddress}`);
        const data = await res.json();
        setPoints(data.points || 0);
      } catch (err) {
        console.error('포인트 조회 실패:', err);
      }
    };

    fetchPoints();
  }, [walletAddress]);

  // Claim 버튼 클릭 핸들러
  const handleClaim = async () => {
    try {
      const res = await fetch(`https://YOUR_RENDER_BACKEND_URL/mining/claim`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ walletAddress }),
      });
      const data = await res.json();

      if (res.ok) {
        alert(`${data.claimedPoints} 포인트를 클레임 했습니다.`);
        setPoints(0);
      } else {
        alert(data.message || '클레임 실패');
      }
    } catch (err) {
      console.error('클레임 에러:', err);
    }
  };

  return (
    <main className="min-h-screen bg-gray-100 py-10 flex flex-col items-center">
      <TonConnectButton />
      {walletAddress && (
        <MiningCard walletAddress={walletAddress} points={points} onClaim={handleClaim} />
      )}
    </main>
  );
}