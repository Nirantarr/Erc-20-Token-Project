import React, { useState, useEffect, useContext } from "react";
import Web3Modal from "web3modal";
import { ethers } from "ethers";

//INTERNAL IMPORT
import {
  niruTokenAddress, niruTokenABI,
} from "./constants";

const fetchNiruTokenContract = (signerOrProvider) =>
  new ethers.Contract(niruTokenAddress, niruTokenABI, signerOrProvider);

export const Erc20Context = React.createContext();

export const Erc20Provider = ({ children }) => {
  //----USER ACCOUNT
  const [holderArray, setHolderArray] = useState([]);
  const [account, setaccount] = useState("");
  const [accountBalance, setaccountBalance] = useState("");
  const [userId, setuserId] = useState("");
  //-------TOKEN INFO
  const [noOfToken, setnoOfToken] = useState("");
  const [tokenName, settokenName] = useState("");
  const [tokenStandard, settokenStandard] = useState("");
  const [tokenSymbol, settokenSymbol] = useState("");
  const [tokenOwner, settokenOwner] = useState("");
  const [tokenOwnerBalance, settokenOwnerBalance] = useState("");

  //---------CONECTING WALLET TO THE APPLICATION
  const CheckIfWalletConnected = async () => {
    try {
      if (!window.ethereum) return console.log("Install MetaMask");

      const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
      setaccount(accounts[0]);
      window.ethereum.on("chainChanged", () => {
        window.location.reload();
      });
      window.ethereum.on("accountsChanged", () => {
        window.location.reload();
      });

      //  CREATING CONNECTION WITH SMART CONTRACT
      const web3Modal = new Web3Modal();
      const connection = await web3Modal.connect();
      const provider = new ethers.providers.Web3Provider(connection);
      const signer = provider.getSigner();
      const contract = fetchNiruTokenContract(signer);
      // GETIING ALL TOKEN HOLDER DATA
      const allTokenHolder = await contract.BalanceOf(accounts[0]);
      setaccountBalance(allTokenHolder.toNumber());

      const totalHolder = await contract._userId();
      setuserId(totalHolder.toNumber());
    } catch (error) {
      console.log("Error in connecting Metamask")
    };
  };


  //-------CONNECTING WITH TOKEN CONTRACT
  const Erc20NiruToken = async () => {
    try {
      //  CREATING CONNECTION WITH SMART CONTRACT
      const web3Modal = new Web3Modal();
      const connection = await web3Modal.connect();
      const provider = new ethers.providers.Web3Provider(connection);
      const signer = provider.getSigner(
        "0xF01DC93dd24634C339997acEC5f3F6e7A0bFe768"
      );
      const contract = fetchNiruTokenContract(signer);
      window.ethereum.on("chainChanged", () => {
        window.location.reload();
      });
      window.ethereum.on("accountsChanged", () => {
        window.location.reload();
      });
      //TOKEN SUPPLY
      const supply = await contract.totalSupply();
      const totalSupply = supply.toNumber();
      setnoOfToken(totalSupply);
      //TOKEN NAME
      const name = await contract.name();
      settokenName(name);
      //TOKEN SYMBOL
      const symbol = await contract.symbol();
      settokenSymbol(symbol);
      //TOKEN SYMBOL
      const standard = await contract.standard();
      settokenStandard(standard);
      //TOKEN OWNEROFCONTRACT
      const ownerOfContract = await contract.ownerOfContract();
      settokenOwner(ownerOfContract);
      //OWNER TOKEN BALANCE
      const balanceToken = await contract.BalanceOf(
        "0xF01DC93dd24634C339997acEC5f3F6e7A0bFe768"
      );
      settokenOwnerBalance(balanceToken.toNumber());
    } catch (error) {
      console.log("Something wrong in the Token Function");
    };
  };

  const TransferToken = async (address, value) => {
    try {
      //  CREATING CONNECTION WITH SMART CONTRACT
      const web3Modal = new Web3Modal();
      const connection = await web3Modal.connect();
      const provider = new ethers.providers.Web3Provider(connection);
      const signer = provider.getSigner();
      const contract = fetchNiruTokenContract(signer);
      //  Here we multiplied value by 1 becoz we get the value in string to convert in int we multiplied it.
      const transfer = await contract.transfer(address, BigInt(value * 1));

      transfer.wait();
      window.location.reload();
      window.ethereum.on("chainChanged", () => {
        window.location.reload();
      });
      window.ethereum.on("accountsChanged", () => {
        window.location.reload();
      });
    } catch (error) {
      console.log("something wrong while transfering token");
    };
  };

  const TokenHolderData = async () => {
    try {
      //  CREATING CONNECTION WITH SMART CONTRACT
      const web3Modal = new Web3Modal();
      const connection = await web3Modal.connect();
      const provider = new ethers.providers.Web3Provider(connection);
      const signer = provider.getSigner();
      const contract = fetchNiruTokenContract(signer);
      window.ethereum.on("chainChanged", () => {
        window.location.reload();
      });
      window.ethereum.on("accountsChanged", () => {
        window.location.reload();
      });
      const allTokenHolder = await contract.getTokenHolder();

      allTokenHolder.map(async (el) => {
        const singleHolderData = await contract.getTokenHolderData(el);
        holderArray.push(singleHolderData);
        console.log(holderArray);
      });
    } catch (error) {
      console.log("Something went wrong in getting in TokenHolderData");
    };
  };

  return (
    <Erc20Context.Provider
      value={{
        CheckIfWalletConnected, Erc20NiruToken, TransferToken, TokenHolderData, account, accountBalance, userId, noOfToken, tokenName, tokenSymbol, tokenOwner, tokenOwnerBalance, tokenStandard, holderArray
      }}
    >
      {children}
    </Erc20Context.Provider>
  );
};
