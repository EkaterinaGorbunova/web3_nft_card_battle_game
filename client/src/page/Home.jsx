import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { PageHOC, CustomInput, CustomButton } from '../components';
import { useGlobalContext } from '../context';
import { allCards, attack, defense } from '../assets';

const Home = () => {
  const {
    contract,
    walletAddress,
    gameData,
    setShowAlert,
    setErrorMessage,
    updateCurrentWalletAddress,
    setHasInitiatedConnect,
    hasInitiatedConnect,
  } = useGlobalContext();
  const [playerName, setPlayerName] = useState('');
  const navigate = useNavigate();

  const handleClick = async () => {
    try {
      const playerExists = await contract.isPlayer(walletAddress);

      if (!playerExists) {
        await contract.registerPlayer(playerName, playerName, { gasLimit: 500000 });

        setShowAlert({
          status: true,
          type: 'info',
          message: `${playerName} is being summoned!`,
        });

        setTimeout(() => navigate('/create-battle'), 8000);
      }
    } catch (error) {
      setErrorMessage(error);
    }
  };

  const handleConnect = async () => {
    setHasInitiatedConnect(true);
    if (!window?.ethereum) return;
    await updateCurrentWalletAddress();
  };

  useEffect(() => {
    const checkForPlayerToken = async () => {
      const playerExists = await contract.isPlayer(walletAddress);
      const playerTokenExists = await contract.isPlayerToken(walletAddress);

      if (playerExists && playerTokenExists) {
        navigate('/create-battle');
      }
    };

    if (contract && walletAddress) checkForPlayerToken();
  }, [contract, walletAddress]);

  useEffect(() => {
    if (gameData.activeBattle) {
      navigate(`/battle/${gameData.activeBattle.name}`);
    }
  }, [gameData]);

  if (walletAddress && hasInitiatedConnect) {
    return (
      <div className="flex flex-col">
        <button
          type="button"
          onClick={() => setHasInitiatedConnect(false)}
          className="self-start font-rajdhani text-siteViolet text-base mb-4 cursor-pointer hover:underline"
        >
          ← Back
        </button>

        <CustomInput
          label="Name"
          placeHolder="Enter your player name"
          value={playerName}
          handleValueChange={setPlayerName}
        />

        <CustomButton
          title="Register"
          handleClick={handleClick}
          restStyles="mt-6"
        />
      </div>
    );
  }

  const showcaseCards = [allCards[0], allCards[10], allCards[20], allCards[5]];
  const features = [
    { icon: attack, title: 'Strategic Battles', text: 'Pick your moves, manage mana and outsmart rivals.' },
    { icon: defense, title: 'Moves Run On-Chain', text: 'Every move is a smart-contract transaction.' },
  ];
  const steps = [
    { n: '1', title: 'Connect a wallet', text: 'MetaMask, Core or any Web3 wallet works.' },
    { n: '2', title: 'Switch to Fuji testnet', text: 'One click — we add the network for you.' },
    { n: '3', title: 'Get free test AVAX', text: 'Grab tokens from the faucet to cover gas.' },
    { n: '4', title: 'Pick a name & battle', text: 'Register your warrior and challenge others.' },
  ];


  return (
    <div className="flex flex-col">
      <div className="inline-flex self-start items-center gap-2 px-3 py-1 rounded-full bg-siteViolet/20 border border-siteViolet/40 mb-4">
        <span className="w-2 h-2 rounded-full bg-siteViolet" />
        <span className="font-rajdhani text-sm text-white">
          Free to play · Avalanche Fuji testnet · No real money
        </span>
      </div>

      <div className="flex sm:flex-row flex-col gap-4 mt-2 mb-8">
        {showcaseCards.map((card, idx) => (
          <div
            key={idx}
            className="flex-1 rounded-xl overflow-hidden bg-siteDimBlack p-2 transition-transform hover:-translate-y-2"
            style={{ boxShadow: '0 8px 24px rgba(127, 70, 240, 0.25)' }}
          >
            <img src={card} alt={`card-${idx}`} className="w-full h-[180px] object-contain" />
          </div>
        ))}
      </div>

      <div className="flex sm:flex-row flex-col gap-6 mb-8">
        {features.map((f, idx) => (
          <div
            key={idx}
            className="flex-1 flex flex-row items-center gap-4 p-4 rounded-lg bg-siteDimBlack border border-siteViolet/30"
          >
            <img src={f.icon} alt={f.title} className="w-12 h-12 object-contain" />
            <div className="flex flex-col">
              <h3 className="font-rajdhani font-bold text-xl text-white">{f.title}</h3>
              <p className="font-rajdhani text-base text-siteWhite">{f.text}</p>
            </div>
          </div>
        ))}
      </div>

      <h2 className="font-rajdhani font-bold text-white text-2xl mb-4">How it works</h2>
      <div className="grid sm:grid-cols-2 grid-cols-1 gap-4 mb-8">
        {steps.map((s) => (
          <div
            key={s.n}
            className="flex flex-row items-start gap-3 p-4 rounded-lg bg-siteDimBlack border border-siteViolet/20"
          >
            <div className="flex items-center justify-center w-9 h-9 rounded-full bg-siteViolet text-white font-rajdhani font-bold">
              {s.n}
            </div>
            <div className="flex flex-col">
              <h3 className="font-rajdhani font-semibold text-lg text-white">{s.title}</h3>
              <p className="font-rajdhani text-sm text-siteWhite">{s.text}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="flex sm:flex-row flex-col gap-3 items-start">
        <CustomButton
          title={window?.ethereum ? 'Connect Wallet & Play' : 'Get a Wallet to Play'}
          handleClick={handleConnect}
          restStyles="sm:text-xl text-lg sm:px-8 px-6 sm:py-3 py-2"
        />
        <a
          href="https://build.avax.network/console/primary-network/faucet"
          target="_blank"
          rel="noreferrer"
          className="font-rajdhani text-siteViolet underline self-center"
        >
          Need test AVAX? Open the faucet →
        </a>
      </div>

      <p className="font-rajdhani text-siteWhite text-sm mt-4">
        Works with MetaMask, Core and other Web3 wallets. You only pay tiny test-network gas — never real money.
      </p>
    </div>
  );
};

export default PageHOC(
  Home,
  <>
    Welcome to Battle Titans <br /> a Web3 NFT Card Game
  </>,
  <>
    Connect your wallet to start playing <br /> the ultimate Web3 Battle Card Game
  </>
);
