import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import ComplaintItem from "./ComplaintItem";

function ComplainsList(props) {
  const [complaints, setComplaints] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (props.complaints) {
      setComplaints(props.complaints);
      setLoading(false);
    }
    setTimeout(() => setLoading(false), 5000);
  }, [props.complaints]);

  return (
    <div>
      <h2>Все жалобы</h2>
      {complaints && complaints.length ? (
        <ul className={`list-group`} style={{ listStyle: "none" }}>
          {complaints.map((c, i) => (
            <ComplaintItem
              complaints={complaints}
              setComplaints={setComplaints}
              complaint={c}
              key={i}
            />
          ))}
        </ul>
      ) : loading ? (
        <div className="spinner-border text-secondary" role="status">
          <span className="sr-only">Loading...</span>
        </div>
      ) : (
        <div>Жалоб нет</div>
      )}
    </div>
  );
}

const mapStateToProps = (state) => ({
  complaints: state.admin.allComplaints,
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(ComplainsList);
