import React from 'react';
import Image from 'next/image';
import Token_Icon from '../../Images/Token_Icon.jpg';
import Style from './User.module.css';

const User = ({ holderArray }) => {
  return (
    <div className={Style.user}>
      {holderArray.map((el, i) => (
        <div className={Style.user_box} key={i + 1}>
          <h4 className={Style.user_box_name}>
            User#{el[0].toNumber()}
          </h4>
          <p className={Style.user_box_status_note} >*Fixed Price 1 NIRU =100inr</p>
          <div className={Style.user_box_price_box}>
            <p className={Style.user_box_price}>{el[3].toNumber()}</p>
            <p className={Style.user_box_status}>
              Rs.{el[3].toNumber() * 100} Your Tokens worth in INR
            </p>
          </div>
          <div className={Style.user_box_img}>
            <Image className={Style.user_box_img_img} src={Token_Icon} alt="Token_Icon" height={35} width={35} />
            <p>To :{""}{el[2].slice(0, 20)}...</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default User
