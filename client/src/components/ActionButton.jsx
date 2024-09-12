import React from 'react';
import ReactTooltip from 'react-tooltip';
import styles from '../styles';

const ActionButton = ({ imgUrl, handleClick, restStyles }) => (
  <>
    <div
      className={`${styles.gameMoveBox} ${styles.flexCenter} ${styles.glassEffect} ${restStyles}`}
      onClick={handleClick}
      data-tip={imgUrl.includes('attack') ? 'Attack' : 'Defense'} // Tooltip text
    >
      <img src={imgUrl} alt='action_img' className={styles.gameMoveIcon} />
    </div>
    <ReactTooltip effect='solid' backgroundColor='#7f46f0' />
  </>
);

export default ActionButton;
