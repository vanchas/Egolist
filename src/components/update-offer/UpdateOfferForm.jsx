import React, { useEffect, useState } from "react";
import s from "./update.module.scss";
import Alert from "../helpers/Alert";
import Success from "../helpers/Success";
import { useRouter } from "next/router";
import inputValidateHandler from "../helpers/FieldsValidator";

export default function UpdateOfferForm({
  updateOffer,
  alert,
  showAlert,
  categories,
  subcategories,
  getSubcategories,
  locations,
  cities,
  getCities,
  success,
  deleteOfferPhoto,
  offer,
  getOfferById,
}) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState("");
  const [photos, setPhotos] = useState([]);
  const [video, setVideo] = useState("");
  const [description, setDescription] = useState("");
  const [category1, setCategory1] = useState(null);
  const [category2, setCategory2] = useState(null);
  const [subcategory1, setSubcategory1] = useState(null);
  const [subcategory2, setSubcategory2] = useState(null);
  const [price, setPrice] = useState("");
  const [region, setRegion] = useState("");
  const [city, setCity] = useState("");
  const [isActive, setIsActive] = useState(0);
  const [showSubSelect1, setShowSubSelect1] = useState(false);
  const [showSubSelect2, setShowSubSelect2] = useState(false);
  const [subcategory1Loading, setSubcategory1Loading] = useState(false);
  const [subcategory2Loading, setSubcategory2Loading] = useState(false);
  const [regionLoading, setRegionLoading] = useState(false);
  const [stateOffer, setStateOffer] = useState(null);
  const [warning, setWarning] = useState(null);

  useEffect(() => {
    setTimeout(() => setWarning(null), 10000);
    if (offer) {
      setStateOffer(offer);
    } else {
      getOfferById(router.query.id);
    }
  }, [offer]);

  const videoValidator = (videoValue) => {
    const regExp = /^(https:\/\/www\.)?youtube\.com\/[aA-zZ0-9\/+*.$^?=&-]*$/m;
    if (!videoValue || videoValue.match(regExp)) {
      return true;
    } else {
      return false;
    }
    return false;
  };

  const submitHandler = (e) => {
    e.preventDefault();
    if (videoValidator(video ? video : stateOffer.video)) {
      setLoading(true);
      updateOffer(
        router.query.desire_id,
        router.query.id,
        photos ? photos : stateOffer.photos,
        video ? video : stateOffer.video,
        description ? description : stateOffer.description,
        title ? title : stateOffer.header,
        price ? price : stateOffer.price,
        category1 ? [category1] : [stateOffer.category[0].id],
        subcategory1 ? [subcategory1] : [stateOffer.subcategory[0].id],
        region ? region : stateOffer.region_id,
        city ? city : stateOffer.city_id,
        isActive ? isActive : stateOffer.is_active
      );
      setTitle("");
      setPhotos([]);
      setVideo("");
      setDescription("");
      setCategory1(null);
      setCategory2(null);
      setSubcategory1(null);
      setSubcategory2(null);
      setPrice("");
      setIsActive(1);
      setTimeout(() => setLoading(false), 5000);
    } else {
      showAlert("Видео должно быть из YouTube");
    }
  };

  const category1Handler = (e) => {
    setSubcategory1Loading(true);
    setCategory1(e.target.value);
    getSubcategories(e.target.value);
    setShowSubSelect1(true);
  };
  const category2Handler = (e) => {
    setSubcategory2Loading(true);
    getSubcategories(e.target.value);
    setCategory2(e.target.value);
    setShowSubSelect2(true);
  };

  const locationSelectHandler = (e) => {
    setRegionLoading(true);
    setRegion(e.target.value);
    getCities(e.target.value);
  };

  return (
    <div className={s.add_lot_form}>
      <h3>Редактирование предложения</h3>
      {warning && (
        <div className="alert alert-danger" role="alert">
          {warning}
        </div>
      )}

      <span className={s.btn_back} onClick={() => router.back()}>
        &lt; Назад
      </span>
      {alert && <Alert />}
      {success && <Success />}
      <form onSubmit={submitHandler} encType="multipart/form-data">
        <div>
          <label>Заголовок</label>
          <input
            type="text"
            value={title}
            name={`header`}
            maxLength={`50`}
            className="form-control"
            onChange={(e) => {
              if (inputValidateHandler(e, setWarning)) setTitle(e.target.value);
            }}
          />
          <label>Добаить фото</label>
          {[1, 2, 3, 4, 5, 6, 7, 8].map((input, i) => (
            <input
              key={i}
              type="file"
              onChange={(e) => setPhotos([...photos, e.target.files[0]])}
            />
          ))}
          <div className={s.photo_list}>
            <span>Удалить фото</span>
            {stateOffer &&
            stateOffer.photo &&
            JSON.parse(stateOffer.photo).length
              ? JSON.parse(stateOffer.photo).map((p, i) => {
                  if (p) {
                    return (
                      <div>
                        <img src={p} key={i} alt="" />
                        <span
                          className={`btn btn-danger`}
                          onClick={() => deleteOfferPhoto(stateOffer.id, p)}
                        >
                          X
                        </span>
                      </div>
                    );
                  }
                })
              : null}
          </div>
          <label htmlFor="video">Видео (YouTube)</label>
          <input
            type="url"
            value={video}
            placeholder="https:// ...."
            id="video"
            className="form-control"
            onChange={(e) => setVideo(e.target.value)}
          />
          <label>Описание</label>
          <textarea
            value={description}
            name={`description`}
            className="form-control"
            rows="10"
            maxLength={`10000`}
            onChange={(e) => {
              if (inputValidateHandler(e, setWarning))
                setDescription(e.target.value);
            }}
          />
        </div>
        <div>
          <fieldset>
            <legend>Выберите категорию</legend>
            {!categories || !categories.length ? (
              <div className="spinner-border text-primary" role="status">
                <span className="sr-only">Loading...</span>
              </div>
            ) : category1 ? (
              <div>Выбрана категория {category1}</div>
            ) : (
              <select
                className="form-control"
                onChange={(e) => category1Handler(e)}
              >
                <option value="default" hidden>
                  первая категория
                </option>
                {categories && categories.length
                  ? categories.map((c, i) => (
                      <option key={i} value={c.id}>
                        {c.name}
                      </option>
                    ))
                  : null}
              </select>
            )}
            {!subcategories.length && subcategory1Loading ? (
              <div className="spinner-border text-primary" role="status">
                <span className="sr-only">Loading...</span>
              </div>
            ) : (
              showSubSelect1 &&
              (subcategory1 ? (
                <div>Выбрана подкатегория {subcategory1}</div>
              ) : (
                <select
                  className="form-control"
                  onChange={(e) => setSubcategory1(e.target.value)}
                >
                  <option value="default" hidden>
                    первая подкатегория
                  </option>
                  {subcategories && subcategories.length
                    ? subcategories.map((s, i) => (
                        <option key={i} value={s.id}>
                          {s.name}
                        </option>
                      ))
                    : null}
                </select>
              ))
            )}
            <br />
            {!categories || !categories.length ? (
              <div className="spinner-border text-primary" role="status">
                <span className="sr-only">Loading...</span>
              </div>
            ) : category2 ? (
              <div>Выбрана категория {category2}</div>
            ) : (
              <select
                className="form-control"
                onChange={(e) => category2Handler(e)}
              >
                <option value="default" hidden>
                  вторая категория
                </option>
                {categories && categories.length
                  ? categories.map((c, i) => (
                      <option key={i} value={c.id}>
                        {c.name}
                      </option>
                    ))
                  : null}
              </select>
            )}
            {!subcategories && subcategory2Loading ? (
              <div className="spinner-border text-primary" role="status">
                <span className="sr-only">Loading...</span>
              </div>
            ) : (
              showSubSelect2 &&
              (subcategory2 ? (
                <div>Выбрана подкатегория {subcategory2}</div>
              ) : (
                <select
                  className="form-control"
                  onChange={(e) => {
                    setSubcategory2(e.target.value);
                    getSubcategories(e.target.value);
                  }}
                >
                  <option value="default" hidden>
                    первая подкатегория
                  </option>
                  {subcategories && subcategories.length
                    ? subcategories.map((s, i) => (
                        <option key={i} value={s.id}>
                          {s.name}
                        </option>
                      ))
                    : null}
                </select>
              ))
            )}
          </fieldset>
          <fieldset>
            <legend>Выберите область</legend>
            {!locations || !locations.length ? (
              <div className="spinner-border text-primary" role="status">
                <span className="sr-only">Loading...</span>
              </div>
            ) : (
              <select
                className="form-control"
                onChange={(e) => locationSelectHandler(e)}
              >
                <option value="default" hidden></option>
                {locations && locations.length
                  ? locations.map((c, i) => (
                      <option key={i} value={c.id}>
                        {c.name_ru}
                      </option>
                    ))
                  : null}
              </select>
            )}
            {!cities.length && regionLoading ? (
              <div className="spinner-border text-primary" role="status">
                <span className="sr-only">Loading...</span>
              </div>
            ) : (
              <select
                className="form-control"
                onChange={(e) => setCity(e.target.value)}
              >
                <option value="default" hidden>
                  Города
                </option>
                {cities && cities.length
                  ? cities.map((s, i) => (
                      <option key={i} value={s.id}>
                        {s.name_ru}
                      </option>
                    ))
                  : null}
              </select>
            )}
          </fieldset>
          <label htmlFor="price">Цена</label>
          <input
            type="number"
            id="price"
            min={`1`}
            max={`999999999999`}
            maxLength={`12`}
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="form-control"
          />
          <label>
            <input
              type="checkbox"
              onChange={() => (isActive ? setIsActive(0) : setIsActive(1))}
            />
            Сделать Активным
          </label>
          <div className="d-flex">
            {!offer ? (
              <div className="spinner-border text-primary" role="status">
                <span className="sr-only">Loading...</span>
              </div>
            ) : (
              <button type="submit" className="ml-2 btn btn-secondary">
                Опубликовать
              </button>
            )}
            {loading && (
              <div className="text-center py-2 pl-4">
                <div className="spinner-border text-primary" role="status">
                  <span className="sr-only">Loading...</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </form>
    </div>
  );
}
