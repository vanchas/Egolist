import React, { useState, useEffect } from "react";
import s from "./desire.module.scss";
import Heart from "../../assets/header/Heart.png";
import Libra from "../../assets/header/libra.png";
import Link from "next/link";
import { authenticationService } from "../../_services";
import Carousel from "./DesireCarousel";
import { addDesireToFavorites } from "../../redux/actions/userActions";
import { connect } from "react-redux";

function DesireCard({ desire, addDesireToFavorites, showSuccess }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const user = authenticationService.currentUserValue;
    if (user.token) setUser(user);
    if (desire.id) setLoading(false);
    setTimeout(() => setLoading(false), 5000);
  }, []);

  const setNewFavDesire = (id) => {
    addDesireToFavorites(id)
    showSuccess('Желание добавлено в избранные')
  }

  return (
    <>
      {desire.header ? (
        <div className={s.card}>
          <div className={s.main_image}>
            {desire.photo || desire.video ? (
              <Carousel
                desireId={desire.id}
                photo={JSON.parse(desire.photo)}
                video={desire.video}
              />
            ) : null}
          </div>
          <div className={s.card_info}>
            <div>
              <div>{desire.price} ГРН</div>
              <h4>{desire.header}</h4>
              <p>{desire.description}</p>
            </div>
            <div>
              <div className={s.card_control}>
                <span className="btn">
                  <img src={Libra} alt="" />
                </span>
                <span className="btn">
                  <img
                    src={Heart}
                    alt=""
                    onClick={() => setNewFavDesire(desire.id)}
                  />
                </span>
              </div>
              <div className={s.created_at}>
                {desire.created_at &&
                  desire.created_at
                    .split("T")[0]
                    .split("-")
                    .reverse()
                    .join(" . ")}
              </div>
              <div className={s.views}>Views {desire.views}</div>
              <div className={s.categories}>
                {desire.category && desire.category.length
                  ? desire.category.map((c, i) => <span key={i}>{c.name}</span>)
                  : null}
              </div>
              {user && user.token && user.user.id !== desire.user_id ? (
                <Link
                  href={{
                    pathname: "/addOffer",
                    query: { desire_id: desire.id },
                  }}>
                  <a className={s.add_offer_btn}>
                    Добавить предложение
                  </a>
                </Link>
              ) : null}
            </div>
          </div>
        </div>
      ) : (
        <div className={`text-center py-5`}>
          {loading ? (
            <div className="spinner-border text-primary" role="status">
              <span className="sr-only">Loading...</span>
            </div>
          ) : (
            <div className="h5 text-center py-5">Нет информации по желанию...</div>
          )}
        </div>
      )}
    </>
  );
}

const mapStateToProps = (state) => ({
});

const mapDispatchToProps = {
  addDesireToFavorites,
};

export default connect(mapStateToProps, mapDispatchToProps)(DesireCard);
