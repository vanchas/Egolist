import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import s from "./big-slick-slider.module.scss";
import Placeholder from "../../assets/lot/placeholder-vertical.jpg";

export default function BigSimpleSlider({ photo }) {
  const [curr, setCurr] = useState(0)
  const [showPlaceholder, setShowPlaceholder] = useState(false);

  useEffect(() => {
    // console.log(photo);
  }, [])

  const settings = {
    dots: false,
    arrows: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    beforeChange: (oldIndex, newIndex) => setCurr(newIndex),
  };

  return (
    <div className={`h-100`}>
      <Slider {...settings}>
        {photo && !showPlaceholder ? (
          photo.map((p, i) => (
            <div className={s.item} key={i}>
              <img src={p} alt={``} onErrorCapture={() => setShowPlaceholder(true)} />
            </div>
          ))
        ) : (
          <img src={Placeholder} alt={``} />
        )}
      </Slider>

      <div className={s.dots}>
        {photo && photo.length > 1 ? photo.map((p, i) => (
          <span key={i} style={curr === i ? {opacity: 1} : {}} onClick={() => setCurr(i)}>&#x26AA;</span>
        )) : null}
      </div>
    </div>
  );
}
