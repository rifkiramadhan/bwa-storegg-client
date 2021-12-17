import type { NextPage } from 'next';
import { useEffect } from 'react';
import AOS from 'aos';
import Head from 'next/head';
import Navbar from '../components/organisms/Navbar';
import MainBanner from '../components/organisms/MainBanner';
import TransactionStep from '../components/organisms/TransactionStep';
import FeaturedGame from '../components/organisms/FeaturedGame';
import Reached from '../components/organisms/Reached';
import Story from '../components/organisms/Story';
import Footer from '../components/organisms/Footer';

const Home: NextPage = () => {
  useEffect(() => {
    AOS.init();
  }, []);
  return (
    <>
        <Head>
          <title>Store GG - Get a New Experience in Gaming</title>
          <meta name="description" content="Kami menyediakan jutaan cara untuk membantu players menjadi pemenang sejati" />
          <meta property="og:title" content="Store GG - Get a New Experience in Gaming" />
          <meta property="og:description" content="Kami menyediakan jutaan cara untuk membantu players menjadi pemenang sejati" />
          <meta property="og:url" content="https://dailyspin.id/wp-content/uploads/2020/08/Logo-Baru-MLBB.jpg" />
        </Head>
        <Navbar />
        <MainBanner />
        <TransactionStep />
        <FeaturedGame />
        <Reached />
        <Story />
        <Footer />
    </>
  );
};

export default Home;
