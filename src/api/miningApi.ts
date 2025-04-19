// src/api/miningApi.ts
const API_BASE_URL = process.env.REACT_APP_API_URL;

export const startMining = async (walletAddress: string) => {
  const res = await fetch(`${API_BASE_URL}/mining/start`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ walletAddress }),
  });

  if (!res.ok) throw new Error("Failed to start mining");
  return await res.json();
};

export const getMiningStatus = async (walletAddress: string) => {
  const res = await fetch(`${API_BASE_URL}/mining/status?walletAddress=${walletAddress}`);
  if (!res.ok) throw new Error("Failed to fetch mining status");
  return await res.json();
};

export const claimPoints = async (walletAddress: string) => {
  console.log("🚀 [claimPoints] API 요청 시작:", walletAddress);
  console.log("👉 요청 URL:", `${API_BASE_URL}/mining/claim`);

  const res = await fetch(`${API_BASE_URL}/mining/claim`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ walletAddress }),
  });

  console.log("🌐 [claimPoints] 응답 상태코드:", res.status);

  if (!res.ok) {
    const errorText = await res.text();
    console.error("❌ [claimPoints] 실패 응답:", errorText);
    throw new Error("Failed to claim points");
  }

  const result = await res.json();
  console.log("✅ [claimPoints] 성공 응답:", result);
  return result;
};