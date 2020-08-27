import React, { useState, useEffect } from "react";
import s from "./add-form.module.scss";
import inputValidateHandler from "../../utils/FieldsValidator";
import Router from "next/router";
import { Upload } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import SpinnerGrow from "../helpers/SpinnerGrow"

export default function CreateDesireForm({
  desiresInfo,
  createDesire,
  showAlert,
  categories,
  subcategories,
  getSubcategories,
  locations,
  cities,
  getCities,
  currentGeoPosition,
}) {
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState("");
  const [photos, setPhotos] = useState([]);
  const [video, setVideo] = useState("");
  const [description, setDescription] = useState("");
  const [category1, setCategory1] = useState(null);
  const [category2, setCategory2] = useState(null);
  const [subcategory1, setSubcategory1] = useState(null);
  const [subcategory2, setSubcategory2] = useState(null);
  const [condition, setCondition] = useState("");
  const [price, setPrice] = useState("");
  const [priority, setPriority] = useState("");
  const [region, setRegion] = useState("");
  const [city, setCity] = useState("");
  const [isActive, setIsActive] = useState(0);
  const [currentGeoRegion, setCurrGeoRegion] = useState(null);
  const [showSubSelect1, setShowSubSelect1] = useState(false);
  const [showSubSelect2, setShowSubSelect2] = useState(false);
  const [subcat1Loading, setSubcat1Loading] = useState(false);
  const [subcat2Loading, setSubcat2Loading] = useState(false);
  const [regionLoading, setRegionLoading] = useState(false);
  const [warning, setWarning] = useState(null);
  const [previewVisible, setPreviewVisible] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [previewTitle, setPreviewTitle] = useState("");

  const submitHandler = (e) => {
    e.preventDefault();
    if (videoValidator(video)) {
      if (
        title.trim().length &&
        description.trim().length &&
        category1 &&
        subcategory1 &&
        price > 0
      ) {
        setLoading(true);
        createDesire(
          photos,
          video,
          description,
          title,
          price,
          priority,
          condition,
          [category1 ? category1.id : null, category2 ? category2.id : null],
          [
            subcategory1 ? subcategory1.id : null,
            subcategory2 ? subcategory2.id : null,
          ],
          region,
          city ? city : cities[0].id,
          isActive
        );
        setTitle("");
        setPhotos([]);
        setVideo("");
        setDescription("");
        setCategory1(null);
        setCategory2(null);
        setSubcategory1(null);
        setSubcategory2(null);
        setCondition("");
        setPrice("");
        setPriority("");
        setIsActive(1);
        setTimeout(() => setLoading(false), 2000);
      } else {
        showAlert("Bce поля должны быть заполнены");
      }
    }
  };

  useEffect(() => {
    setTimeout(() => setWarning(null), 10000);
    if (
      location.length &&
      currentGeoPosition &&
      currentGeoPosition.region_rus
    ) {
      locations.map((loc) => {
        if (
          loc.name_ru.toLowerCase() ===
          currentGeoPosition.region_rus.toLowerCase()
        ) {
          setCurrGeoRegion(loc);
          getCities(loc.id);
        }
      });
    }
  }, [warning]);

  const videoValidator = (videoValue) => {
    const regExp = /^(https:\/\/www\.)?youtube\.com\/[aA-zZ0-9\/+*.$^?=&-]*$/m;
    if (!videoValue || videoValue === "null" || videoValue.match(regExp)) {
      return true;
    } else {
      return false;
    }
    return false;
  };

  const category1Handler = (category) => {
    setSubcat1Loading(true);
    setCategory1(JSON.parse(category));
    getSubcategories(JSON.parse(category).id);
    setShowSubSelect1(true);
  };
  const category2Handler = (category) => {
    setSubcat2Loading(true);
    getSubcategories(JSON.parse(category).id);
    setCategory2(JSON.parse(category));
    setShowSubSelect2(true);
  };

  const locationSelectHandler = (e) => {
    setRegionLoading(true);
    setRegion(e.target.value);
    getCities(e.target.value);
  };

  const getBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };

  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
    setPreviewVisible(true);
    setPreviewTitle(
      file.name || file.url.substring(file.url.lastIndexOf("/") + 1)
    );
  };

  const handleChange = ({ fileList }) => setPhotos(fileList);

  const uploadButton = (
    <div>
      <PlusOutlined />
      <div className="ant-upload-text">Загрузить</div>
    </div>
  );

  return (
    <div className={s.add_lot_form}>
      {warning && (
        <div className="alert alert-danger" role="alert">
          {warning}
        </div>
      )}

      <span className={s.btn_back} onClick={Router.back}>Назад</span>
      <h3>Создание желания</h3>
      <form onSubmit={submitHandler}>
        <div>
          <label>Заголовок *</label>
          <input
            name={`header`}
            maxLength={`50`}
            type="text"
            value={title}
            required
            className="form-control"
            onChange={(e) => {
              if (inputValidateHandler(e, setWarning)) setTitle(e.target.value);
            }}
          />
          <div>Фото</div>
          <Upload
            action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
            listType="picture-card"
            fileList={photos}
            onPreview={handlePreview}
            onChange={handleChange}
          >
            {photos.length >= 8 ? null : uploadButton}
          </Upload>
          {/*{[1, 2, 3, 4, 5, 6, 7, 8].map((input, i) => (*/}
          {/*  <label key={i}>*/}
          {/*    <input*/}
          {/*      type="file"*/}
          {/*      onChange={(e) => {*/}
          {/*        setPhotos([...photos, e.target.files[0]])*/}
          {/*      }}*/}
          {/*    />*/}
          {/*  </label>*/}
          {/*))}*/}
          <label htmlFor="video">Видео (YouTube)</label>
          <input
            type="url"
            value={video}
            placeholder="https:// ...."
            id="video"
            className="form-control"
            onChange={(e) => setVideo(e.target.value)}
          />
          <label>Описание *</label>
          <textarea
            name={`description`}
            maxLength={`1000`}
            required
            value={description}
            className="form-control"
            rows="10"
            onChange={(e) => {
              if (inputValidateHandler(e, setWarning))
                setDescription(e.target.value);
            }}
          />
        </div>
        <div>
          <fieldset>
            <legend>Выберите категорию *</legend>
            {!categories.length ? (
              <SpinnerGrow color="secondary" />
            ) : category1 ? (
              <div>
                Выбрана категория {category1.name}
                <span
                  className={`btn btn-danger ml-2 px-1 py-0`}
                  onClick={() => {
                    setCategory1(null);
                    setSubcategory1(null);
                    setShowSubSelect1(false);
                  }}
                >
                  X
                </span>
              </div>
            ) : (
              <select
                required
                className="form-control"
                onChange={(e) => category1Handler(e.target.value)}
              >
                <option value="default" hidden>
                  первая категория *
                </option>
                {categories && categories.length
                  ? categories.map((c, i) => (
                      <option key={i} value={JSON.stringify(c)}>
                        {c.name}
                      </option>
                    ))
                  : null}
              </select>
            )}
            {subcat1Loading && !subcategories.length ? (
              <SpinnerGrow color="secondary" />
            ) : (
              showSubSelect1 &&
              (subcategory1 ? (
                <div>
                  Выбрана подкатегория {subcategory1.name}{" "}
                  <span
                    className={`btn btn-danger ml-2 px-1 py-0`}
                    onClick={() => setSubcategory1(null)}
                  >
                    X
                  </span>
                </div>
              ) : (
                <select
                  required
                  className="form-control"
                  onChange={(e) => setSubcategory1(JSON.parse(e.target.value))}
                >
                  <option value="default" hidden>
                    первая подкатегория *
                  </option>
                  {subcategories && subcategories.length
                    ? subcategories.map((s, i) => (
                        <option key={i} value={JSON.stringify(s)}>
                          {s.name}
                        </option>
                      ))
                    : null}
                </select>
              ))
            )}
            <br />
            {!categories.length ? (
              <SpinnerGrow color="secondary" />
            ) : category2 ? (
              <div>
                Выбрана категория {category2.name}{" "}
                <span
                  className={`btn btn-danger ml-2 px-1 py-0`}
                  onClick={() => {
                    setCategory2(null);
                    setSubcategory2(null);
                    setShowSubSelect2(false);
                  }}
                >
                  X
                </span>
              </div>
            ) : (
              <select
                className="form-control"
                onChange={(e) => category2Handler(e.target.value)}
              >
                <option value="default" hidden>
                  вторая категория
                </option>
                {categories && categories.length
                  ? categories.map((c, i) => (
                      <option key={i} value={JSON.stringify(c)}>
                        {c.name}
                      </option>
                    ))
                  : null}
              </select>
            )}
            {subcat2Loading && !subcategories.length ? (
              <SpinnerGrow color="secondary" />
            ) : (
              showSubSelect2 &&
              (subcategory2 ? (
                <div>
                  Выбрана подкатегория {subcategory2.name}{" "}
                  <span
                    className={`btn btn-danger ml-2 px-1 py-0`}
                    onClick={() => setSubcategory2(null)}
                  >
                    X
                  </span>
                </div>
              ) : (
                <select
                  className="form-control"
                  onChange={(e) => setSubcategory2(JSON.parse(e.target.value))}
                >
                  <option value="default" hidden>
                    вторая подкатегория
                  </option>
                  {subcategories && subcategories.length
                    ? subcategories.map((s, i) => (
                        <option key={i} value={JSON.stringify(s)}>
                          {s.name}
                        </option>
                      ))
                    : null}
                </select>
              ))
            )}
          </fieldset>
          {/* LOCATIONS */}
          <fieldset>
            <legend>Выберите область *</legend>
            {!locations.length ? (
              <SpinnerGrow color="secondary" />
            ) : (
              <select
                required
                className="form-control"
                onChange={(e) => locationSelectHandler(e)}
              >
                <option value="default" hidden>
                  Область *
                </option>
                {locations && locations.length
                  ? locations.map((c, i) => {
                      if (currentGeoRegion && currentGeoRegion.id === c.id) {
                        return (
                          <option selected key={i} value={c.id}>
                            {c.name_ru}
                          </option>
                        );
                      }
                      return (
                        <option key={i} value={c.id}>
                          {c.name_ru}
                        </option>
                      );
                    })
                  : null}
              </select>
            )}
            {regionLoading && !cities.length ? (
              <SpinnerGrow color="secondary" />
            ) : (
              <select
                required
                className="form-control"
                onChange={(e) => setCity(e.target.value)}
              >
                <option value="default" hidden>
                  Город *
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
          <div className={s.condition_fieldset}>
            <legend>Состояние *</legend>
            {desiresInfo.types && desiresInfo.types.length ? (
              desiresInfo.types.map((t, i) => (
                <label key={i}>
                  {t.value}
                  <input
                    type="radio"
                    name="condition"
                    value={t.id}
                    onChange={(e) => setCondition(e.target.value)}
                  />
                </label>
              ))
            ) : (
              <SpinnerGrow color="secondary" />
            )}
          </div>
          <label htmlFor="price">Цена *</label>
          <input
            name={`price`}
            type="number"
            min={`1`}
            max={`999999999999`}
            maxLength={12}
            id="price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="form-control"
            required
          />
          <label htmlFor="priority">Приоритет *</label>
          {!desiresInfo.priorities || !desiresInfo.priorities.length ? (
            <SpinnerGrow color="secondary" />
          ) : (
            <select
              id="priority"
              required
              onChange={(e) => setPriority(e.target.value)}
              className="form-control"
            >
              <option value="default" hidden/>
              {desiresInfo.priorities && desiresInfo.priorities.length
                ? desiresInfo.priorities.map((p, i) => (
                    <option key={i} value={p.id}>
                      {p.value}
                    </option>
                  ))
                : null}
            </select>
          )}
          <label>
            <input
              type="checkbox"
              onChange={() => {
                if (isActive) {
                  setIsActive(0);
                } else setIsActive(1);
              }}
            />
            Сделать активным
          </label>
          <div className="d-flex">
            <button type="submit" className="ml-2 btn btn-secondary">
              Опубликовать
            </button>
            {loading && (
              <div className="text-center py-2 pl-4">
                <SpinnerGrow color="secondary" />
              </div>
            )}
          </div>
        </div>
      </form>
    </div>
  );
}
