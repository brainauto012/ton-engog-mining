export async function claimPoints(walletAddress: string) {
    const response = await fetch('/mining/claim', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ walletAddress }),
    });
  
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || '클레임 실패');
    }
  
    return response.json();
  }
  