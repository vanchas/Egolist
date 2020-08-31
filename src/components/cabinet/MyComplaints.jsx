import React, {useEffect, useState} from "react";

export default function MyComplaints(props) {
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        if (props.myComplaints) setLoading(false)
        setTimeout(() => setLoading(false), 10000)
    }, [props.myComplaints])

  return (
    <div className={`text-white`}>
      <h3 className={`text-white text-center`}>Мои Жалобы</h3>
      {props.myComplaints && props.myComplaints.length ? (
        <ul>
          {props.myComplaints.map((c, i) => (
            <li key={i}>{c.complaint}</li>
          ))}
        </ul>
      ) : loading
          ? <div className="spinner-border text-primary" role="status">
              <span className="sr-only">Loading...</span>
          </div>
          : <div>Жалоб нет</div>}
    </div>
  );
}
