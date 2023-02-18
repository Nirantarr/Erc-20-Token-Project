import React,{useState,useEffect,useContext} from 'react'
import web3modal from 'web3modal';
import ethers from 'ethers';
// Internal import
import { niruTokenAddress, niruTokenABI } from './constants';


export const Erc20IcoContext = React.createContext();
export const Erc20Provider=({children})=>{
    const name="My Name is Nirantar";
 return(
  <Erc20IcoContext.Provider value={{name}}>
     {children}
     </Erc20IcoContext.Provider>
 );
};