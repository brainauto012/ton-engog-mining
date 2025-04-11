import React, { useState } from 'react';
import WalletStatus from './components/WalletStatus';

function App() {
  const [walletAddress, setWalletAddress] = useState('' as string);

  const handleConnectWallet = () => {
    // 실제로는 TON Connect 또는 메타마스크 등 사용
    // 임시로 테스트 주소
    setWalletAddress('0xabc1234567890');
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <button
        onClick={handleConnectWallet}
        className="mb-4 px-6 py-2 bg-blue-500 text-white rounded"
      >
        지갑 연결
      </button>

      <WalletStatus walletAddress={walletAddress} />
    </div>
  );
}

export default App;
