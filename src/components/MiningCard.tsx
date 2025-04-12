import React, { useEffect, useState } from 'react';
import { Button } from './ui/Button';
import { motion } from 'framer-motion';
import { FaCoins } from 'react-icons/fa';

interface MiningCardProps {
  walletAddress: string;
  points: number;
  onClaim: () => void;
}

export const MiningCard: React.FC<MiningCardProps> = ({ walletAddress, points, onClaim }) => {
  const [showAnimation, setShowAnimation] = useState(false);

  const handleClaim = () => {
    setShowAnimation(true);
    onClaim();
  };

  useEffect(() => {
    if (showAnimation) {
      const timer = setTimeout(() => setShowAnimation(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [showAnimation]);

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 w-full max-w-md mx-auto text-center relative">
      <div className="flex items-center justify-center space-x-2 mb-4">
        {FaCoins({ className: "text-yellow-500 text-2xl" })}
        <span className="text-xl font-bold">{points} P</span>
      </div>
      <p className="text-gray-600 mb-2">
        Wallet: {walletAddress.slice(0, 6)}...{walletAddress.slice(-4)}
      </p>
      <Button onClick={handleClaim}>Claim</Button>

      {showAnimation && (
        <motion.div
          className="absolute top-0 left-1/2 transform -translate-x-1/2 text-yellow-400 text-4xl"
          initial={{ y: 0, opacity: 1 }}
          animate={{ y: -100, opacity: 0 }}
          transition={{ duration: 1 }}
        >
          🪙
        </motion.div>
      )}
    </div>
  );
};
