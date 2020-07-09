import React, { useState } from 'react'
import s from './offers.module.scss'
import Location from '../../assets/sidebar/Location.png'
import Stars from '../../assets/sidebar/stars.png'
import Burger from '../../assets/header/burger.png'
import Heart from '../../assets/header/Heart.png'
import Libra from '../../assets/header/libra.png'
import ArrowDown from '../../assets/lot/arrow-btn.png'
import InterestingLotsList from '../interesting-lots/interestingLotsList'
import Link from 'next/link'
import Rating from '../helpers/Rating'
import Carousel from "../helpers/Carousel";

export default function OfferCard({ offer, getInterestingDesiresToOffer, interestingDesires, hideShowOffer }) {
  const [showBottomBlock, setShowBottomBlock] = useState(false);
  const [showToast, setShowToast] = useState(false);

  const toastHandler = (e) => {
    e.preventDefault();
    setShowToast(!showToast);
  };

  return (
    <div className={s.card} style={offer.is_active ? {} : {
      filter: 'grayscale(100%)'
    }}>
      <div className={s.card_image}>
        <span>{offer.place}</span>
        {offer.photo || offer.video ? (
            <Carousel
                desireId={offer.desire_id}
                photo={JSON.parse(offer.photo)}
                video={offer.video}
            />
        ) : null}
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
            <span>Location</span>
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
              <span onClick={() => hideShowOffer(offer.id)}>{offer.is_active ? 'Скрыть' : 'Показать'}</span>
              <span><Link href={{ pathname: "/updateOffer", query: { id: offer.id, desire_id: offer.desire_id } }}><a className="text-dark">
                Изменить
                </a></Link></span>
            </div>
          )}
        </div>
        <div className={s.price}>{offer.price} ГРН</div>
        <Link href={{ pathname: "/desire", query: { id: offer.desire_id } }} as={`/desire/${offer.desire_id}`}><a className={`btn ${s.open}`}>Открыть</a></Link>
      </div>

      <div className={s.card_footer}>
        <span>Кому может быть интересно</span>
        <img src={ArrowDown} alt="" style={showBottomBlock ? { transform: 'rotate(180deg) translateY(25%)' } : null} onClick={() => {
          if (!showBottomBlock) {
            getInterestingDesiresToOffer(offer.id);
          }
          setShowBottomBlock(!showBottomBlock);
        }} />
      </div>

      {showBottomBlock
        ? <InterestingLotsList
          interestingDesires={interestingDesires}
        /> : null}
    </div >
  )
}
