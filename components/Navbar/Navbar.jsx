import React, { useContext, useState } from 'react';
import Style from './Navbar.module.css';
import { Erc20Context } from 'context/NiruTokenIco';

const Navbar = () => {
    const { account, accountBalance, userId } = useContext(Erc20Context)
    return (
        <div className={Style.navbar}>
            <div className={Style.navbar_box}>
                <div className={Style.navbar_box_left}>
                    <h1>Niru Token</h1>
                </div>
                <div className={Style.navbar_box_right}>
                    <p>Account Balance: {""} {""} <span>{accountBalance}</span> </p>
                    <p><span>User Id #{userId}{""} {""} {account} </span> </p>
                </div>
            </div>
        </div>
    )
}

export default Navbar
