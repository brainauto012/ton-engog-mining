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
  const res = await fetch(`${API_BASE_URL}/mining/claim`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ walletAddress }),
  });
  if (!res.ok) throw new Error("Failed to claim points");
  return await res.json();
};