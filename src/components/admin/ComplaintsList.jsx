import React, {useEffect, useState} from "react";
import UpdateComplaint from "./UpdateComplaint";
import {deleteComplaint,getAllComplaints, updateComplaint} from "../../redux/actions/adminActions";
import {getComplaintsInfo} from "../../redux/actions/userActions";
import {connect} from "react-redux";
import HttpRequest from "../../_helpers/HttpRequest";

function ComplainsList(props) {
    const [complaints, setComplaints] = useState(null)

    const fetchComplaints = () => {
        HttpRequest.execute(`/complaints`)
            .then(data => {
                if (!data.message) {
                    setComplaints(data)
                }
            }).catch(err => console.error(err));
    }

    useEffect(() => {
        fetchComplaints()
    }, [])

    return(
        <div>
            <h2>Все жалобы</h2>
            {complaints && complaints.length ? (
                <ul>
                    {complaints.map((c, i) => (
                        <li key={i}>{c.complaint}
                        <button className={`btn btn-danger`} onClick={()=>props.deleteComplaint(c.id)}>X</button>
                        <UpdateComplaint id={c.id} />
                        </li>
                    ))}
                </ul>
            ) : (
                <div>Жалоб нет</div>
            )}
            {/*complaint: "что-то не так"*/}
            {/*complaint_to_id: 2*/}
            {/*created_at: "2020-07-13T13:42:12.000000Z"*/}
            {/*id: 4*/}
            {/*status_id: 1*/}
            {/*type_id: 5*/}
            {/*updated_at: "2020-07-13T13:42:13.000000Z"*/}
            {/*user_id: 20*/}
        </div>
    )
}

const mapStateToProps = (state) => ({
    complaints: state.admin.allComplaints,
    complaintsInfo: state.user.complaintsInfo,
});

const mapDispatchToProps = {
    getAllComplaints,
    getComplaintsInfo,
    updateComplaint,
    deleteComplaint,
};

export default connect(mapStateToProps, mapDispatchToProps)(ComplainsList);
