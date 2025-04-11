import React, { useState } from "react";

// 총 발행량
const TOTAL_SUPPLY = 1_000_000_000;
// 초기 하루 채굴량
const INITIAL_DAILY_CAP = 500_000;

// 반감 횟수 계산
function getHalvingCount(totalMined) {
  let halvingCount = 0;
  let threshold = TOTAL_SUPPLY / 2;

  while (totalMined >= threshold && threshold >= 1) {
    halvingCount++;
    threshold /= 2;
  }

  return halvingCount;
}

// 현재 하루 채굴 총량 계산
function getDailyMiningCap(totalMined) {
  const halvingCount = getHalvingCount(totalMined);
  return INITIAL_DAILY_CAP / Math.pow(2, halvingCount);
}

// 유저 해시레이트 계산
function getUserHashRate(totalUsers, totalMined) {
  const dailyCap = getDailyMiningCap(totalMined);
  return dailyCap / totalUsers;
}

const MiningSimulator = ({ walletAddress }) => {
  const [totalUsers, setTotalUsers] = useState(100);
  const [totalMined, setTotalMined] = useState(0);
  const [userLog, setUserLog] = useState({});

  const handleMine = () => {
    if (!walletAddress) {
      alert("TON 지갑을 먼저 연결해주세요.");
      return;
    }

    const hashRate = getUserHashRate(totalUsers, totalMined);
    const newTotal = totalMined + hashRate;

    setUserLog((prev) => ({
      ...prev,
      [walletAddress]: (prev[walletAddress] || 0) + hashRate,
    }));

    setTotalMined(newTotal);
  };

  const myMined = userLog[walletAddress] || 0;

  return (
    <div style={{ padding: 20, border: "1px solid #ccc", borderRadius: 12 }}>
      <h3>채굴 시뮬레이터</h3>

      <p><strong>전체 유저 수:</strong> {totalUsers}</p>
      <p><strong>총 채굴량:</strong> {totalMined.toFixed(2)} / {TOTAL_SUPPLY}</p>
      <p><strong>내 채굴량:</strong> {myMined.toFixed(6)}</p>

      <button onClick={handleMine
