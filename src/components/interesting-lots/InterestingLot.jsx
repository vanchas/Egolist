import React, { useState } from "react";
import s from "./interesting-lots.module.scss";
import Burger from "../../assets/header/burger.png";
import Heart from "../../assets/header/Heart.png";
import Libra from "../../assets/header/libra.png";
import { connect } from "react-redux";
import { addDesireToFavorites } from "../../redux/actions/userActions";
import ReportModal from "../helpers/ReportModal";

function InterestingLot({ desire, addDesireToFavorites }) {
  const [showToast, setShowToast] = useState(false);

  const toastHandler = (e) => {
    e.preventDefault();
    setShowToast(!showToast);
  };

  return (
    <div className={s.card}>
      <div className={s.card_header}>
        <div className={s.card_header_control}>
          <div>
            <span>
              <img src={Libra} alt="" />
            </span>
            <span onClick={() => addDesireToFavorites(desire.id)}>
              <img src={Heart} alt="" />
            </span>
          </div>
          <span onClick={(e) => toastHandler(e)}>
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
        <span className={s.green_sign}>СТАВОК 26</span>
        <div className={s.lot_img_holder}>
          {desire.photo && desire.photo.length ? (
            <img src={JSON.parse(desire.photo[0])} alt={desire.header} />
          ) : null}
        </div>
      </div>
      <div className={s.card_info}>
        <div className={s.card_elipse}></div>
        <h5 className="h6 font-weight-bold">{desire.header}</h5>
        <span className={s.card_price}>{desire.price} ГРН</span>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {
  addDesireToFavorites,
};
export default connect(mapStateToProps, mapDispatchToProps)(InterestingLot);
