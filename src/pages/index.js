import Head from "next/head";
import Navbar from "@/components/global/Navbar";

const BerandaPage = () => {
  return (
    <>
      <Head>
        <title>SITARA</title>
      </Head>
      <div>
        <Navbar/>
        <h1 className="text-5xl mt-20 text-black">Beranda</h1>
      </div>
    </>
  );
}

export default BerandaPage;