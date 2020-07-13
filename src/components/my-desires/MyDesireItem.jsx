import React, { useState, useEffect } from "react";
import s from "./my-desire.module.scss";
import Location from "../../assets/sidebar/Location.png";
import Stars from "../../assets/sidebar/stars.png";
import OffersForMe from "./OffersForMe";
import Link from "next/link";
import Carousel from "../helpers/Carousel";

export default function MyDesireItem({
  hideShowDesire,
  desire,
  locations,
  cities,
  getCities,
  getOffersByDesireId,
  offers,
  sortOffersByDesireId,
}) {
  const [showCurrentOffers, setShowCurrOffers] = useState(false);
  const [region, setRegion] = useState("");

  useEffect(() => {
    locations.map((loc) => {
      if (loc.id === desire.region_id) {
        setRegion(loc.name_ru);
      }
    });
  }, [locations]);

  return (
    <div
      className={s.card}
      style={
        desire.is_active
          ? {}
          : {
              filter: "grayscale(100%)",
            }
      }
    >
      <div className={s.card_image}>
        {desire.photo || desire.video ? (
          <Carousel
            desireId={desire.id}
            photo={JSON.parse(desire.photo)}
            video={desire.video}
          />
        ) : null}
      </div>

      <div className={s.card_info_block}>
        <h5>
          <Link href={{ pathname: "/desire", query: { id: desire.id } }}>
            <a>{desire.header}</a>
          </Link>
        </h5>
        <p>{desire.description}</p>
        <div className={s.card_info_block_footer}>
          <div>
            <span className={s.elips}></span>
            <span>{desire.user.name}</span>
          </div>
          <div>
            <img src={Location} alt="" className={s.location_img} />
            <span>{region}</span>
          </div>
        </div>
      </div>

      <div className={s.card_control_block}>
        <div className={s.price}>{desire.price} ГРН</div>
        <Link href={{ pathname: "/updateDesire", query: { id: desire.id } }}>
          <a className={`${s.edit} btn`}>Изменить</a>
        </Link>
        <div
          className={`btn ${s.post}`}
          onClick={(e) => {
            e.preventDefault();
            hideShowDesire(desire.id);
          }}
        >
          {desire.is_active ? "Скрыть" : "Показать"}
        </div>
      </div>

      <div className={s.card_footer}>
        <div>СТАВОК 5</div>
        <button
          onClick={() => {
            if (!showCurrentOffers) {
              getOffersByDesireId(desire.id);
            }
            setShowCurrOffers(!showCurrentOffers);
          }}
        >
          ПОКАЗАТЬ ПРЕДЛОЖЕНИЯ
        </button>
      </div>
      {showCurrentOffers && (
        <OffersForMe
          desireId={desire.id}
          offers={offers}
          locations={locations}
          sortOffersByDesireId={sortOffersByDesireId}
        />
      )}
    </div>
  );
}
