import React, { useEffect, useState } from "react";
import VerifyExample from "../../assets/old/verification.png";
import {
  getPhotoVerifyExample,
  verifyMyProfile,
} from "../../redux/actions/userActions";
import { showAlert } from "../../redux/actions/appActions";
import s from "./verify.module.scss";
import { connect } from "react-redux";
import { authenticationService } from "../../_services/authentication.service";
import Spinner from "../helpers/Spinner";
import ReportProblem from "./ReportProblem";

function CabinetVerification(props) {
  const [photo, setPhoto] = useState(null);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const userData = authenticationService.currentUserValue;
    // console.log(userData.user);
    if (userData && userData.user) {
      setUser(userData.user);
    }
    props.getPhotoVerifyExample();
  }, [loading]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (photo && user.name && user.second_name && user.phone && user.region_id && user.city_id) {
      setLoading(true);
      props.verifyMyProfile(photo);
    } else {
      props.showAlert('Заполните, пожалуйста, поля: "имя", "фамилия", "номер телефона", "город"')
      props.changeVisibleComponent('update info')
    }
  };

  return (
    <div className={`text-white position-relative`}>
      <ReportProblem position={`left`} />
      {user && user.active ? (
        <div>
          <span className={`h5`}>Ваша личность подтверждена</span>
        </div>
      ) : (
        <>
          <h4 className={`text-white text-center`}>Подтверждение личности</h4>
          <p className={`text-white container h5`}>
            Для получения статуса проверенный пожалуйста отправьте 1 селфи фото
            с кодом подтверждения{" "}
            {user && <b>{user.activation_token_cabinet}</b>} (пример на фото). И
            1 селфи фото любым документом подтверждающим Вашу личность
          </p>
          <p className={`text-white container h5`}>
            Tакже
            должны быть корректно заполненны поля: "имя", "фамилия", "номер
            телефона", "город".
          </p>
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

            <form onSubmit={submitHandler} className={s.veification_form} encType={`multipart/form-data`}>
              <label>
                Загрузите свое фото для верификации
                <input
                  type={`file`}
                  className={`my-2 d-block`}
                  multiple
                  required
                  onChange={(e) => setPhoto(e.target.files)}
                />
              </label>
              {loading ? (
                <Spinner color={`primary`} />
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
  showAlert
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CabinetVerification);
