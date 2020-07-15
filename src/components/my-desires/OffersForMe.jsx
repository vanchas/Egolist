import React, {useEffect, useState} from 'react'
import s from './offers-for-me.module.scss'
import OfferForMeItem from './OfferForMeItem';
import {useDispatch} from "react-redux";
// import {SORT_OFFERS_BY_DESIRE_ID} from "../../redux/actions/types";

export default function OffersForMe({ offers, locations, sortOffersByDesireId, desireId }) {
    const [loading, setLoading] = useState(true)
// const dispatch = useDispatch()

    useEffect(() => {
        // dispatch({type: SORT_OFFERS_BY_DESIRE_ID, payload: []})
        if (offers && offers.length) setLoading(false)
        setTimeout(() => setLoading(false), 5000)
    }, [offers])

  return (
    <div className={s.blue_list}>
      <div className={s.blue_list_sort}>
        <span>Сортировка</span>
        <select onChange={e => sortOffersByDesireId(desireId, e.target.value)}>
          <option value="default" hidden>По рейтингу</option>
          <option value="rating+">Рейтинг от большего</option>
          <option value="rating-">Рейтинг от меньшего</option>
          <option value="price+">Цена от большей</option>
          <option value="price-">Цена от меньшей</option>
        </select>
      </div>

      <div className={s.blue_list_items}>
        {offers && offers.length
          ? <ul>{offers.map((offer, i) => (
            <li key={i}>
              <OfferForMeItem
                offer={offer}
                locations={locations}
              />
            </li>
          ))}</ul>
          : <div className={`text-center py-5`}>
                {loading ? (
                    <div className="spinner-border text-primary" role="status">
                        <span className="sr-only">Loading...</span>
                    </div>
                ) : (
                    <div className="py-5 h5 text-center">
                        К данному желанию нет интересных предложений...
                    </div>
                )}
            </div>
        }
      </div>
    </div>
  )
}
