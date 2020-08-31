import React, { useState } from "react";
import s from "./interesting-lots.module.scss";
import Burger from "../../assets/header/burger-white.png";
import Heart from "../../assets/header/Heart.png";
import { connect } from "react-redux";
import { addDesireToFavorites } from "../../redux/actions/userActions";
import { showAlert } from "../../redux/actions/appActions";
import ReportModal from "../helpers/ReportModal";
import Link from "next/link";
import { authenticationService } from "../../_services/authentication.service";
import Placeholder from "../../assets/lot/placeholder-vertical.jpg";
import SignNew from "../../assets/lot/sign-new.png";
import moment from "moment";

function InterestingLot({
  desire,
  addDesireToFavorites,
  setSelectedDesires,
  selectedDesires,
  currencies,
}) {
  const [showToast, setShowToast] = useState(false);
  const [selectedLot, setSelectedLot] = useState(false);

  const toastHandler = (e) => {
    e.preventDefault();
    setShowToast(!showToast);
  };

  const removeSelectDesires = (id) => {
    const filteredSelectDesires = selectedDesires.filter((des) => des !== id);
    setSelectedDesires(filteredSelectDesires);
  };

  const imageErrorHandler = (e) => {
    e.target.src = Placeholder;
  };

  const cardEllipsHandler = () => {
    if (selectedLot) {
      setSelectedLot(false);
      removeSelectDesires(desire.id);
    } else {
      if (selectedDesires.length === 10) {
        showAlert(
          "Вы можете отправить свое предложение максимум 10-ти желаниям"
        );
      } else {
        setSelectedLot(true);
        setSelectedDesires([...selectedDesires, desire.id]);
      }
    }
  };

  const isNewChecker = (date) => {
    const date1 = moment(date)._i;
    const date2 = moment();
    const days = Math.abs(moment(date1).diff(moment(date2), "days"));
    if (days < 2) {
      return true;
    }
    return false;
  };

  return (
    <div className={s.card}>
      {isNewChecker(desire.created_at) && (
        <img src={SignNew} alt="" className={s.interesting_img} />
      )}
      <div className={s.card_header}>
        <div className={s.card_header_control}>
          <div>
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
                <img
                  src={JSON.parse(desire.photo)[0]}
                  alt={desire.header}
                  onError={imageErrorHandler}
                  onErrorCapture={imageErrorHandler}
                />
              ) : (
                <img src={Placeholder} alt={``} />
              )}
            </div>
          </a>
        </Link>
      </div>
      <div className={s.card_info}>
        <div className={s.card_elipse} onClick={cardEllipsHandler}>
          {selectedLot ? (
            <span className={`text-danger`}>&#xd7;</span>
          ) : (
            <span className={`text-white`}>&#x2b;</span>
          )}
          {/*{btnSign}*/}
        </div>
        <Link href={`/desire?id=${desire.id}`}>
          <a className={`text-dark`}>
            <h5 className="h6 font-weight-bold">{desire.header}</h5>
            <span className={s.card_price}>
              {desire.price}
              {currencies &&
                currencies.map((cur, i) => {
                  if (cur.id === desire.currency_id) {
                    return cur.name;
                  }
                })}
            </span>
          </a>
        </Link>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => ({
  currencies: state.app.currencies,
});

const mapDispatchToProps = {
  addDesireToFavorites,
};
export default connect(mapStateToProps, mapDispatchToProps)(InterestingLot);
