import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import s from "./update-desire.module.scss";
import inputValidateHandler from "../helpers/FieldsValidator";
import $ from "jquery";
import SpinnerGrow from "../helpers/SpinnerGrow"

export default function UpdateForm({
  locations,
  updateDesire,
  categories,
  subcategories,
  cities,
  types,
  priorities,
  getSubcategories,
  getCities,
  getDesireById,
  desire,
  deleteDesirePhoto,
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
  const [loadingSubcategory1, setLoadingSubcategory1] = useState(false);
  const [loadingSubcategory2, setLoadingSubcategory2] = useState(false);
  const [loadingCity, setLoadingCity] = useState(false);
  const [stateDesire, setStateDesire] = useState(null);
  const [category1, setCategory1] = useState(null);
  const [category2, setCategory2] = useState(null);
  const [subcategory1, setSubcategory1] = useState(null);
  const [subcategory2, setSubcategory2] = useState(null);
  const [submitLoading, setSubmitLoading] = useState(true);

  useEffect(() => {
    if (desire && desire.id) {
      setSubmitLoading(false);
      setStateDesire(desire);
    } else {
      getDesireById(router.query.id);
    }
    if (cities.length) setLoadingCity(false);
    if (subcategories.length) {
      setLoadingSubcategory1(false);
      setLoadingSubcategory2(false);
    }
    setTimeout(() => setWarning(null), 10000);
  }, [warning, subcategories, cities, desire]);

  const videoValidator = (videoValue) => {
    const regExp = /^(https:\/\/www\.)?youtube\.com\/[aA-zZ0-9\/+*.$^?=&-]*$/m;
    if (!videoValue || videoValue === "null" || videoValue.match(regExp)) {
      return true;
    } else {
      return false;
    }
    return false;
  };

  const submitHandler = (e) => {
    e.preventDefault();
    if (videoValidator(video ? video : stateDesire.video)) {
      setSubmitLoading(true);
      updateDesire(
        router.query.id,
        photo ? photo : stateDesire.photo,
        video ? video : stateDesire.video,
        description ? description : stateDesire.description,
        header ? header : stateDesire.header,
        price ? price : stateDesire.price,
        priority_id ? priority_id : stateDesire.priority.id,
        type_id ? type_id : stateDesire.type.id,
        category1 && category2
          ? [category1, category2]
          : category1 && !category2
          ? [category1]
          : category2 && !category1
          ? [category2]
          : stateDesire.category.length === 1
          ? [stateDesire.category[0].id]
          : [stateDesire.category[0].id, stateDesire.category[2].id],
        subcategory1 && subcategory2
          ? [subcategory1, subcategory2]
          : subcategory1 && !subcategory2
          ? [subcategory1]
          : subcategory2 && !subcategory1
          ? [subcategory2]
          : stateDesire.subcategory.length === 1
          ? [stateDesire.subcategory[0].id]
          : [stateDesire.subcategory[0].id, stateDesire.subcategory[2].id],
        region_id ? region_id : stateDesire.region_id,
        city_id ? city_id : stateDesire.city_id,
        is_active ? is_active : stateDesire.is_active
      );
    }
    setTimeout(() => setSubmitLoading(false), 3000);
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
    setLoadingCity(true);
    getCities(parseInt(e.target.value));
    setRegion_id(parseInt(e.target.value));
  };

  return (
    <div>
      {stateDesire ? (
        <>
          <span className={s.btn_back} onClick={router.back}>Назад</span>

          <h3 className={`mt-3 text-white`}>Редактировать желание</h3>
          {warning && (
            <div className="alert alert-danger" role="alert">
              {warning}
            </div>
          )}

          <form
            encType="multipart/form-data"
            onSubmit={submitHandler}
            className={`${s.update_form}`}
          >
            <div>
              <label htmlFor="header">Заголовок</label>
              <input
                className="form-control"
                type="text"
                name="header"
                id="header"
                maxLength={`50`}
                defaultValue={
                  stateDesire && stateDesire.header ? stateDesire.header : ""
                }
                onChange={(e) => {
                  if (inputValidateHandler(e, setWarning)) {
                    setHeader(e.target.value);
                  }
                }}
              />
              <label htmlFor="photo">Добавить фото</label>
              <div className={s.photo_inputs}>
                {[1, 2, 3, 4, 5, 6, 7, 8].map((ind) => (
                  <input
                    type="file"
                    key={ind}
                    name="photo"
                    id="photo"
                    onChange={(e) => {
                      JSON.parse(photo)
                        ? setPhoto([...JSON.parse(photo), e.target.files[0]])
                        : setPhoto([e.target.files[0]]);
                    }}
                  />
                ))}
              </div>
              <div>
                {stateDesire &&
                stateDesire.photo &&
                JSON.parse(stateDesire.photo).length ? (
                  <>
                    <legend className={`d-block`}>Удалить фото</legend>
                    <div className={s.photo_list}>
                      {JSON.parse(stateDesire.photo).map((p, i) => {
                        if (p) {
                          return (
                            <div key={i} className={`image-${i}`}>
                              <img src={p} alt={i} />
                              <span
                                className={s.btn_remove_photo}
                                onClick={() => {
                                  $(`.image-${i}`).hide();
                                  deleteDesirePhoto(stateDesire.id, p);
                                }}
                              >
                                X
                              </span>
                            </div>
                          );
                        }
                      })}
                    </div>
                  </>
                ) : null}
              </div>
              <label htmlFor="video">Видео</label>
              <input
                className="form-control"
                type="url"
                name="video"
                id="video"
                value={
                  stateDesire &&
                  stateDesire.video &&
                  stateDesire.video !== "null"
                    ? stateDesire.video
                    : ""
                }
                onChange={(e) => {
                  setStateDesire({ ...stateDesire, video: e.target.value });
                  setVideo(e.target.value);
                }}
              />
              <label htmlFor="description">Описание</label>
              <textarea
                className="form-control"
                name="description"
                rows={`10`}
                id="description"
                maxLength={`1000`}
                defaultValue={
                  stateDesire && stateDesire.description
                    ? stateDesire.description
                    : ""
                }
                onChange={(e) => {
                  if (inputValidateHandler(e, setWarning)) {
                    setDescription(e.target.value);
                  }
                }}
              />
            </div>
            <div>
              <label>Категория #1</label>
              {categories.length ? (
                <select
                  className="form-control"
                  onChange={(e) => category1Handler(e)}
                >
                  {stateDesire && stateDesire.category ? (
                    <option value={stateDesire.category[0].id} hidden>
                      {stateDesire.category[0].name}
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
                <div>
                  <SpinnerGrow color={`secondary`} />
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
                  {stateDesire && stateDesire.subcategory ? (
                    <option value={stateDesire.subcategory[0].id} hidden>
                      {stateDesire.subcategory[0].name}
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
                  <SpinnerGrow color={`secondary`} />
                </div>
              )}
              <label>Категория #2</label>
              {categories.length ? (
                <select
                  className="form-control"
                  onChange={(e) => category2Handler(e)}
                >
                  {stateDesire &&
                  stateDesire.category &&
                  stateDesire.category.length > 1 ? (
                    <option value={stateDesire.category[1].id} hidden>
                      {stateDesire.category[1].name}
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
                  <SpinnerGrow color={`secondary`} />
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
                  {stateDesire &&
                  stateDesire.subcategory &&
                  stateDesire.subcategory.length > 1 ? (
                    <option value={stateDesire.subcategory[1].id} hidden>
                      {stateDesire.subcategory[1].name}
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
                  <SpinnerGrow color={`secondary`} />
                </div>
              )}
              <label>Регион</label>
              {locations.length ? (
                <select
                  className="form-control"
                  onChange={(e) => locationSelectHandler(e)}
                >
                  {stateDesire && stateDesire.region ? (
                    <option value={stateDesire.region.id} hidden>
                      {stateDesire.region.name_ru}
                    </option>
                  ) : <option hidden></option>}
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
                  <SpinnerGrow color={`secondary`} />
                </div>
              )}
              <label>Город</label>
              {!loadingCity ? (
                <select
                  className="form-control"
                  onChange={(e) => setCity_id(e.target.value)}
                >
                  {stateDesire && stateDesire.city ? (
                    <option value={stateDesire.city.id} hidden>
                      {stateDesire.city.name_ru}
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
                  <SpinnerGrow color={`secondary`} />
                </div>
              )}
              <div className={s.types}>
                <legend>Состояние</legend>
                {types
                  ? types.map((type, i) => (
                      <label key={i} className={`mr-3`}>
                        <input
                          className={`mr-2`}
                          defaultChecked={
                            !!(
                              stateDesire &&
                              stateDesire.type &&
                              stateDesire.type.id === type.id
                            )
                          }
                          type="radio"
                          value={type.id}
                          onChange={(e) => {
                            setType_id(e.target.value);
                          }}
                          name="type"
                        />
                        {type.value}
                      </label>
                    ))
                  : null}
              </div>
              <div className={s.priorities}>
                <legend>Приоритет</legend>
                {priorities
                  ? priorities.map((priority, i) => (
                      <label key={i} className={`mr-3`}>
                        <input
                          className={`mr-2`}
                          defaultChecked={
                            !!(
                              stateDesire &&
                              stateDesire.priority &&
                              stateDesire.priority.id === priority.id
                            )
                          }
                          type="radio"
                          value={priority.id}
                          onChange={(e) => {
                            setPriority_id(e.target.value);
                          }}
                          name="priority"
                        />
                        {priority.value}
                      </label>
                    ))
                  : null}
              </div>
              <label htmlFor="price">Цена</label>
              <input
                className="form-control"
                type="number"
                name="price"
                id="price"
                min={`1`}
                max={`999999999999`}
                defaultValue={
                  stateDesire && stateDesire.price ? stateDesire.price : ""
                }
                onChange={(e) => {
                  setPrice(e.target.value);
                }}
              />
              <label>
                <input
                  type={`checkbox`}
                  onChange={() => {
                    if (stateDesire.is_active === 0) {
                      setIs_active(1);
                    } else {
                      setIs_active(0);
                    }
                  }}
                  defaultChecked={!!(stateDesire && stateDesire.is_active)}
                />
                Сделать активным
              </label>
              <div>
                {!submitLoading ? (
                  <button type="submit" className="btn btn-outline-primary mt-2">
                    Сохранить
                  </button>
                ) : (
                  <div className={`w-100 py-1`}>
                    <SpinnerGrow color={`secondary`} />
                  </div>
                )}
              </div>
            </div>
          </form>
        </>
      ) : (
        <div className={`w-100 py-5 text-center`}>
          <SpinnerGrow color={`secondary`} />
        </div>
      )}
    </div>
  );
}
