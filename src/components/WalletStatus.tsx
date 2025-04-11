import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

type MiningStatus = {
  points: number;
  lastMinedAt: string;
};

interface WalletStatusProps {
  walletAddress: string;
}

const WalletStatus: React.FC<WalletStatusProps> = ({ walletAddress }) => {
  const [status, setStatus] = useState(null as MiningStatus | null);
  const [loading, setLoading] = useState(false);
  const [claiming, setClaiming] = useState(false);
  const [claimed, setClaimed] = useState(false);

  useEffect(() => {
    if (!walletAddress) return;

    const fetchStatus = async () => {
      setLoading(true);
      try {
        const res = await fetch(
          `http://localhost:3000/mining/status?walletAddress=${walletAddress}`
        );
        const data = await res.json();
        setStatus(data);
        setClaimed(false);
      } catch (error) {
        console.error('Error fetching mining status:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStatus();
  }, [walletAddress]);

  const handleClaim = async () => {
    if (!walletAddress) return;
    setClaiming(true);

    try {
      const res = await fetch('http://localhost:3000/mining/claim', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ walletAddress }),
      });

      const result = await res.json();
      if (result.success) {
        setClaimed(true);
        setTimeout(() => setStatus(null), 1000); // 포인트 초기화
      } else {
        alert('⚠️ Claim 실패: ' + result.message);
      }
    } catch (error) {
      console.error('Claim error:', error);
      alert('❌ Claim 중 오류 발생');
    } finally {
      setClaiming(false);
    }
  };

  return (
    <div className="flex justify-center mt-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: 'spring', stiffness: 100 }}
        className="bg-white shadow-xl rounded-2xl p-6 w-full max-w-md border border-gray-100"
      >
        <h2 className="text-xl font-semibold text-center text-gray-800 mb-4">🪙 마이닝 현황</h2>

        {loading ? (
          <p className="text-center text-gray-400">불러오는 중...</p>
        ) : status ? (
          <div className="text-center">
            <AnimatePresence>
              {!claimed && (
                <motion.div
                  key="points"
                  initial={{ opacity: 1 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5 }}
                  className="flex items-center justify-center mb-4"
                >
                  <span className="text-4xl mr-2">⛏️</span>
                  <span className="text-3xl font-bold text-blue-600">{status.points}</span>
                  <span className="ml-2 text-lg text-gray-500">포인트</span>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="text-sm text-gray-600 mb-4">
              마지막 채굴: {new Date(status.lastMinedAt).toLocaleString()}
            </div>

            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={handleClaim}
              disabled={claiming || claimed}
              className={`mt-2 px-6 py-2 ${
                claimed ? 'bg-gray-300' : 'bg-green-500 hover:bg-green-600'
              } text-white font-semibold rounded-full transition`}
            >
              {claiming ? 'Claim 중...' : claimed ? 'Claim 완료!' : '💸 Claim'}
            </motion.button>
          </div>
        ) : (
          <p className="text-center text-gray-500">지갑 주소를 연결해주세요.</p>
        )}
      </motion.div>
    </div>
  );
};

export default WalletStatus;
