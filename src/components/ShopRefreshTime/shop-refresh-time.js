import React, {useEffect, useState} from 'react'
import  moment from 'moment'
import {useDispatch, useSelector} from "react-redux";
import {getShopRefreshTimes} from "../../slices/accountSlice";
import {useWallet} from "@solana/wallet-adapter-react";


function ShopRefreshTime({reloadShopLimits,limit_type}) {
    const dispatch = useDispatch()
  const { publicKey } = useWallet()
   let [minutesRemaining,setMinutesRemaining]  =  useState(-1)
   const shopRefreshTimes = useSelector((state) => state.accounts.shopRefreshTimes)

  useEffect(()=> {
    if(limit_type === "Monthly"){
      setMinutesRemaining(shopRefreshTimes?.monthly||-1)
    } else if(limit_type === "Weekly"){
      setMinutesRemaining(shopRefreshTimes?.weekly ||-1)
    } else{
      setMinutesRemaining(shopRefreshTimes?.daily ||-1)
    }

    const interval = setInterval(() => {
      setMinutesRemaining((prevCounter) => prevCounter -1 );
    }, 1000*60);

    return () => clearInterval(interval);
  },[limit_type,shopRefreshTimes])

  useEffect(() => {
    if(minutesRemaining===0){
      reloadShopLimits()
      dispatch(getShopRefreshTimes())
    }
  },[minutesRemaining])
  return (
      <>REFRESHED IN: {moment.duration(minutesRemaining||0, 'minutes').days() >0 &&

          moment.duration(minutesRemaining || 0, 'minutes').days() + 'D ' +
          moment.duration(minutesRemaining||0, 'minutes').hours() + 'H ' +
          moment.duration(minutesRemaining||0, 'minutes').minutes() + 'M '
      }
        {   moment.duration(minutesRemaining||0, 'minutes').days() ===0 && moment.duration(minutesRemaining||0, 'minutes').hours()>0 &&
            moment.duration(minutesRemaining||0, 'minutes').hours() + 'H ' +
            moment.duration(minutesRemaining||0, 'minutes').minutes() + 'M '
        }

        {   moment.duration(minutesRemaining||0, 'minutes').days() ===0 && moment.duration(minutesRemaining||0, 'minutes').hours()===0 &&
            moment.duration(minutesRemaining||0, 'minutes').minutes() + 'M '
        }

      </>
  )
}

export default ShopRefreshTime
