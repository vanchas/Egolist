import { connect } from "react-redux";
import React, { useEffect, useState } from "react";
import { updateUserInfo } from "../../redux/actions/userActions";
import { authenticationService } from "../../_services/authentication.service";
import { getCities } from "../../redux/actions/appActions";
import s from "./update.module.scss";
import MaskedInput from "react-text-mask";

const phoneNumberMask = [
  // /[1-9]/,
  /\d/,
  /\d/,
  "(",
  /\d/,
  /\d/,
  /\d/,
  ")",
  " ",
  /\d/,
  /\d/,
  /\d/,
  " ",
  /\d/,
  /\d/,
  " ",
  /\d/,
  /\d/,
];

function UpdateProfile(props) {
  const [name, setName] = useState(null);
  const [secondName, setSecondName] = useState(null);
  const [email, setEmail] = useState(null);
  const [phone, setPhone] = useState(null);
  const [telegram, setTelegram] = useState(null);
  const [viber, setViber] = useState(null);
  const [whatsapp, setWhatsapp] = useState(null);
  const [site, setSite] = useState(null);
  const [avatar, setAvatar] = useState(null);
  const [regionId, setRegionId] = useState(null);
  const [cityId, setCityId] = useState(null);
  const [cityLoading, setCityLoading] = useState(false);
  const [birthday, setBirthday] = useState(false);
  const [stateUser, setStateUser] = useState(null);
  const [showPage, setShowPage] = useState(false);
  const [updateLoading, setUpdateLoading] = useState(false);

  useEffect(() => {
    const user = authenticationService.currentUserValue;
    if (user && user.user) {
      setShowPage(true);
      setStateUser({
        ...user.user,
        telegram:
          user.user.telegram && user.user.telegram !== "null"
            ? user.user.telegram
            : "",
        viber:
          user.user.viber && user.user.viber !== "null" ? user.user.viber : "",
        whatsapp:
          user.user.whatsapp && user.user.whatsapp !== "null"
            ? user.user.whatsapp
            : "",
      });
    }
    if (props.cities && props.cities.length) setCityLoading(false);
  }, [props.cities]);

  const submitHandler = (e) => {
    e.preventDefault();
    setUpdateLoading(true);
    const user = authenticationService.currentUserValue.user;
    props.updateUserInfo(
      name ? name : user.name,
      secondName ? secondName : user.second_name,
      email ? email : user.email,
      phone ? parseInt(phone.match(/\d/g).join('')) : user.phone,
      telegram || telegram === "" ? telegram : user.telegram,
      viber || viber === "" ? viber : user.viber,
      whatsapp || whatsapp === "" ? whatsapp : user.whatsapp,
      site || site === "" ? site : user.site,
      avatar ? avatar : user.avatar,
      regionId ? regionId : user.region_id,
      cityId ? cityId : user.city_id,
      birthday ? birthday.split("-").join(".") : user.birth_date
    );
    setTimeout(() => setUpdateLoading(false), 5000);
  };

  return (
    <div>
      {showPage && (
        <>
          {stateUser ? (
            <>
              <h3> Редактировать информацию о пользователе</h3>
              <form
                encType={`multipart/form-data`}
                onSubmit={submitHandler}
                style={{ display: "grid" }}
              >
                <label>
                  {stateUser && stateUser.avatar ? (
                    <div className={s.user_avatar}>
                      <img src={stateUser.avatar} alt={stateUser.name} />
                    </div>
                  ) : null}
                  Фото
                  <input
                    type={`file`}
                    onChange={(e) => {
                      setAvatar(e.target.files[0]);
                    }}
                  />
                </label>
                <label>
                  Имя
                  <input
                    defaultValue={
                      stateUser && stateUser.name ? stateUser.name : ""
                    }
                    type={`text`}
                    onChange={(e) => {
                      setName(e.target.value);
                    }}
                    className={`form-control`}
                  />
                </label>
                <label>
                  Фамилия
                  <input
                    defaultValue={
                      stateUser && stateUser.second_name
                        ? stateUser.second_name
                        : ""
                    }
                    type={`text`}
                    onChange={(e) => {
                      setSecondName(e.target.value);
                    }}
                    className={`form-control`}
                  />
                </label>
                <label>
                  Емейл
                  <input
                    defaultValue={
                      stateUser && stateUser.email ? stateUser.email : ""
                    }
                    type={`email`}
                    onChange={(e) => {
                      setEmail(e.target.value);
                    }}
                    className={`form-control`}
                  />
                </label>
                <label>
                  Телефон
                  <MaskedInput
                    defaultValue={
                      stateUser && stateUser.phone ? stateUser.phone : ""
                    }
                    mask={phoneNumberMask}
                    id="phone"
                    type="text"
                    onChange={(e) => {
                      setPhone(e.target.value);
                    }}
                    className={"form-control"}
                  />
                </label>
                <label>
                  День рождения
                  <input
                    className={`form-control`}
                    defaultValue={
                      stateUser && stateUser.birth_date
                        ? stateUser.birth_date
                        : ""
                    }
                    type="date"
                    min="1920-01-01"
                    max="2020-01-01"
                    onChange={(e) => {
                      setBirthday(e.target.value);
                    }}
                  />
                </label>
                <label>
                  Телеграм
                  <input
                    defaultValue={
                      stateUser && stateUser.telegram ? stateUser.telegram : ""
                    }
                    type={`text`}
                    onChange={(e) => {
                      setTelegram(e.target.value);
                    }}
                    className={`form-control`}
                  />
                </label>
                <label>
                  Вайбер
                  <input
                    defaultValue={
                      stateUser && stateUser.viber ? stateUser.viber : ""
                    }
                    type={`text`}
                    onChange={(e) => {
                      setViber(e.target.value);
                    }}
                    className={`form-control`}
                  />
                </label>
                <label>
                  WhatsApp
                  <input
                    defaultValue={
                      stateUser && stateUser.whatsapp ? stateUser.whatsapp : ""
                    }
                    type={`text`}
                    onChange={(e) => {
                      setWhatsapp(e.target.value);
                    }}
                    className={`form-control`}
                  />
                </label>
                <label>
                  Веб сайт
                  <input
                    defaultValue={
                      stateUser && stateUser.site ? stateUser.site : ""
                    }
                    type={`url`}
                    onChange={(e) => {
                      setSite(e.target.value);
                    }}
                    className={`form-control`}
                  />
                </label>
                <label>
                  Регион
                  <select
                    onChange={(e) => {
                      props.getCities(e.target.value);
                      setRegionId(e.target.value);
                      setCityLoading(true);
                    }}
                    className={`form-control`}
                  >
                    {stateUser && stateUser.region ? (
                      <option hidden value={stateUser.region.id}>
                        {stateUser.region.name_ru}
                      </option>
                    ) : (
                      <option hidden></option>
                    )}
                    {props.locations && props.locations.length
                      ? props.locations.map((loc, i) => (
                          <option key={i} value={loc.id}>
                            {loc.name_ru}
                          </option>
                        ))
                      : null}
                  </select>
                </label>
                {cityLoading ? (
                  <div className="spinner-border text-primary" role="status">
                    <span className="sr-only">Loading...</span>
                  </div>
                ) : (
                  <label>
                    Город
                    <select
                      onChange={(e) => {
                        setCityId(e.target.value);
                      }}
                      className={`form-control`}
                    >
                      {stateUser && stateUser.city ? (
                        <option hidden value={stateUser.city.id}>
                          {stateUser.city.name_ru}
                        </option>
                      ) : null}
                      {props.cities && props.cities.length
                        ? props.cities.map((city, i) => (
                            <option key={i} value={city.id}>
                              {city.name_ru}
                            </option>
                          ))
                        : null}
                    </select>
                  </label>
                )}
                <div>
                  {updateLoading ? (
                    <div className="spinner-border text-primary" role="status">
                      <span className="sr-only">Loading...</span>
                    </div>
                  ) : (
                    <button className={`btn btn-primary`} type="submit">
                      Сохранить
                    </button>
                  )}
                </div>
              </form>
            </>
          ) : (
            <div className={`py-5 text-center`}>
              <div className="spinner-border text-primary" role="status">
                <span className="sr-only">Loading...</span>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}

const mapStateToProps = (state) => ({
  locations: state.app.locations,
  cities: state.app.cities,
});

const mapDispatchToProps = {
  updateUserInfo,
  getCities,
};
export default connect(mapStateToProps, mapDispatchToProps)(UpdateProfile);
