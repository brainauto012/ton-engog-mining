import { ethers } from "ethers";

// Ethereum 객체 가져오기
export const getEthereumObject = () => window.ethereum;

// 지갑 연결 함수
export const connectWallet = async () => {
  try {
    const ethereum = getEthereumObject();
    if (!ethereum) throw new Error("MetaMask가 설치되어 있지 않습니다.");

    // 최초 연결 시 승인을 요청
    const accounts = await ethereum.request({ method: "eth_requestAccounts" });
    return accounts[0]; // 연결된 계정 반환
  } catch (error) {
    console.error(error);
    return null;
  }
};

// 지갑 해제 함수
export const disconnectWallet = (setAccount) => {
  try {
    setAccount(null); // 상태만 null로 설정하여 연결 해제
  } catch (error) {
    console.error("지갑 연결 해제 오류:", error);
  }
};

// 현재 연결된 지갑 확인 함수
export const getConnectedWallet = async () => {
  try {
    const ethereum = getEthereumObject();
    if (!ethereum) return null;

    // `eth_accounts` 대신 `eth_requestAccounts` 호출로 최신 계정 가져오기
    const accounts = await ethereum.request({ method: "eth_accounts" });
    return accounts.length > 0 ? accounts[0] : null;
  } catch (error) {
    console.error("현재 연결된 지갑 확인 오류:", error);
    return null;
  }
};
