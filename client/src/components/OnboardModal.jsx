import { useState, useEffect } from 'react';
import Modal from 'react-modal';
import { useLocation } from 'react-router-dom';

import styles from '../styles';
import { CustomButton } from '.';
import { useGlobalContext } from '../context';
import { GetParams, SwitchNetwork } from '../utils/onboard.js';

const OnboardModal = () => {
  const [modalIsOpen, setIsOpen] = useState(false);
  const {
    updateCurrentWalletAddress,
    hasInitiatedConnect,
    setHasInitiatedConnect,
  } = useGlobalContext();
  const [step, setStep] = useState(-1);
  const location = useLocation();

  const isHome = location.pathname === '/';

  async function resetParams() {
    const currentStep = await GetParams();
    setStep(currentStep.step);
    setIsOpen(currentStep.step !== -1 && (!isHome || hasInitiatedConnect));
  }

  useEffect(() => {
    resetParams();

    window?.ethereum?.on('chainChanged', () => {
      resetParams();
    });

    window?.ethereum?.on('accountsChanged', () => {
      resetParams();
    });
  }, [location.pathname, hasInitiatedConnect]);

  const closeModal = () => {
    setIsOpen(false);
    setHasInitiatedConnect(false);
  };

  const generateStep = (st) => {
    switch (st) {
      case 0:
        return (
          <>
            <p className={styles.modalText}>
              No Web3 wallet detected. Install one to start playing:
            </p>
            <div className="flex sm:flex-row flex-col gap-3">
              <CustomButton
                title="Install MetaMask"
                handleClick={() => window.open('https://metamask.io/download/', '_blank')}
              />
              <CustomButton
                title="Install Core"
                handleClick={() => window.open('https://core.app/', '_blank')}
              />
            </div>
          </>
        );

      case 1:
        return (
          <>
            <p className={styles.modalText}>
              Connect your wallet to continue
            </p>
            <CustomButton
              title="Connect Wallet"
              handleClick={updateCurrentWalletAddress}
            />
          </>
        );

      case 2:
        return (
          <>
            <p className={styles.modalText}>
              Wrong network. Switch to Avalanche Fuji testnet to play (it's free).
            </p>
            <CustomButton title="Switch to Fuji" handleClick={SwitchNetwork} />
          </>
        );

      case 3:
        return (
          <>
            <p className={styles.modalText}>
              You need a small amount of test AVAX to cover gas fees. They're free.
            </p>
            <CustomButton
              title="Get free test AVAX"
              handleClick={() => window.open('https://build.avax.network/console/primary-network/faucet', '_blank')}
            />
          </>
        );

      default:
        return <p className={styles.modalText}>Good to go!</p>;
    }
  };

  return (
    <Modal
      isOpen={modalIsOpen}
      onRequestClose={isHome ? closeModal : undefined}
      shouldCloseOnOverlayClick={isHome}
      ariaHideApp={false}
      className={{
        base: `relative bg-siteDimBlack rounded-2xl border border-siteViolet/40 px-8 ${isHome ? 'pt-16' : 'pt-10'} pb-10 w-[90%] max-w-[480px] flex flex-col items-center text-center outline-none`,
        afterOpen: '',
        beforeClose: '',
      }}
      overlayClassName={{
        base: `fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm`,
        afterOpen: '',
        beforeClose: '',
      }}
    >
      {isHome && (
        <button
          type="button"
          onClick={closeModal}
          aria-label="Close"
          className="absolute top-3 right-3 w-9 h-9 rounded-md bg-siteViolet text-white font-rajdhani font-extrabold text-xl cursor-pointer"
        >
          ✕
        </button>
      )}
      {generateStep(step)}
    </Modal>
  );
};

export default OnboardModal;
