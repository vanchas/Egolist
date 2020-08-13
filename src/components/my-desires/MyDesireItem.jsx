import React, { useState, useEffect } from "react";
import s from "./my-desire.module.scss";
import StatArrow from "../../assets/lot/stat-arrow.png";
import OffersForMe from "./OffersForMe";
import Link from "next/link";
import Carousel from "../helpers/Carousel";
import Placeholder from "../../assets/lot/placeholder-vertical.jpg";
import UserPlaceholder from "../../assets/sidebar/user.jpeg";
import formatNumber from "../../utils/format-price-string";

export default function MyDesireItem({
  hideShowDesire,
  desire,
  locations,
  sortingValues,
  deleteDesire,
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
      className={s.card}>
      <div className={`${s.card_image} ${!desire.is_active ? s.disableColor : ''}`}>
        {desire.photo ? (
          // <Carousel
          //   desireId={desire.id}
          //   photo={JSON.parse(desire.photo)}
          //   video={desire.video}
          // />
          <img src={JSON.parse(desire.photo)[0]} alt={``} />
        ) : (
          <Link href={{ pathname: `/desire`, query: { id: desire.id } }}>
            <a className={`w-100 h-100`}>
              <img src={Placeholder} alt={``} className={s.placeholder} />
            </a>
          </Link>
        )}
      </div>

      <div className={s.card_info_block}>
        <h5>
          <Link href={{ pathname: "/desire", query: { id: desire.id } }}>
            <a>{desire.header}</a>
          </Link>
        </h5>
        <p>{desire.description}</p>
        <div className={s.user_block}>
          <span className={`${!desire.is_active ? s.disableColor : ''} ${s.elips}`}>
            {desire.user.avatar ?
              <img src={desire.user.avatar} alt={``} />
            : <img src={UserPlaceholder} alt={``} />}
          </span>
          <span className={s.user_name}>{desire.user.name}</span>
          <div className={s.location}>
            <i className="fas fa-map-marker-alt" />
            <span>{region}</span>
          </div>
        </div>
      </div>

      <div className={s.card_control_block}>
        <p className={!desire.is_active ? 'text-dark' : ''}>ХОЧУ КУПИТЬ</p>
        <div className={s.price}>
          <span style={{ fontSize: "30px" }}>
            {formatNumber(parseInt(desire.price))}
          </span> ГРН
        </div>
        <div className={s.edit}>
          <Link href={{ pathname: "/update-desire", query: { id: desire.id } }}>
            <a>Изменить</a>
          </Link>
        </div>
        <div
          className={`${s.post} ${!desire.is_active ? s.greenBtn : ''}`}
          onClick={(e) => {
            e.preventDefault();
            hideShowDesire(desire.id);
          }}
        >
          {desire.is_active ? "Скрыть" : "Опубликовать"}
        </div>
        <div
          className={s.delete}
          onClick={(e) => {
            e.preventDefault();
            deleteDesire(desire.id);
          }}
        >
          Удалить
        </div>
      </div>

      <div className={s.card_footer}>
        {desire.is_active ?
          <div className={`${!desire.is_active ? s.disableColor : ""} ${s.card_footer_content}`}>
          <div className={s.views}><i className="far fa-eye"/> &nbsp; {desire.views}</div>
          <div className={s.statistics}><img src={StatArrow} alt={``}/> &nbsp; Статистика</div>
          <div className={s.lots}>СТАВОК: {desire.count_offers}</div>
          <div className={s.offers}
               onClick={() => setShowCurrOffers(!showCurrentOffers)}>
            ПОКАЗАТЬ ПРЕДЛОЖЕНИЯ &nbsp; <span>&#x276D;</span>
          </div>
        </div>
          : <div className={s.not_published}>НЕ ОПУБЛИКОВАНО</div>}
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
