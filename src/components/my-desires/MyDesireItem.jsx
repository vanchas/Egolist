import React, { useState, useEffect } from "react";
import s from "./my-desire.module.scss";
import Location from "../../assets/sidebar/Location.png";
import OffersForMe from "./OffersForMe";
import Link from "next/link";
import Carousel from "../helpers/Carousel";

export default function MyDesireItem({
  hideShowDesire,
  desire,
  locations,
    sortingValues,
                                       deleteDesire
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
        ) : <Link href={`/desire?id=${desire.id}`}><a className={`w-100 h-100`}></a></Link>}
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
        <div
            className={`btn ${s.delete}`}
            onClick={(e) => {
              e.preventDefault();
              deleteDesire(desire.id);
            }}
        >Удалить</div>
      </div>

      <div className={s.card_footer}>
        <div>СТАВОК {desire.count_offers}</div>
        <button
          onClick={() => {
            setShowCurrOffers(!showCurrentOffers);
          }}
        >
          ПОКАЗАТЬ ПРЕДЛОЖЕНИЯ
        </button>
      </div>
      {showCurrentOffers && (
        <OffersForMe
            sortingValues={sortingValues}
          desireId={desire.id}
          locations={locations}
        />
      )}
    </div>
  );
}
