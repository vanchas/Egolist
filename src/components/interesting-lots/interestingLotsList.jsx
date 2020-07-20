import React, { useState, useEffect } from "react";
import InterestingLot from "./InterestingLot";
import s from "./interesting-lots.module.scss";
import SignNew from "../../assets/lot/sign-new.png";
import fetch from "isomorphic-unfetch";
import { authenticationService } from "../../_services/authentication.service";
import { connect } from "react-redux";
import { showSuccess, showAlert } from "../../redux/actions/actions";

function InterestingLotsList(props) {
  const [loading, setLoading] = useState(true);
  const [interestingLots, setInterestingLots] = useState([]);
  const [selectedDesires, setSelectedDesires] = useState([]);
  const [showPage, setShowPage] = useState(1);
  const [sentMyOfferLoader, setMyOfferLoader] = useState(false);

  const showLots = async (page) => {
    const user = authenticationService.currentUserValue;
    return await fetch(
      `https://egolist.padilo.pro/api/desires/interesting_for/${props.offerId}?page=${page}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `${user.token_type} ${user.token}`,
        },
      }
    )
      .then((res) => res.json())
      .then((data) => {
        setLoading(false);
        setInterestingLots(interestingLots.concat(data.data));
      })
      .catch((err) => {
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
    const user = authenticationService.currentUserValue;
    const response = await fetch(
      `https://egolist.padilo.pro/api/desires/offers/send/${props.offerId}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `${user.token_type} ${user.token}`,
        },
        body: JSON.stringify({ desire_ids: selectedDesires }),
      }
    );
    const promise = response.json();
    return promise
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
            <img src={SignNew} alt="" className={s.interesting_img} />
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
                <div className="spinner-border text-primary" role="status">
                  <span className="sr-only">Loading...</span>
                </div>
              ) : (
                "ОТПРАВИТЬ"
              )}
            </span>
            <span></span>
            <span></span>
            <span onClick={() => showLots(showPage + 1)}>ПОКАЗАТЬ ЕЩЕ</span>
          </div>
        </>
      ) : (
        <>
          {loading && (
            <div className="text-center py-4">
              <div className="spinner-border text-primary" role="status">
                <span className="sr-only">Loading...</span>
              </div>
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

const mapStateToProps = (state) => ({

});
const mapDispatchToProps = {
  showSuccess,
  showAlert,
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(InterestingLotsList);
