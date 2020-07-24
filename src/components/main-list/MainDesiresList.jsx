import React, {useEffect, useState} from 'react'
import s from './desires-list.module.scss'
import MainDesiresListLot from './MainDesiresListLot';
import Success from '../helpers/Success'
import {addComplaint} from "../../redux/actions/userActions";

export default function MainDesiresList({ desires, hideShowDesire, addDesireToFavorites, success, addComplaint }) {
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        if (desires && desires.length) {
            setLoading(false)
        } else setLoading(true)
        setTimeout(() => setLoading(false), 5000)
    }, [desires])

  return (
    <div className={s.main_list_wrap}>
      <div className={s.main_list}>
        <div className={s.success_alert}>
        </div>
        {desires && desires.length
          ? <ul>{desires.map((des, i) => (
            <li key={i}>
              <MainDesiresListLot
                  addComplaint={addComplaint}
                success={success}
                addDesireToFavorites={addDesireToFavorites}
                hideShowDesire={hideShowDesire}
                desire={des} />
            </li>
          ))}</ul>
          : <div className={`text-center py-5`}>
                {loading ? (
                    <div className="spinner-border text-primary" role="status">
                        <span className="sr-only">Loading...</span>
                    </div>
                ) : (
                    <div className="py-5 h5 text-center">
                        Нет активных желаний...
                    </div>
                )}
            </div>}
      </div>
    </div>
  )
}
