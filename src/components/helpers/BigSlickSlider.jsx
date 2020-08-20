import React, { useRef, useState } from "react";
import Slider from "react-slick";
import s from "./big-slick-slider.module.scss";
import Placeholder from "../../assets/lot/placeholder-vertical.jpg";

export default function BigSimpleSlider({ photo, height }) {
  const [curr, setCurr] = useState(0);
  const slider = useRef();

  const settings = {
    dots: true,
    arrows: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    beforeChange: (oldIndex, newIndex) => setCurr(newIndex),
  };

  const dotClickHandler = (ind) => {
    slider.current.slickGoTo(ind);
    setCurr(ind);
  };

  const blockenImageHandler = (e) => {
    e.target.src = Placeholder;
  };

  return (
    <div>
      <Slider {...settings} ref={slider}>
        {photo && photo.length ? (
          photo.map((p, i) => (
            <div className={s.item} key={i} style={{ height }}>
              <img
                src={p}
                alt={``}
                onErrorCapture={blockenImageHandler}
                onError={blockenImageHandler}
              />
            </div>
          ))
        ) : (
          <div className={s.item}>
            <img src={Placeholder} alt={``} />
          </div>
        )}
      </Slider>

      <div className={s.dots}>
        {photo && photo.length > 1
          ? photo.map((p, i) => (
              <span
                key={i}
                style={curr === i ? { opacity: 1 } : {}}
                onClick={() => dotClickHandler(i)}
              >
                &#x26AA;
              </span>
            ))
          : null}
      </div>
    </div>
  );
}
