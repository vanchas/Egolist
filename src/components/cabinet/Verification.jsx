import React, { useEffect, useState } from "react";
import VerifyExample from "../../assets/old/verification.png";
import {
  getPhotoVerifyExample,
  verifyMyProfile,
} from "../../redux/actions/userActions";
import s from "./verify.module.scss";
import { connect } from "react-redux";
import { authenticationService } from "../../_services/authentication.service";

function CabinetVerification(props) {
  const [photo, setPhoto] = useState(null);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const userData = authenticationService.currentUserValue;
    console.log(userData.user);
    if (userData && userData.user) setUser(userData.user);
    props.getPhotoVerifyExample();
  }, []);

  const submitHandler = (e) => {
    e.preventDefault();
    if (photo) {
      setLoading(true);
      props.verifyMyProfile(photo);
    }
  };

  return (
    <div className={`text-white`}>
      {user && user.active ? (
        <div>
          <span className={`h5`}>Ваша личность подтверждена</span>
        </div>
      ) : (
        <>
          <h4 className={`text-white`}>Подтверждение личности</h4>
          <h5 className={`text-white`}>
            Для получения статуса проверенный пожалуйста отправьте 1 селфи фото
            с кодом подтверждения{" "}
            {user && <b>{user.activation_token_cabinet}</b>} (пример на фото). И
            1 селфи фото любым документом подтверждающим Вашу личность
          </h5>
          {props.photoVerifyExample ? (
            <div>
              <img
                src={props.photoVerifyExample.photo_first}
                alt={`пример фото для верификации`}
                className={s.verify_photo_example}
              />
              <img
                src={props.photoVerifyExample.photo_second}
                alt={`пример фото для верификации`}
                className={s.verify_photo_example}
              />
            </div>
          ) : (
            <img
              src={VerifyExample}
              alt={`пример фото для верификации`}
              className={s.verify_photo_example}
            />
          )}
          {user &&
          !user.verify_progress &&
          !user.active &&
          !user.is_admin &&
          user.verify_progress !== "В процессе проверки" ? (
            <form onSubmit={submitHandler}>
              <label>
                Загрузите свое фото
                <input
                  type={`file`}
                  className={`my-2 d-block`}
                  multiple
                  onChange={(e) => setPhoto(e.target.files)}
                />
              </label>
              {loading ? (
                <div className="spinner-border text-primary" role="status">
                  <span className="sr-only">Loading...</span>
                </div>
              ) : (
                <div>
                  <button className={`btn btn-primary`}>
                    Отправить на проверку
                  </button>
                </div>
              )}
            </form>
          ) : user && user.verify_progress ? (
            <div className={`h3`}>Ваша заявка: {user.verify_progress}</div>
          ) : null}
        </>
      )}
    </div>
  );
}

const mapStateToProps = (state) => ({
  photoVerifyExample: state.user.photoVerifyExample,
});
const mapDispatchToProps = {
  getPhotoVerifyExample,
  verifyMyProfile,
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CabinetVerification);
