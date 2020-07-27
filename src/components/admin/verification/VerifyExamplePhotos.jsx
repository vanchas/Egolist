import React, { useEffect, useState } from "react";
import s from "./verification.module.scss";
import {
  uploadPhotoVerifyExample,
  deletePhotoVerifyExample,
} from "../../../redux/actions/adminActions";
import { getPhotoVerifyExample } from "../../../redux/actions/userActions";
import { connect } from "react-redux";

function VerifyExamplePhotos(props) {
  const [photoFirst, setPhotoFirst] = useState(null);
  const [photoSecond, setPhotoSecond] = useState(null);

  useEffect(() => {
    props.getPhotoVerifyExample();
  }, []);

  const submitHandler = (e) => {
    e.preventDefault();
    props.uploadPhotoVerifyExample(photoFirst, photoSecond);
    setPhotoFirst(null);
    setPhotoSecond(null);
  };

  return (
    <div>
      <div className={`h4 my-2 ${s.heading}`}>Пример фото для верификации</div>
      <div>
        {props.photoVerifyExample ? (
          <>
            <div className={s.photo_example}>
              <img
                  className={s.verification_photo_example}
                  src={props.photoVerifyExample.photo_first}
                  alt={`пример фото для верификации 1`}
              />
              <span
                  className={s.btn_remove_photo}
                  onClick={() => props.deletePhotoVerifyExample('photo')}
              >
                  X
                </span>
            </div>
              <div className={s.photo_example}>
                <img
                  className={s.verification_photo_example}
                  src={props.photoVerifyExample.photo_second}
                  alt={`пример фото для верификации 2`}
                />
                <span
                  className={s.btn_remove_photo}
                  onClick={() => props.deletePhotoVerifyExample('photo')}
                >
                  X
                </span>
              </div>
          </>
        ) : (
          <div>Нет фото для примера</div>
        )}
      </div>
      <form onSubmit={submitHandler}>
        <legend>Загрузить новые фото</legend>
        <label>
          Фото №1
          <input
            type={`file`}
            className={`d-block`}
            onChange={(e) => setPhotoFirst(e.target.files[0])}
          />
        </label>
        <label>
          Фото №2
          <input
            type={`file`}
            className={`d-block`}
            onChange={(e) => setPhotoSecond(e.target.files[0])}
          />
        </label>
        <div>
          <button
            type={`submit`}
            className={`btn btn-primary`}
            disabled={!photoFirst && !photoSecond ? true : false}
          >
            Оправить
          </button>
        </div>
      </form>
      <hr />
    </div>
  );
}

const mapStateToProps = (state) => ({
  photoVerifyExample: state.user.photoVerifyExample,
});
const mapDispatchToProps = {
  uploadPhotoVerifyExample,
  getPhotoVerifyExample,
  deletePhotoVerifyExample,
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(VerifyExamplePhotos);
