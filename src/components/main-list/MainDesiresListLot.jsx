import React, { useState, useEffect } from "react";
import Link from "next/link";
import s from "./desires-list.module.scss";
import { authenticationService } from "../../_services/authentication.service";
import Router from "next/router";
import Carousel from "../helpers/Carousel";
import ReportModal from "../helpers/ReportModal";
import Placeholder from "../../assets/lot/placeholder-vertical.jpg";
import formatNumber from "../../utils/format-price-string";

export default function MainDesiresListLot({ desire, addDesireToFavorites }) {
  const [showToast, setShowToast] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  const toastHandler = (e) => {
    e.preventDefault();
    setShowToast(!showToast);
  };

  useEffect(() => {
    const userData = authenticationService.currentUserValue;
    if (userData.token) setUser(userData);
  }, []);

  const likeClickHandler = (id) => {
    if (!user.token) {
      Router.push("login");
    } else {
      setLoading(true);
      addDesireToFavorites(id);
      setTimeout(() => setLoading(false), 3000);
    }
  };

  return (
    <div className={`shadow ${s.card}`}>
      <div className={s.card_header}>
        <div className={s.card_header_control}>
          {user && (
            <>
              {loading ? (
                <div className={`pl-3 pr-2 py-1`}>
                  <div className="spinner-grow text-light" role="status">
                    <span className="sr-only">Loading...</span>
                  </div>
                </div>
              ) : (
                <>
                  {user && user.user.id !== desire.user_id ? (
                    <span onClick={() => likeClickHandler(desire.id)}>
                      {/*<i className="far fa-heart" />*/}
                      <i className="fas fa-heart" />
                    </span>
                  ) : (
                    <span />
                  )}
                </>
              )}
              <span onClick={(e) => toastHandler(e)}>
                <span className={`${s.menu} ${showToast ? s.activeToast : ''}`}>
                  <i />
                  <i />
                  <i />
                </span>
              </span>

              {showToast && (
                <div className={`${s.toast}`}>
                  {user && user.user && user.user.id === desire.user_id ? (
                    <Link
                      href={{
                        pathname: "/update-desire",
                        query: { id: desire.id },
                      }}
                    >
                      <a className={`btn`}>
                        <span>Изменить</span>
                      </a>
                    </Link>
                  ) : null}
                  <ReportModal
                    userId={desire.user_id}
                    setShowToast={setShowToast}
                  />
                </div>
              )}
            </>
          )}
        </div>
        <div className={s.lot_img_holder}>
          {desire.photo || desire.video ? (
            // <Carousel
            //   desireId={desire.id}
            //   photo={JSON.parse(desire.photo)}
            //   video={desire.video}
            // />
            <img src={JSON.parse(desire.photo)[0]} alt={``} />
          ) : (
            <Link href={{ pathname: `/desire`, query: { id: desire.id } }}>
              <a className={`w-100 h-100`}>
                <img src={Placeholder} alt={``} className={`w-100`} />
              </a>
            </Link>
          )}
        </div>
      </div>
      <div className={s.card_info}>
        <div className={s.card_elipse}>
          {desire.user && desire.user.avatar ? (
            <img className={`h-100`} src={desire.user.avatar} alt={``} />
          ) : null}
        </div>
        <h5>
          <Link href={{ pathname: "/desire", query: { id: desire.id } }}>
            <a>{desire.header}</a>
          </Link>
        </h5>
        <span className={s.card_price}>
          <span>{formatNumber(parseInt(desire.price))}</span> ГРН
        </span>
      </div>
    </div>
  );
}
