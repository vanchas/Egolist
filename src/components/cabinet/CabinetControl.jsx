import React from 'react'
import MyComplaints from "./MyComplaints";
import UpdateProfile from "./UpdateProfile";
import s from "./cabinet.module.scss";
import Verification from "./Verification";

export default function (props) {

    const changeVisibleComponent = (ref) => {
        if (ref === "complaints") {
            props.setActiveBtn("complaints");
            props.setVisibleComponent(<MyComplaints myComplaints={props.myComplaints} />);
        } else if (ref === "update info") {
            props.setActiveBtn("update info");
            props.setVisibleComponent(<UpdateProfile />);
        } else if (ref === "verification") {
            props.setActiveBtn("verification");
            props.setVisibleComponent(<Verification />);
        }
    };

    return (
        <div className={`py-3 ${s.cabinet_control_buttons}`}>
            <span
                className={`btn m-1 ${
                    props.activeBtn === "update info" ? "btn-outline-secondary" : "btn-outline-dark"
                }`}
                onClick={() => changeVisibleComponent("complaints")}
            >
              Мои жалобы
            </span>
            <span
                className={`btn m-1 ${
                    props.activeBtn === "complaints" ? "btn-outline-secondary" : "btn-outline-dark"
                }`}
                onClick={() => changeVisibleComponent("update info")}
            >
              Редактировать информацию о себе
            </span>
            <span
                className={`btn m-1 ${
                    props.activeBtn === "verification" ? "btn-outline-secondary" : "btn-outline-dark"
                }`}
                onClick={() => changeVisibleComponent("verification")}
            >
              Верификация
            </span>
        </div>
    )
}