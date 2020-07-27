import React, {useEffect, useState} from "react";
import {updateComplaint} from "../../redux/actions/adminActions";
import {getComplaintsInfo} from "../../redux/actions/userActions";
import {connect} from "react-redux";

function UpdateComplaintForm(props) {
    const [complaintText, setComplaintText] = useState(null);
    const [complaintType, setComplaintType] = useState(null);

    useEffect(() => {
        props.getComplaintsInfo();
    }, []);

    const setNewComplaint = () => {
        props.setShowToast(false);
        if (complaintText && complaintText.trim().length && complaintType) {
            props.updateComplaint(props.id, complaintText, complaintType, props.userId);
        } else {
            props.showAlert("Для отправки жалобы выберите тип и опишите проблему");
        }
    };

    return (
        <div>
            <h3> Изменить жалобу</h3>
            {props.complaintsInfo &&
            props.complaintsInfo.types &&
            props.complaintsInfo.types.length ? (
                <select onChange={(e) => setComplaintType(e.target.value)} className={`form-control`}>
                    <option value={`default`} hidden>
                        Тип жалобы
                    </option>
                    {props.complaintsInfo.types.map((type, i) => (
                        <option value={type.id} key={i}>
                            {type.value}
                        </option>
                    ))}
                </select>
            ) : null}
            <textarea className={`form-control`} onChange={e=>setComplaintText(e.target.value)} />
        </div>
    )
}

const mapStateToProps = state => ({
    complaintsInfo: state.admin.complaintsInfo
})
const mapDispatchToProps = {
    getComplaintsInfo,
    updateComplaint
}
export  default  connect(mapStateToProps, mapDispatchToProps)(UpdateComplaintForm)