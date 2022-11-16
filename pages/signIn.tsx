import React, { useEffect } from "react";
import { ConnectWallet, useAddress } from "@thirdweb-dev/react";
import { useRouter } from "next/router";

const SignIn = () => {
  const router = useRouter();
  const address = useAddress();
  useEffect(() => {
    if (!address) return;
    router.push("/");
  }, [address]);
  return (
    <main className="w-full h-screen bg-black flex items-center justify-center flex-col space-y-8">
      <h1 className="text-xl font-bold md:text-4xl text-white">
        Connect wallet then Sign In
      </h1>
      <ConnectWallet />
    </main>
  );
};

export default SignIn;
