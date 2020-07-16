import React, {useEffect, useState} from 'react'
import s from './offers-for-me.module.scss'
import OfferForMeItem from './OfferForMeItem';
import fetch from "isomorphic-unfetch";
import {authenticationService} from "../../_services/authentication.service";

export default function OffersForMe({ locations, desireId: desire_id }) {
    const [loading, setLoading] = useState(true)
    const [offersForCurrentDesire, setOffersForCurrentDesire] = useState(null)

    useEffect(() => {
        const user = authenticationService.currentUserValue;
        (async function loadData() {
            await fetch(`https://egolist.padilo.pro/api/filter_offer`, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                    'Authorization': `${user.token_type} ${user.token}`
                },
                body: JSON.stringify({desire_id})
            }).then(res => res.json())
            .then(data => {
                setLoading(false)
                setOffersForCurrentDesire(data)
            }).catch(err => {
                setLoading(false)
                console.error('Error: ', err)
            });
        })()
        setTimeout(() => setLoading(false), 10000)
    }, [])

    const sortOffersByDesireId = async (id, sortValue) => {
        const user = authenticationService.currentUserValue;
        const response = await fetch(
            `https://egolist.padilo.pro/api/sort_offers/${id}`,
            {
                method: "POST",
                headers: {
                    "Access-Control-Allow-Origin": "*",
                    "Content-Type": "application/json",
                    "Authorization": `${user.token_type} ${user.token}`,
                },
                body: JSON.stringify({ search_by: sortValue }),
            }
        );
        const promise = response.json();
        return promise
            .then((data) => {
                setLoading(false)
                setOffersForCurrentDesire(data)
            })
            .catch((err) => {
                setLoading(false)
                console.error("Error: ", err)
            });
    };

  return (
    <div className={s.blue_list}>
      <div className={s.blue_list_sort}>
        <span>Сортировка</span>
        <select onChange={e => sortOffersByDesireId(desire_id, e.target.value)}>
          <option value="default" hidden>По рейтингу</option>
          <option value="rating+">Рейтинг от меньшего</option>
          <option value="rating-">Рейтинг от большего</option>
          <option value="price+">Цена от меньшей</option>
          <option value="price-">Цена от большей</option>
        </select>
      </div>

      <div className={s.blue_list_items}>
        {offersForCurrentDesire && offersForCurrentDesire.length
          ? <ul>{offersForCurrentDesire.map((offer, i) => (
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
