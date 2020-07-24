import React, { useState } from "react";
import VerificationExampleP from "../../../assets/verification.png";
import s from './verification.module.scss'

export default function () {
  const [photo, setPhoto] = useState(null);

  const submitHandler = (e) => {
    e.preventDefault();
  };

  return (
    <div>
      <div className={`h4 my-2 ${s.heading}`}>Пример фото для верификации</div>
      <div>
        <img
            className={s.verification_photo_example}
            src={VerificationExampleP}
             alt={`пример фото для верификации`} />
      </div>
      <form onSubmit={submitHandler}>
        <label>
          Загрузить новые фото
          <input
            type={`file`}
            className={`d-block`}
            onChange={(e) => setPhoto(e.target.files[0])}
          />
        </label>
        <div>
          <button
            type={`submit`}
            className={`btn btn-primary`}
            disabled={photo ? false : true}
          >
            Оправить
          </button>
        </div>
      </form>
      <hr />
    </div>
  );
}
