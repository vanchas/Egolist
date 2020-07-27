import React, { useEffect, useState } from "react";
import VerifyExample from "../../assets/verification.png";
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

  useEffect(() => {
    const userData = authenticationService.currentUserValue;
    if (userData && userData.user) setUser(userData.user);
    props.getPhotoVerifyExample();
  }, []);

  const submitHandler = (e) => {
    e.preventDefault();
    if (photo) {
      props.verifyMyProfile(photo);
    }
  };

  return (
    <div>
      <h4>Подтверждение личности</h4>
      <h5>
        Для получения статуса проверенный пожалуйста отправьте 1 селфи фото с
        кодом подтверждения {Date.now()} (пример на фото). И 1 селфи фото любым
        документом подтверждающим Вашу личность
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
      {user && user.verify_progress !== "В процессе проверки" ? (
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
          <div>
            <button className={`btn btn-primary`}>Отправить на проверку</button>
          </div>
        </form>
      ) : (
        user && <div className={`h3`}>{user.verify_progress}</div>
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
