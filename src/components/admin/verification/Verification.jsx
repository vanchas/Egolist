import React, {useEffect, useState} from "react";
import s from './verification.module.scss'
import VerificationRequestItem from "./VerificationRequestItem";
import VerifyExamplePhotos from "./VerifyExamplePhotos";
import {getUsersWhoSentFiles} from "../../../redux/actions/adminActions";
import {connect} from "react-redux";
import HttpRequest from "../../../_helpers/HttpRequest";
import {GET_USERS_WHO_SENT_FILES} from "../../../redux/actions/types";

function VerificationList(props) {
    const [stateUsers, setStateUsers] = useState(null)
    const [loading, setLoading] = useState(true)

    const fetchUsersWhoSentFiles = () => {
        HttpRequest.execute(`/admin/references`)
            .then(data => {
                setStateUsers(data)
            }).catch(err => console.error('Error: ', err));
    }

    useEffect(() => {
        fetchUsersWhoSentFiles()
        // props.getUsersWhoSentFiles()
        if (stateUsers && stateUsers.length) {
            setLoading(false)
            // setStateUsers(props.users)
        }
        setTimeout(() => setLoading(false), 5000)
    }, [props.users])

    return (
        <div className={s.verification_block}>
            <VerifyExamplePhotos />
            <div className={`h3 py-3 ${s.heading}`}>Заявки на верификацию</div>
            {stateUsers && stateUsers.length
                ? <ul className={s.users_list}>
                    {stateUsers.map((user, ind) => (
                        <VerificationRequestItem key={ind} user={user}/>
                    ))}
                </ul>
                : loading
                ?  <div className="spinner-border text-secondary" role="status">
                        <span className="sr-only">Loading...</span>
                    </div>
                    : <div>Активных заявок на верификацию нет</div>
            }
        </div>
    )
}

const mapStateToProps = state => ({
    // users: state.admin.usersWhoSentFileForVerification
})
const mapDispatchToProps = {
    // getUsersWhoSentFiles
}
export default connect(mapStateToProps, mapDispatchToProps)(VerificationList)
