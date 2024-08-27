import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { PageHOC, CustomInput, CustomButton } from '../components';
import { useGlobalContext } from '../context';

const Home = () => {
  const { contract, walletAddress, setShowAlert } = useGlobalContext();
  const [playerName, setPlayerName] = useState('');
  const navigate = useNavigate();

  const handleClick = async () => {
    try {
      const playerExists = await contract.isPlayer(walletAddress);
      console.log('playerExists:', playerExists)

      if(!playerExists) {
        await contract.registerPlayer(playerName, playerName);

        setShowAlert({
          status: true,
          type: 'info',
          message: `${playerName} is being summoned!`
        })
      }
    } catch (error) {
      console.log('Error:', error.message)

      setShowAlert({
        status: true,
        type: 'failure',
        message: 'Something went wrong!'
      })
    }
  }

    useEffect(() => {
    const createPlayerToken = async () => {
      try {
        const playerExists = await contract.isPlayer(walletAddress);
        const playerTokenExists = await contract.isPlayerToken(walletAddress);

        if (playerExists && playerTokenExists) {
          navigate('/create-battle');
        }
      } catch (error) {
        console.error("Error in createPlayerToken:", error);
      }
    };

    if (contract) createPlayerToken();
  }, [contract, walletAddress, navigate]);
  

  return (
    walletAddress && (
      <div className="flex flex-col">
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
    )
  );
};

export default PageHOC(
  Home,
  <>
    Welcome to Avax Gods <br /> a Web3 NFT Card Game
  </>,
  <>
    Connect your wallet to start playing <br /> the ultimatr Web3 Battle Card
    Gaame
  </>
);
