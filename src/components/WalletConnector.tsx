import React from "react";
import { TonConnectButton } from "@tonconnect/ui-react";

export const WalletConnector: React.FC = () => {
  return (
    <div style={{ margin: "20px 0" }}>
      <TonConnectButton />
    </div>
  );
};

export default WalletConnector;
