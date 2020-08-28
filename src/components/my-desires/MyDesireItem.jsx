import React, { useState, useEffect } from "react";
import s from "./my-desire.module.scss";
import StatArrow from "../../assets/lot/stat-arrow.png";
import OffersForMe from "./OffersForMe";
import Link from "next/link";
import Placeholder from "../../assets/lot/placeholder-vertical.jpg";
import UserPlaceholder from "../../assets/sidebar/user.jpeg";
import formatNumber from "../../utils/format-price-string";
import SlickSlider from "../helpers/SlickSlider";
import SpinnerGrow from "../helpers/SpinnerGrow";
import Rating from "../helpers/Rating";

export default function MyDesireItem({
  hideShowDesire,
  desire,
  locations,
  sortingValues,
  deleteDesire,
}) {
  const [showCurrentOffers, setShowCurrOffers] = useState(false);
  const [deleteLoader, setDeleteLoader] = useState(false);
  const [hideLoader, setHideLoader] = useState(false);
  const [region, setRegion] = useState("");

  useEffect(() => {
    locations.map((loc) => {
      if (loc.id === desire.region_id) {
        setRegion(loc.name_ru);
      }
    });
  }, [locations]);

  const hideShowHandler = (id) => {
    setHideLoader(true)
    hideShowDesire(id)
    setTimeout(() => setHideLoader(false), 3000)
  }

  const deleteHandler = (id) => {
    setDeleteLoader(true)
    deleteDesire(id)
    setTimeout(() => setDeleteLoader(false), 3000)
  }

  return (
    <div className={s.card}>
      <div
        className={`${s.card_image} ${!desire.is_active ? s.disableColor : ""}`}
      >
        {desire.photo ? (
          <SlickSlider height={'25em'} photo={JSON.parse(desire.photo)} />
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
          <span
            className={`${!desire.is_active ? s.disableColor : ""} ${s.elips}`}
          >
            {desire.user.avatar ? (
              <img src={desire.user.avatar} alt={``} />
            ) : (
              <img src={UserPlaceholder} alt={``} />
            )}
          </span>
          <span className={s.user_name}>
            {desire.user.name}
            <Rating rating={desire.user.rating} />
          </span>
          <div className={s.location}>
            <i className="fas fa-map-marker-alt" />
            <span>{region}</span>
          </div>
        </div>
      </div>

      <div className={s.card_control_block}>
        <p className={!desire.is_active ? "text-dark" : ""}>ХОЧУ КУПИТЬ</p>
        <div className={s.price}>
          <span style={{ fontSize: "28px" }}>
            {formatNumber(parseInt(desire.price))}
          </span>{" "}
          ГРН
        </div>
        <div className={s.edit}>
          <Link href={{ pathname: "/update-desire", query: { id: desire.id } }}>
            <a>Изменить</a>
          </Link>
        </div>
        <div
          className={`${s.post} ${!desire.is_active ? s.greenBtn : ""}`}
          onClick={() => hideShowHandler(desire.id)}
        >
          {hideLoader ? (
            <SpinnerGrow color={`secondary`} />
          ) : desire.is_active ? (
            "Скрыть"
          ) : (
            "Опубликовать"
          )}
        </div>
        <div
          className={s.delete}
          onClick={() => deleteHandler(desire.id)}
        >
          {deleteLoader ? <SpinnerGrow color={`secondary`} /> : "Удалить"}
        </div>
      </div>

      <div className={s.card_footer}>
        {desire.is_active ? (
          <div
            className={`${!desire.is_active ? s.disableColor : ""} ${
              s.card_footer_content
            }`}
          >
            <div className={s.views}>
              <i className="far fa-eye" /> &nbsp; {desire.views}
            </div>
            <div className={s.statistics}>
              <img src={StatArrow} alt={``} /> &nbsp; Статистика
            </div>
            <div className={s.lots}>СТАВОК: {desire.count_offers}</div>
            <div
              className={s.offers}
              onClick={() => setShowCurrOffers(!showCurrentOffers)}
            >
              ПОКАЗАТЬ ПРЕДЛОЖЕНИЯ &nbsp; <span>&#x276D;</span>
            </div>
          </div>
        ) : (
          <div className={s.not_published}>НЕ ОПУБЛИКОВАНО</div>
        )}
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
