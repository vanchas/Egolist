import React, { useEffect, useState, useRef } from 'react'
import s from './carousel.module.scss'
import { useRouter } from 'next/router'

export default function Carousel({ photo, video, desireId }) {
    const router = useRouter()
    const [array, setArray] = useState(null)
    const [index, setIndex] = useState(0)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        new Promise(res => {
            let data = null
            res(data)
        }).then(data => {
            if (photo && video && photo.length && video.length) {
                return data = photo.concat(video)
            } else if (!photo && video) {
                return data = [video]
            } else if (!video && photo) {
                return data = photo
            } else if (!video && !photo) {
                return data = null
            }
            return data
        }).then(data => {
            if (data && data.length && data.length > 1) {
                return data = data.filter(i => i != null)
            }
            return data
        }).then(data => {
            data.sort((x, y) => {
                return x.includes('https://www.youtube.com')
                    ? -1
                    : y.includes('https://www.youtube.com')
                        ? 1
                        : 0;
            });
            return data
        }).then(data => setArray(data))
            .catch(err => console.error('Error: ', err))
    }, [])

    const changeSlide = (e, x) => {
        e.preventDefault()
        if (x === 1) {
            if (index === array.length - 1) {
                setIndex(0)
            } else {
                setIndex(index + x)
            }
        } else {
            if (index === 0) {
                setIndex(array.length - 1)
            } else {
                setIndex(index + x)
            }
        }
    }

    return (
        <>
            {array && array.length
                ? <>
                    {array.length > 1 &&
                    <span className={s.arrow_back}
                          onClick={(e) => changeSlide(e, -1)}>&#x2770;</span>}

                    <div className={s.carousel}>
                        {array[index].includes('https://www.youtube.com')
                            ? <>
                                {loading &&
                                <div className={s.spinner}>
                                    <div className="spinner-border text-primary" role="status">
                                        <span className="sr-only">Loading...</span>
                                    </div></div>}
                                <iframe src={array[index]}
                                        frameBorder="0"
                                        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                                        allowFullScreen
                                        width="100%"
                                        style={loading ? { opacity: 0 } : {}}
                                        onLoad={() => setLoading(false)} />
                            </>
                            : <img src={array[index]} alt="" />}
                    </div>

                    {array.length > 1 &&
                    <span className={s.arrow_forvard}
                          onClick={(e) => changeSlide(e, 1)}>&#x2771;</span>}
                </> : null}
        </>
    )
}
