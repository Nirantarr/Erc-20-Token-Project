import React, { useState, useEffect, useContext } from 'react';
import Image from 'next/image';
// Internal Import 
import { Erc20Context } from '../../context/NiruTokenIco.js';
import Style from '../styles/index.module.css';
import Token_Icon from "../../Images/Token_Icon.jpg";
import Transfer from "../../components/Transfer/Transfer";
import User from "../../components/User/User";

const Home = () => {
  const {
    CheckIfWalletConnected, Erc20NiruToken, TransferToken, TokenHolderData, noOfToken, tokenName, tokenSymbol, tokenOwnerBalance, tokenStandard, holderArray } = useContext(Erc20Context);

  useEffect(() => {
    CheckIfWalletConnected();
    TokenHolderData();
    Erc20NiruToken();
  }, []);

  return (
    <div className={Style.home}>
      <div className={Style.heroSection}>
        <div className={Style.heroSection_left}>
          <h1>NIRU TOKEN   -A Step Towards Blockchain Technology.</h1>
          <p>Hello People, My Name is Nirantar Mandogade. I am pursuing CS degree. I love the concept of Decentralization so I decided to pursue my career in Blockchain Technology. As Blockchain is nothing but distributed Immutable Ledger in which data gets stored and which cant be changed once set. I have created Erc-20 Token named Niru Token for learning Purpose. </p>

          <div className={Style.heroSection_left_btn}>
            <button className={Style.btn}>White-Paper</button>
            <button className={Style.btn}>Niru Token Info</button>
          </div>
        </div>
        <div className={Style.heroSection_right}>
          <Image src={Token_Icon} className={Style.heroSection_right_img_one} alt="Token_Img" width={300} height={300} />
          <Image src={Token_Icon} className={Style.heroSection_right_img} alt="Token_Img" width={200} height={200} />
        </div>
      </div>
      <Transfer TransferToken={TransferToken} noOfToken={noOfToken} tokenName={tokenName} tokenSymbol={tokenSymbol} tokenStandard={tokenStandard} tokenOwnerBalance={tokenOwnerBalance} />

      <User holderArray={holderArray} />
    </div>
  );
};

export default Home;
