import React, { useState, useEffect } from 'react'
import s from './offers-for-me.module.scss'
import Location from '../../assets/sidebar/Location.png'
import Stars from '../../assets/sidebar/stars.png'
import Burger from '../../assets/header/burger.png'
import Heart from '../../assets/header/Heart.png'
import Libra from '../../assets/header/libra.png'
import Link from 'next/link'
import Rating from '../helpers/Rating'

export default function OfferForMeItem({ offer, locations }) {
  const [region, setRegion] = useState('');
  const [showToast, setShowToast] = useState(false);

  const toastHandler = (e) => {
    e.preventDefault();
    setShowToast(!showToast);
  };

  useEffect(() => {
    if (locations && locations.length) {
      locations.map(loc => {
        if (loc.id === offer.region_id) {
          setRegion(loc.name_ru);
        }
      })
    }
  }, [offer, locations]);

  return (
    <div>
      {offer.user &&
        <div className={s.card}>
          <div className={s.card_image}>
            {/* <img src={} alt=""/> */}
          </div>

          <div className={s.card_info_block}>
            <h5>{offer.header}</h5>
            <p>{offer.description}</p>
            <div className={s.progress_bar}>
              <div className="progress border border-dark rounded">
                <div className="progress-bar bg-secondary rounded" role="progressbar" style={{ width: `${offer.rating}%` }} aria-valuenow={offer.rating} aria-valuemin={0} aria-valuemax={100} />
              </div>
              <span>{offer.rating}%</span>
            </div>
            <div className={s.card_info_block_footer}>
              <div>
                <span className={s.elips}></span>
                <span>{offer.user.name}</span>
              </div>
              <div>
                <img src={Location} alt="" className={s.location_img} />
                <span>{region}</span>
              </div>
              <div>
                <Rating rating={offer.rating} />
                {/* <img src={Stars} alt="" className={s.stars_img} /> */}
              </div>
            </div>
          </div>

          <div className={s.card_control_block}>
            <div className={s.card_control_header}>
              <div>
                <span>
                  <img src={Libra} alt="" />
                </span>
                <span>
                  <img src={Heart} alt="" />
                </span>
              </div>
              <span onClick={(e) => toastHandler(e)}>
                <img src={Burger} alt="" />
              </span>

              {showToast && (
                <div className={`${s.toast}`}>
                  <span>Report</span>
                </div>
              )}
            </div>
            <div className={s.price}>{offer.price} ГРН</div>
            <Link href={{ pathname: "/offer", query: { id: offer.id } }}><a className="text-dark btn">Открыть</a></Link>
          </div>
        </div>
      }
    </div>
  )
}
