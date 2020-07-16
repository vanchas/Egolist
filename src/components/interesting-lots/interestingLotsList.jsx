import React, { useState, useEffect } from 'react'
import InterestingLot from './InterestingLot';
import s from './interesting-lots.module.scss'
import SignNew from '../../assets/lot/sign-new.png'
import fetch from "isomorphic-unfetch";
import {authenticationService} from "../../_services/authentication.service";

export default function InterestingLotsList({ offerId }) {
  const [loading, setLoading] = useState(true)
  const [interestingLots, setInterestingLots] = useState(null)

  useEffect(() => {
    const user = authenticationService.currentUserValue;
    (async function loadData() {
      return await fetch(
          `https://egolist.padilo.pro/api/desires/interesting_for/${offerId}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `${user.token_type} ${user.token}`,
            },
          }
      ).then(res => res.json())
      .then(data => {
        setLoading(false)
        setInterestingLots(data)
      }).catch(err => {
        setLoading(false)
        console.error(err)
      })
    })()

    setTimeout(() => setLoading(false), 10000);
  }, []);

  return (
    <div className={`interesting-lots-list ${s.interesting_lots_list}`}>
      {interestingLots && interestingLots.length
        ? <>
          <ul >
            <img src={SignNew} alt="" className={s.interesting_img} />
            {interestingLots.map((desire, i) => (
              <li key={i}><InterestingLot desire={desire} /></li>
            ))}
          </ul>
          {/*<div className={s.interesting_lots_list_control}>*/}
          {/*  <span>ВЫБРАТЬ</span>*/}
          {/*  <span>ОТПРАВИТЬ</span>*/}
          {/*  <span></span>*/}
          {/*  <span>ПОКАЗАТЬ ЕЩЕ</span>*/}
          {/*</div>*/}
        </>
        : <>
          {loading && <div className="text-center py-4">
            <div className="spinner-border text-primary" role="status">
              <span className="sr-only">Loading...</span>
            </div>
          </div>}
          {!loading && <div className="text-center h5 py-5">Нет интересных желаний к этому предложению...</div>}
        </>}

    </div>
  )
}
