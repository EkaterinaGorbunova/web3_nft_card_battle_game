import React, { createContext, useContext, useEffect, useRef, useState } from 'react';
import { ethers } from 'ethers';
import Web3Modal from 'web3modal';
import { useNavigate } from 'react-router-dom';

import { ABI, ADDRESS } from '../contract';
import { createEventListeners } from './createEventListeners';

const GlobalContext = createContext();

export const GlobalContextProvider = ({ children }) => {
  const [walletAddress, setWalletAddress] = useState('');
  const [provider, setProvider] = useState(null);
  const [contract, setContract] = useState(null);
  const [showAlert, setShowAlert] = useState({ status: false, type: 'info', message: '' });

  const navigate = useNavigate();

  //* Set the wallet address to the state
  const updateCurrentWalletAddress = async () => {
    const accounts = await window?.ethereum?.request({ method: 'eth_requestAccounts' });

    if (accounts) setWalletAddress(accounts[0]);
  };

  // useEffect(() => {
  //   updateCurrentWalletAddress();
  //   window?.ethereum?.on('accountsChanged', updateCurrentWalletAddress);
  // }, [])

  //* Set the smart contract and the provider th the state
  useEffect(() => {
    const setSmartContractAndProvider = async () => {
      const web3Modal = new Web3Modal();
      const connection = await web3Modal.connect();
      const newProvider = new ethers.providers.Web3Provider(connection);
      const signer = newProvider.getSigner();
      const newContract = new ethers.Contract(ADDRESS, ABI, signer);

      setProvider(newProvider);
      setContract(newContract);

      // https://ethereum.stackexchange.com/questions/151791/error-user-rejected-when-trying-to-do-connection-to-core-app-wallet-extension-o
      updateCurrentWalletAddress();
      window?.ethereum?.on('accountsChanged', updateCurrentWalletAddress);
    };

    setSmartContractAndProvider();
  }, []);

  useEffect(() => {
    console.log('Contract after state update:', contract);
  }, [contract]);

    //* Set the game data to the state
    useEffect(() => {
        if (contract) {
          createEventListeners({
            navigate, contract, provider, walletAddress, setShowAlert,
          })
        }

    }, [contract]);

  //* Handle alerts
  useEffect(() => {
    if(showAlert?.status) {
      const timer = setTimeout(() => {
        setShowAlert({ status: false, type: 'info', message: '' });
      }, [5000]);

      return () => clearTimeout(timer);
    }
  }, [showAlert]);

  return (
  <GlobalContext.Provider value={{
    contract, walletAddress, showAlert, setShowAlert
  }}>
  {children}
  </GlobalContext.Provider>
  )
}

export const useGlobalContext = () => useContext(GlobalContext);