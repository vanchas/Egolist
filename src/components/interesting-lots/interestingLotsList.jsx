import React, { useState, useEffect } from "react";
import InterestingLot from "./InterestingLot";
import s from "./interesting-lots.module.scss";
import SignNew from "../../assets/lot/sign-new.png";
import { connect } from "react-redux";
import { showSuccess, showAlert } from "../../redux/actions/appActions";
import HttpRequest from "../../_helpers/HttpRequest";
import Spinner from "../helpers/Spinner";

function InterestingLotsList(props) {
  const [loading, setLoading] = useState(true);
  const [interestingLots, setInterestingLots] = useState([]);
  const [selectedDesires, setSelectedDesires] = useState([]);
  const [showPage, setShowPage] = useState(1);
  const [sentMyOfferLoader, setMyOfferLoader] = useState(false);
  const [showMoreLoader, setShowMoreLoader] = useState(false);

  const showLots = async (page) => {
    setShowMoreLoader(true);
    HttpRequest.execute(`/desires/interesting_for/${props.offerId}?page=${page}`)
      .then((data) => {
          setShowMoreLoader(false);
          setLoading(false);
          setInterestingLots(interestingLots.concat(data.data));
      }).catch((err) => {
        setLoading(false);
        console.error(err);
      });
  };

  useEffect(() => {
    showLots(showPage);
    setTimeout(() => setLoading(false), 10000);
  }, []);

  const sentMyOfferToInterestingDesires = async () => {
    setMyOfferLoader(true);
    await HttpRequest.execute(
        `/desires/offers/send/${props.offerId}`,
        "POST", "application/json",
        { desire_ids: selectedDesires })
      .then((data) => {
        setMyOfferLoader(false);
        if (response.status === 200) {
          props.showSuccess(data.message);
        } else {
          props.showAlert(data.message);
        }
      })
      .catch((err) => console.error(err));
  };

  return (
    <div className={`interesting-lots-list ${s.interesting_lots_list}`}>
      {interestingLots && interestingLots.length ? (
        <>
          <ul>
            {interestingLots.map((desire, i) => (
              <li
                key={i}
                className={selectedDesires.map((item) => {
                  if (item.id === desire.id) return s.selectedItem;
                })}
              >
                <InterestingLot
                  selectedDesires={selectedDesires}
                  setSelectedDesires={setSelectedDesires}
                  desire={desire}
                />
              </li>
            ))}
          </ul>
          <div className={s.interesting_lots_list_control}>
            <span onClick={() => sentMyOfferToInterestingDesires()}>
              {sentMyOfferLoader ? (
                <Spinner color={`secondary`} />
              ) : (
                "ОТПРАВИТЬ"
              )}
            </span>
            <span/>
            <span/>
            {showMoreLoader ? (
              <Spinner color={`secondary`} />
            ) : (
              <span onClick={() => showLots(showPage + 1)}>ПОКАЗАТЬ ЕЩЕ</span>
            )}
          </div>
        </>
      ) : (
        <>
          {loading && (
            <div className="text-center py-4">
              <Spinner color={`secondary`} />
            </div>
          )}
          {!loading && (
            <div className="text-center h5 py-5">
              Нет интересных желаний к этому предложению...
            </div>
          )}
        </>
      )}
    </div>
  );
}

const mapStateToProps = (state) => ({});
const mapDispatchToProps = {
  showSuccess,
  showAlert,
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(InterestingLotsList);
