import React from 'react'
import s from './interesting-lots.module.scss'
import Burger from '../../assets/header/burger.png'
import Heart from '../../assets/header/Heart.png'
import Libra from '../../assets/header/libra.png'

export default function InterestingLot({ desire }) {
  return (
    <div className={s.card}>
      <div className={s.card_header}>
        <div className={s.card_header_control}>
          <div>
            <span>
              <img src={Libra} alt="" />
            </span>
            <span>
              <img src={Heart} alt="" />
            </span>
          </div>
          <span>
            <img src={Burger} alt="" />
          </span>
        </div>
        <span className={s.green_sign}>СТАВОК 26</span>
        <div className={s.lot_img_holder}>
          {/* <img src={Lot} alt="lot" /> */}
        </div>
      </div>
      <div className={s.card_info}>
        <div className={s.card_elipse}></div>
        <h5 className="h6 font-weight-bold">{desire.header}</h5>
        <span className={s.card_price}>{desire.price} ГРН</span>
      </div>
    </div>
  )
}
