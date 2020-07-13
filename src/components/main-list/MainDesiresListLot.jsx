import React, { useState, useEffect } from "react";
import Link from "next/link";
import s from "./desires-list.module.scss";
import Burger from "../../assets/header/burger.png";
import Heart from "../../assets/header/Heart.png";
import Libra from "../../assets/header/libra.png";
import { authenticationService } from "../../_services/authentication.service";
import Router from "next/router";
import Carousel from "../helpers/Carousel";
import ReportModal from "../helpers/ReportModal";

export default function MainDesiresListLot({
  desire,
  addDesireToFavorites,
}) {
  const [showToast, setShowToast] = useState(false);
  const [user, setUser] = useState(null);

  const toastHandler = (e) => {
    e.preventDefault();
    setShowToast(!showToast);
  };

  useEffect(() => {
    const user = authenticationService.currentUserValue;
    if (user.token) setUser(user);
  }, []);

  return (
    <div className={s.card}>
      <div className={s.card_header}>
        <div className={s.card_header_control}>
          {user && (
            <>
              <div>
                <span>
                  <img src={Libra} alt="" />
                </span>
                <span
                  onClick={() => {
                    !user.token
                      ? Router.push("/login")
                      : addDesireToFavorites(desire.id);
                  }}
                >
                  <img
                    src={Heart}
                    alt=""
                    style={
                      user.user.id === desire.user_id
                        ? { visibility: "hidden" }
                        : {}
                    }
                  />
                </span>
              </div>
              <span onClick={(e) => toastHandler(e)}>
                <img src={Burger} alt="" />
              </span>

              {showToast && (
                <div className={`${s.toast}`}>
                  <ReportModal userId={desire.user_id} setShowToast={setShowToast} />
                </div>
              )}
            </>
          )}
        </div>
        <div className={s.lot_img_holder}>
          {desire.photo || desire.video ? (
            <Carousel
              desireId={desire.id}
              photo={JSON.parse(desire.photo)}
              video={desire.video}
            />
          ) : null}
        </div>
      </div>
      <div className={s.card_info}>
        <div className={s.card_elipse}></div>
        <h5 className="h6 font-weight-bold">
          <Link href={{ pathname: "/desire", query: { id: desire.id } }}>
            <a className="text-dark">{desire.header}</a>
          </Link>
        </h5>
        <span className={s.card_price}>{desire.price} ГРН</span>
      </div>
    </div>
  );
}
