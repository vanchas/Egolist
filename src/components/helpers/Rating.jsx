import React, { useState, useEffect } from 'react'

export default function Rating({ rating }) {
  const [ratingObj, setRatingObj] = useState({
    star1: false, star2: false, star3: false, star4: false, star5: false
  })

  useEffect(() => {
    if (rating < 21) {
      setRatingObj({ ...ratingObj, star1: true })
    } else if (rating > 20 && rating < 41) {
      setRatingObj({ ...ratingObj, star1: true, star2: true, star3: false, star4: false, star5: false })
    } else if (rating > 40 && rating < 61) {
      setRatingObj({ ...ratingObj, star1: true, star2: true, star3: true })
    } else if (rating > 60 && rating < 81) {
      setRatingObj({ ...ratingObj, star1: true, star2: true, star3: true, star4: true })
    } else if (rating > 80) {
      setRatingObj({ star1: true, star2: true, star3: true, star4: true, star5: true })
    }
  }, [rating])

  return (
    <div className="text-center">
      {Object.entries(ratingObj).map(([key, val], i) => (
        val ?
            <span key={i}>&#x2605;</span>
            : <span key={i}>&#x2606;</span>
      ))}
    </div>
  )
}
