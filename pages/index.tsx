import type { NextPage } from "next";
import dynamic from "next/dynamic";
import Head from "next/head";
import GenerateBalls from "../components/generate-balls";
import Header from "../components/header";
import Subscribers from "../components/subscribers";
const CountDown = dynamic(import("../components/count-down"), {
  ssr: false,
});

const Home: NextPage = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-5 bg-black">
      <Head>
        <title>Lottery App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex w-full flex-1 flex-col space-y-5 items-center text-center text-white px-5 lg:px-20">
        <h1 className="text-4xl font-bold">Lottery App</h1>
        {/* header */}
        <Header />
        {/* count down */}
        <CountDown />
        {/* generate balls */}
        <GenerateBalls />
        {/* subscribers */}
        <Subscribers />
      </main>
    </div>
  );
};

export default Home;
