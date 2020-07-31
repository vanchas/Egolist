import React, { useState } from "react";
import s from "./interesting-lots.module.scss";
import Burger from "../../assets/header/burger.png";
import Heart from "../../assets/header/Heart.png";
import Libra from "../../assets/header/libra.png";
import { connect } from "react-redux";
import { addDesireToFavorites } from "../../redux/actions/userActions";
import { showAlert } from "../../redux/actions/appActions";
import ReportModal from "../helpers/ReportModal";
import Link from "next/link";
import { authenticationService } from "../../_services/authentication.service";

function InterestingLot({
  desire,
  addDesireToFavorites,
  setSelectedDesires,
  selectedDesires,
}) {
  const [showToast, setShowToast] = useState(false);
  const [btnSign, setBtnSign] = useState(
    <span className={`text-white`}>&#x2b;</span>
  );
  const [selectedLot, setSelectedLot] = useState(false);

  const toastHandler = (e) => {
    e.preventDefault();
    setShowToast(!showToast);
  };

  const removeSelectDesires = (id) => {
    const filteredSelectDesires = selectedDesires.filter((des) => des !== id);
    setSelectedDesires(filteredSelectDesires);
  };

  return (
    <div className={s.card}>
      <div className={s.card_header}>
        <div className={s.card_header_control}>
          <div>
            {/*<span>*/}
            {/*  <Link href={`/comparison`}>*/}
            {/*        <a>*/}
            {/*          <img src={Libra} alt="" />*/}
            {/*        </a>*/}
            {/*      </Link>*/}
            {/*</span>*/}
            {authenticationService.currentUserValue ? (
              authenticationService.currentUserValue.user.id !==
              desire.user_id ? (
                <span
                  onClick={(e) => {
                    e.preventDefault();
                    addDesireToFavorites(desire.id);
                  }}
                >
                  <img src={Heart} alt="" />
                </span>
              ) : null
            ) : null}
          </div>
          <span
            onClick={(e) => {
              e.preventDefault();
              toastHandler(e);
            }}
          >
            <img src={Burger} alt="" />
          </span>

          {showToast && (
            <div className={`${s.toast}`}>
              <ReportModal
                userId={desire.user_id}
                setShowToast={setShowToast}
              />
            </div>
          )}
        </div>
        <Link href={`/desire?id=${desire.id}`}>
          <a>
            <span className={s.green_sign}>СТАВОК {desire.count_offers}</span>
            <div className={s.lot_img_holder}>
              {desire.photo && JSON.parse(desire.photo).length ? (
                <img src={JSON.parse(desire.photo)[0]} alt={desire.header} />
              ) : null}
            </div>
          </a>
        </Link>
      </div>
      <div className={s.card_info}>
        <div
          className={s.card_elipse}
          onClick={() => {
            if (selectedLot) {
              setBtnSign(<span className={`text-white`}>&#x2b;</span>);
              setSelectedLot(false);
              removeSelectDesires(desire.id);
            } else {
              if (selectedDesires.length === 10) {
                showAlert('Вы можете отправить свое предложение максимум 10-ти желаниям')
              } else {
                setBtnSign(<span className={`text-danger`}>&#xd7;</span>);
                setSelectedLot(true);
                setSelectedDesires([...selectedDesires, desire.id]);
              }
            }
          }}
        >
          {btnSign}
        </div>
        <Link href={`/desire?id=${desire.id}`}>
          <a className={`text-dark`}>
            <h5 className="h6 font-weight-bold">{desire.header}</h5>
            <span className={s.card_price}>{desire.price} ГРН</span>
          </a>
        </Link>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {
  addDesireToFavorites,
};
export default connect(mapStateToProps, mapDispatchToProps)(InterestingLot);
