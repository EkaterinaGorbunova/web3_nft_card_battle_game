import React from 'react';
import { useNavigate } from 'react-router-dom';

import Alert from './Alert';
import { useGlobalContext } from '../context';
import { logo, heroImg } from '../assets';
import styles from '../styles';

const PageHOC = (Component, title, description) => () => {
  const { showAlert } = useGlobalContext();
  const navigate = useNavigate();

  return (
    <div className={styles.hocContainer}>
      {showAlert?.status && (
        <Alert type={showAlert.type} message={showAlert.message} />
      )}

      <div className={styles.hocContentBox}>
        <div
          className='flex font-rajdhani font-bold sm:text-4xl text-2xl text-white items-center cursor-pointer'
          onClick={() => navigate('/')}
        >
          <img
            src={logo}
            alt='Company logo'
            className={`${styles.hocLogo} w-[56px] h-[56px]`}
            width='56'
            height='56'
          />
          <span className=' text-siteViolet'>Battle</span>Titans
        </div>

        <div className={styles.hocBodyWrapper}>
          <div className='flex flex-row w-full'>
            <h1 className={`flex ${styles.headText} head-text`}>{title}</h1>
          </div>

          <p className={`${styles.normalText} my-10`}>{description}</p>

          <Component />
        </div>

        <p className={styles.footerText}>Made with 💜 by Kate</p>
      </div>

      <div className='flex flex-1 xl:h-screen xl:sticky xl:top-0 flex-col items-center justify-center gap-6 py-8 bg-gradient-to-br from-siteblack via-[#1a0f33] to-siteblack overflow-hidden'>
        <img
          src={heroImg}
          alt='hero-img'
          className='w-full h-auto max-h-[70vh] xl:max-h-[75vh] object-contain object-center'
          width='1280'
          height='1118'
          loading='eager'
        />
        <div className='hidden xl:flex flex-col items-center text-center px-8 max-w-xl'>
          <p className='font-rajdhani text-siteWhite text-base mb-3 whitespace-nowrap'>
            Built on the Avalanche network · battle stats stored on-chain
          </p>
          <div className='flex flex-row gap-2 flex-wrap justify-center'>
            <span className='px-3 py-1 rounded-full text-xs font-rajdhani font-semibold bg-siteDimBlack/70 border border-siteViolet/40 text-white'>Avalanche Fuji</span>
            <span className='px-3 py-1 rounded-full text-xs font-rajdhani font-semibold bg-siteDimBlack/70 border border-siteViolet/40 text-white'>ERC-1155</span>
            <span className='px-3 py-1 rounded-full text-xs font-rajdhani font-semibold bg-siteDimBlack/70 border border-siteViolet/40 text-white'>EVM compatible</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PageHOC;
