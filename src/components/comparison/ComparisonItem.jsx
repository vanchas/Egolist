import React from "react";
import Carousel from "../helpers/Carousel";
import Link from "next/link";
import s from "./comparison.module.scss";
import Location from "../../assets/sidebar/Location.png";
import Rating from "../helpers/Rating";
import Heart from "../../assets/header/Heart.png";
import { connect } from "react-redux";

import { SortableElement } from "react-sortable-hoc";
import {
  addOfferToFavorites,
  removeOfferFromComparison,
} from "../../redux/actions/userActions";
import { authenticationService } from "../../_services/authentication.service";

const ComparisonItem = SortableElement((props) => {
  return (
    props.offer && (
      <li className={`shadow ${s.list_item}`}>
        <div className={s.image_block}>
          {props.offer.photo || props.offer.video ? (
            <Carousel
              desireId={props.offer.desire_id}
              photo={JSON.parse(props.offer.photo)}
              video={props.offer.video}
            />
          ) : (
            <Link href={`/desire?id=${props.offer.desire_id}`}>
              <a className={`w-100 h-100`} />
            </Link>
          )}
        </div>
        <div className={s.content_block}>
          <h6 className={`h4`}>
            <b>{props.offer.header}</b>
          </h6>
          <div>
            Цена: {props.offer.price} грн
            <span>
              <Rating rating={props.offer.rating} />
            </span>
          </div>
          <p className={`m-0`}>Описание: {props.offer.description}</p>
          <div>
            <img src={Location} alt="" className={s.location_img} />
            {props.offer.region.name_ru}{" "}
            {props.offer.city && props.offer.city.name_ru !== "Не важно"
              ? ", " + props.offer.city.name_ru
              : null}
          </div>
        </div>
        <span
          className={s.remove_btn}
          onClick={() => props.removeOfferFromComparison(props.offer.id)}
        >
          X
        </span>
        {authenticationService.currentUserValue &&
        authenticationService.currentUserValue.token &&
        authenticationService.currentUserValue.user.id !==
          props.offer.user_id ? (
          <span
            className={s.favorite_btn}
            onClick={() => props.addOfferToFavorites(props.offer.id)}
          >
            <img src={Heart} alt="" />
          </span>
        ) : null}
      </li>
    )
  );
});

const mapStateToProps = (state) => ({});
const mapDispatchToProps = {
  addOfferToFavorites,
  removeOfferFromComparison,
};
export default connect(mapStateToProps, mapDispatchToProps)(ComparisonItem);
