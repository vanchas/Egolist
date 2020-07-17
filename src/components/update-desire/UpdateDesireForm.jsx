import React, { useState, useEffect } from "react";
import Alert from "../helpers/Alert";
import Success from "../helpers/Success";
import { useRouter } from "next/router";
import s from "./update.module.scss";
import inputValidateHandler from "../helpers/FieldsValidator";

export default function UpdateForm({
  locations,
  alert,
  showAlert,
  updateDesire,
  categories,
  subcategories,
  cities,
  types,
  priorities,
  getSubcategories,
  getCities,
  success,
  getDesireById,
  desire,
                                     deleteDesirePhoto
}) {
  const router = useRouter();
  const [header, setHeader] = useState(null);
  const [photo, setPhoto] = useState(null);
  const [video, setVideo] = useState(null);
  const [price, setPrice] = useState(null);
  const [description, setDescription] = useState(null);
  const [priority_id, setPriority_id] = useState(null);
  const [type_id, setType_id] = useState(null);
  const [region_id, setRegion_id] = useState(null);
  const [is_active, setIs_active] = useState(1);
  const [city_id, setCity_id] = useState(null);
  const [warning, setWarning] = useState(null);
  const [loadingSubcategory, setLoadingSubcategory] = useState(false);
  const [loadingCity, setLoadingCity] = useState(false);
  const [stateDesire, setStateDesire] = useState(null);
  const [category1, setCategory1] = useState(null);
  const [category2, setCategory2] = useState(null);
  const [subcategory1, setSubcategory1] = useState(null);
  const [subcategory2, setSubcategory2] = useState(null);

  useEffect(() => {
    if (desire && desire.id) {
      setStateDesire(desire);
    } else {
      getDesireById(router.query.id);
    }
    if (cities.length) setLoadingCity(false);
    if (subcategories.length) setLoadingSubcategory(false);
    setTimeout(() => setWarning(null), 10000);
  }, [warning, subcategories, cities, desire]);

  const videoValidator = (videoValue) => {
    const regExp = /^(https:\/\/www\.)?youtube\.com\/[aA-zZ0-9\/+*.$^?=&-]*$/m;
    if (
        !videoValue || videoValue === 'null' ||
        videoValue.match(regExp)
    ) {
      return true;
    } else {
      return false;
    }
    return false;
  };

  const submitHandler = (e) => {
    e.preventDefault();
    if (videoValidator(
        video ? video : stateDesire.video
    )) {
      updateDesire(
          router.query.id,
          photo ? photo : stateDesire.photo,
          video ? video : stateDesire.video,
          description ? description : stateDesire.description,
          header ? header : stateDesire.header,
          price ? price : stateDesire.price,
          priority_id ? priority_id : stateDesire.priority.id,
          type_id ? type_id : stateDesire.type.id,
          category1 ? [category1] : [stateDesire.category[0].id],
          subcategory1 ? [subcategory1] : [stateDesire.subcategory[0].id],
          region_id ? region_id : stateDesire.region_id,
          city_id ? city_id : stateDesire.city_id,
          is_active ? is_active : stateDesire.is_active
      );
    }
  };

  return (
    <div className={s.update_form}>
      <h3>Редактировать желание</h3>
      {warning && (
        <div className="alert alert-danger" role="alert">
          {warning}
        </div>
      )}

      {alert && <Alert />}
      <form
        encType="multipart/form-data"
        onSubmit={submitHandler}
        className={s.update_form}
      >
        <label>Категория #1</label>
        {categories.length ? (
          <select
            className="form-control"
            onChange={(e) => {
              setLoadingSubcategory(true);
              getSubcategories(e.target.value);
              setCategory1(e.target.value);
            }}
          >
            {stateDesire && stateDesire.category
              ? <option value={stateDesire.category[0].id} hidden>
                  {stateDesire.category[0].name}
            </option> : null}
            {categories
              ? categories.map((cat, i) => (
                  <option value={cat.id} key={i}>
                    {cat.name}
                  </option>
                ))
              : null}
          </select>
        ) : (
          <div className="spinner-border text-primary" role="status">
            <span className="sr-only">Loading...</span>
          </div>
        )}
        <label>Подкатегория</label>
        {!loadingSubcategory ? (
          <select
            className="form-control"
            onChange={(e) => {
              setSubcategory1(e.target.value);
            }}
          >
            {stateDesire && stateDesire.subcategory
                ? <option value={stateDesire.subcategory[0].id} hidden>
                  {stateDesire.subcategory[0].name}
                </option> : null}
            {subcategories
              ? subcategories.map((cat, i) => (
                  <option value={cat.id} key={i}>
                    {cat.name}
                  </option>
                ))
              : null}
          </select>
        ) : (
          <div className="spinner-border text-primary" role="status">
            <span className="sr-only">Loading...</span>
          </div>
        )}
        <label>Регион</label>
        {locations.length ? (
          <select
            className="form-control"
            onChange={(e) => {
              setLoadingCity(true);
              getCities(parseInt(e.target.value));
              setRegion_id(parseInt(e.target.value));
            }}
          >
            {stateDesire && stateDesire.region
                ? <option value={stateDesire.region.id} hidden>
                  {stateDesire.region.name_ru}
                </option> : null}
            {locations
              ? locations.map((loc, i) => (
                  <option value={loc.id} key={i}>
                    {loc.name_ru}
                  </option>
                ))
              : null}
          </select>
        ) : (
          <div className="spinner-border text-primary" role="status">
            <span className="sr-only">Loading...</span>
          </div>
        )}
        <label>Город</label>
        {!loadingCity ? (
          <select
            className="form-control"
            onChange={(e) => setCity_id(e.target.value)}
          >
            {stateDesire && stateDesire.city
                ? <option value={stateDesire.city.id} hidden>
                  {stateDesire.city.name_ru}
                </option> : null}
            {cities
              ? cities.map((city, i) => (
                  <option value={city.id} key={i}>
                    {city.name_ru}
                  </option>
                ))
              : null}
          </select>
        ) : (
          <div className="spinner-border text-primary" role="status">
            <span className="sr-only">Loading...</span>
          </div>
        )}
        <div className={s.types}>
          <div>Тип</div>
          {types
            ? types.map((type, i) => (
                <label key={i}>
                  <input
                      checked={stateDesire && stateDesire.type && stateDesire.type.id === type.id ? true : false}
                    type="radio"
                    value={type.id}
                    onChange={(e) => {
                      setStateDesire({...stateDesire, type})
                       setType_id(e.target.value)
                    }}
                    name="type"
                  />
                  {type.value}
                </label>
              ))
            : null}
        </div>
        <div className={s.priorities}>
          <div>Приоритет</div>
          {priorities
            ? priorities.map((priority, i) => (
                <label key={i}>
                  <input
                      checked={stateDesire && stateDesire.priority && stateDesire.priority.id === priority.id ? true : false}
                    type="radio"
                    value={priority.id}
                    onChange={(e) => {
                      setStateDesire({...stateDesire, priority})
                      setPriority_id(e.target.value)
                    }}
                    name="priority"
                  />
                  {priority.value}
                </label>
              ))
            : null}
        </div>
        <label htmlFor="header">Заголовок</label>
        <input
          className="form-control"
          type="text"
          name="header"
          id="header"
          maxLength={`50`}
          value={stateDesire && stateDesire.header ? stateDesire.header : ''}
          onChange={(e) => {
            if (inputValidateHandler(e, setWarning)) {
              setStateDesire({...stateDesire, header: e.target.value})
              setHeader(e.target.value);
            }
          }}
        />
        <label htmlFor="description">Описание</label>
        <input
          className="form-control"
          type="text"
          name="description"
          id="description"
          maxLength={`1000`}
          value={stateDesire && stateDesire.description ? stateDesire.description : ''}
          onChange={(e) => {
            if (inputValidateHandler(e, setWarning)) {
              setStateDesire({...stateDesire, description: e.target.value})
              setDescription(e.target.value);
            }
          }}
        />
        <label htmlFor="price">Цена</label>
        <input
          className="form-control"
          type="number"
          name="price"
          id="price"
          min={`1`}
          max={`999999999999`}
          value={stateDesire && stateDesire.price ? stateDesire.price : ''}
          onChange={(e) => {
            setStateDesire({...stateDesire, price: e.target.value})
            setPrice(e.target.value)
          }}
        />
        <label htmlFor="video">Видео</label>
        <input
          className="form-control"
          type="url"
          name="video"
          id="video"
          value={stateDesire && stateDesire.video ? stateDesire.video : ''}
          onChange={(e) => {
            setStateDesire({...stateDesire, video: e.target.value})
            setVideo(e.target.value)
          }}
        />
        <label htmlFor="photo">Добавить фото</label>
        <input
          className="form-control"
          type="file"
          multiple
          name="photo"
          id="photo"
          onChange={(e) => setPhoto(e.target.files)}
        />
        <div>
          <span className={`d-block`}>Удалить фото</span>
          <div className={s.photo_list}>
          {stateDesire && stateDesire.photo && JSON.parse(stateDesire.photo).length
          ? JSON.parse(stateDesire.photo).map((p, i) => {
               if (p) {
                 return <div key={i}>
                   <img src={p} alt="" />
                    <span className={`btn btn-danger`}
                    onClick={()=>deleteDesirePhoto(stateDesire.id, p)}>X</span>
                 </div>
               }
              })
            : null}
          </div>
        </div>
        <div>
          {success && <Success />}
          {stateDesire ? (
            <button type="submit" className="btn btn-primary mt-2">
              Сохранить
            </button>
          ) : (
            <div className="spinner-border text-primary" role="status">
              <span className="sr-only">Loading...</span>
            </div>
          )}
        </div>
      </form>
    </div>
  );
}
