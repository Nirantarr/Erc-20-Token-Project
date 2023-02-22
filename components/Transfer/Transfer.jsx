import React, { useState } from 'react';
import Style from './Transfer.module.css';

const Transfer = ({ TransferToken, noOfToken, tokenName, tokenSymbol, tokenStandard, tokenOwnerBalance }) => {
    const [transferAccount, settransferAccount] = useState('');
    const [tokenNumber, settokenNumber] = useState(0);
    return (
        <div className={Style.transfer}>
            <div className={Style.transfer_box}>
                <div className={Style.transfer_box_left}>
                    <h1>Token Analytics</h1>
                    <div className={Style.transfer_box_left_box}>
                        <p>Token Name    : <span>{tokenName}</span></p>
                        <p>Total Supply  : <span>{noOfToken}</span></p>
                        <p>Token Symbol  : <span>  {tokenSymbol}</span> </p>
                        <p>Token left  :<span>{tokenOwnerBalance}</span></p>
                    </div>
                </div>
                <div className={Style.transfer_box_right}>
                    <h1>Transfer Tokens</h1>
                    <input placeholder='Enter Address' type="text" onChange={(e) => settransferAccount(e.target.value)} />
                    <input placeholder='Enter Tokens' type="number" onChange={(e) => settokenNumber(e.target.value)} />
                    <div className={Style.transfer_box_right_btn}>
                        <button onClick={() => TransferToken(transferAccount, tokenNumber)}>Send Tokens</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Transfer
