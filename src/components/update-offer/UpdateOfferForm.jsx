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
  const [loadingSubcategory1, setLoadingSubcategory1] = useState(false);
  const [loadingSubcategory2, setLoadingSubcategory2] = useState(false);
  const [cityLoading, setCityLoading] = useState(false);
  const [stateOffer, setStateOffer] = useState(null);
  const [warning, setWarning] = useState(null);

  useEffect(() => {
    setTimeout(() => setWarning(null), 10000);
    if (offer) {
      setStateOffer(offer);
    } else {
      getOfferById(router.query.id);
    }
    if (cities.length) setCityLoading(false);
    if (subcategories && subcategories.length) {
      setLoadingSubcategory1(false);
      setLoadingSubcategory2(false);
    }
  }, [offer, subcategories, cities]);

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
        // category1 ? [category1] : [stateOffer.category[0].id],
        category1 && category2
          ? [category1, category2]
          : category1 && !category2
          ? [category1]
          : category2 && !category1
          ? [category2]
          : stateOffer.category.length === 1
          ? [stateOffer.category[0].id]
          : [stateOffer.category[0].id, stateOffer.category[2].id],
        // subcategory1 ? [subcategory1] : [stateOffer.subcategory[0].id],
        subcategory1 && subcategory2
          ? [subcategory1, subcategory2]
          : subcategory1 && !subcategory2
          ? [subcategory1]
          : subcategory2 && !subcategory1
          ? [subcategory2]
          : stateOffer.subcategory.length === 1
          ? [stateOffer.subcategory[0].id]
          : [stateOffer.subcategory[0].id, stateOffer.subcategory[2].id],
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
    setLoadingSubcategory1(true);
    getSubcategories(e.target.value);
    setCategory1(e.target.value);
  };
  const category2Handler = (e) => {
    setLoadingSubcategory2(true);
    getSubcategories(e.target.value);
    setCategory2(e.target.value);
  };

  const locationSelectHandler = (e) => {
    setCityLoading(true);
    getCities(parseInt(e.target.value));
    setRegion(parseInt(e.target.value));
  };

  return (
    <div className={s.add_lot_form}>
      {stateOffer ? (
        <>
          <span className={s.btn_back} onClick={() => router.back()}>
            &lt; Назад
          </span>

          <h3 className={`mt-3`}>Редактирование предложения</h3>
          {warning && (
            <div className="alert alert-danger" role="alert">
              {warning}
            </div>
          )}

          {alert && <Alert />}
          {success && <Success />}
          <form
            onSubmit={submitHandler}
            encType="multipart/form-data"
            className={`${s.update_form} row`}
          >
            <div className={`col-8`}>
              <label>Заголовок</label>
              <input
                type="text"
                value={stateOffer && stateOffer.header ? stateOffer.header : ""}
                name={`header`}
                maxLength={`50`}
                className="form-control"
                onChange={(e) => {
                  if (inputValidateHandler(e, setWarning)) {
                    setStateOffer({ ...stateOffer, header: e.target.value });
                    setTitle(e.target.value);
                  }
                }}
              />
              <label>Добаить фото</label>
              <div className={s.photo_inputs}>
                {[1, 2, 3, 4, 5, 6, 7, 8].map((input, i) => (
                  <input
                    key={i}
                    type="file"
                    onChange={(e) => setPhotos([...photos, e.target.files[0]])}
                  />
                ))}
              </div>
              <div className={s.photo_list}>
                {stateOffer &&
                stateOffer.photo &&
                JSON.parse(stateOffer.photo).length ? (
                  <>
                    <label>Удалить фото</label>
                    {JSON.parse(stateOffer.photo).map((p, i) => {
                      if (p) {
                        return (
                          <div key={i}>
                            <img src={p} alt="" />
                            <span
                              className={`btn btn-danger ${s.btn_remove_photo}`}
                              onClick={() => deleteOfferPhoto(stateOffer.id, p)}
                            >
                              X
                            </span>
                          </div>
                        );
                      }
                    })}
                  </>
                ) : null}
              </div>
              <label htmlFor="video">Видео (YouTube)</label>
              <input
                type="url"
                value={
                  stateOffer && stateOffer.video && stateOffer.video !== "null"
                    ? stateOffer.video
                    : ""
                }
                placeholder="https:// ...."
                id="video"
                className="form-control"
                onChange={(e) => {
                  setStateOffer({ ...stateOffer, video: e.target.value });
                  setVideo(e.target.value);
                }}
              />
              <label>Описание</label>
              <textarea
                value={
                  stateOffer && stateOffer.description
                    ? stateOffer.description
                    : ""
                }
                name={`description`}
                className="form-control"
                rows="10"
                maxLength={`10000`}
                onChange={(e) => {
                  if (inputValidateHandler(e, setWarning)) {
                    setStateOffer({
                      ...stateOffer,
                      description: e.target.value,
                    });
                    setDescription(e.target.value);
                  }
                }}
              />
            </div>
            <div className={`col-4`}>
              <label>Категория #1</label>
              {categories.length ? (
                <select
                  className="form-control"
                  onChange={(e) => category1Handler(e)}
                >
                  {stateOffer && stateOffer.category ? (
                    <option value={stateOffer.category[0].id} hidden>
                      {stateOffer.category[0].name}
                    </option>
                  ) : null}
                  {categories
                    ? categories.map((cat, i) => (
                        <option value={cat.id} key={i}>
                          {cat.name}
                        </option>
                      ))
                    : null}
                </select>
              ) : (
                <div className={`w-100 py-1`}>
                  <div className="spinner-border text-primary" role="status">
                    <span className="sr-only">Loading...</span>
                  </div>
                </div>
              )}
              <label>Подкатегория #1</label>
              {!loadingSubcategory1 ? (
                <select
                  className="form-control"
                  onChange={(e) => {
                    setSubcategory1(e.target.value);
                  }}
                >
                  {stateOffer && stateOffer.subcategory ? (
                    <option value={stateOffer.subcategory[0].id} hidden>
                      {stateOffer.subcategory[0].name}
                    </option>
                  ) : null}
                  {subcategories
                    ? subcategories.map((cat, i) => (
                        <option value={cat.id} key={i}>
                          {cat.name}
                        </option>
                      ))
                    : null}
                </select>
              ) : (
                <div className={`w-100 py-1`}>
                  <div className="spinner-border text-primary" role="status">
                    <span className="sr-only">Loading...</span>
                  </div>
                </div>
              )}
              <label>Категория #2</label>
              {categories.length ? (
                <select
                  className="form-control"
                  onChange={(e) => category2Handler(e)}
                >
                  {stateOffer &&
                  stateOffer.category &&
                  stateOffer.category.length > 1 ? (
                    <option value={stateOffer.category[1].id} hidden>
                      {stateOffer.category[1].name}
                    </option>
                  ) : null}
                  {categories
                    ? categories.map((cat, i) => (
                        <option value={cat.id} key={i}>
                          {cat.name}
                        </option>
                      ))
                    : null}
                </select>
              ) : (
                <div className={`w-100 py-1`}>
                  <div className="spinner-border text-primary" role="status">
                    <span className="sr-only">Loading...</span>
                  </div>
                </div>
              )}
              <label>Подкатегория #2</label>
              {!loadingSubcategory2 ? (
                <select
                  className="form-control"
                  onChange={(e) => {
                    setSubcategory2(e.target.value);
                  }}
                >
                  {stateOffer &&
                  stateOffer.subcategory &&
                  stateOffer.subcategory.length > 1 ? (
                    <option value={stateOffer.subcategory[1].id} hidden>
                      {stateOffer.subcategory[1].name}
                    </option>
                  ) : null}
                  {subcategories
                    ? subcategories.map((cat, i) => (
                        <option value={cat.id} key={i}>
                          {cat.name}
                        </option>
                      ))
                    : null}
                </select>
              ) : (
                <div className={`w-100 py-1`}>
                  <div className="spinner-border text-primary" role="status">
                    <span className="sr-only">Loading...</span>
                  </div>
                </div>
              )}
              <label>Регион</label>
              {locations.length ? (
                <select
                  className="form-control"
                  onChange={(e) => locationSelectHandler(e)}
                >
                  {stateOffer && stateOffer.region ? (
                    <option value={stateOffer.region.id} hidden>
                      {stateOffer.region.name_ru}
                    </option>
                  ) : null}
                  {locations
                    ? locations.map((loc, i) => (
                        <option value={loc.id} key={i}>
                          {loc.name_ru}
                        </option>
                      ))
                    : null}
                </select>
              ) : (
                <div className={`w-100 py-1`}>
                  <div className="spinner-border text-primary" role="status">
                    <span className="sr-only">Loading...</span>
                  </div>
                </div>
              )}
              <label>Город</label>
              {!cityLoading ? (
                <select
                  className="form-control"
                  onChange={(e) => setCity(e.target.value)}
                >
                  {stateOffer && stateOffer.city ? (
                    <option value={stateOffer.city.id} hidden>
                      {stateOffer.city.name_ru}
                    </option>
                  ) : null}
                  {cities
                    ? cities.map((city, i) => (
                        <option value={city.id} key={i}>
                          {city.name_ru}
                        </option>
                      ))
                    : null}
                </select>
              ) : (
                <div className={`w-100 py-1`}>
                  <div className="spinner-border text-primary" role="status">
                    <span className="sr-only">Loading...</span>
                  </div>
                </div>
              )}
              <label htmlFor="price">Цена</label>
              <input
                type="number"
                id="price"
                min={`1`}
                max={`999999999999`}
                maxLength={`12`}
                value={stateOffer && stateOffer.price ? stateOffer.price : ""}
                onChange={(e) => {
                  setStateOffer({ ...stateOffer, price: e.target.value });
                  setPrice(e.target.value);
                }}
                className="form-control"
              />
              <label>
                <input
                  type={`checkbox`}
                  onChange={() => {
                    if (stateOffer.is_active === 0) {
                      setIsActive(1);
                      setStateOffer({ ...stateOffer, is_active: 1 });
                    } else {
                      setIsActive(0);
                      setStateOffer({ ...stateOffer, is_active: 0 });
                    }
                  }}
                  checked={!!(stateOffer && stateOffer.is_active)}
                />
                Сделать активным
              </label>
              <div className="d-flex">
                {!offer ? (
                  <div className={`w-100 py-1`}>
                    <div className="spinner-border text-primary" role="status">
                      <span className="sr-only">Loading...</span>
                    </div>
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
        </>
      ) : (
        <div className={`w-100 py-5 text-center`}>
          <div className="spinner-border text-primary" role="status">
            <span className="sr-only">Loading...</span>
          </div>
        </div>
      )}
    </div>
  );
}
