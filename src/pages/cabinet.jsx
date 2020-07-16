import {getMyComplaints} from "../redux/actions/userActions";
import {getCities} from "../redux/actions/actions";
import MyComplaints from "../components/cabinet/MyComplaints";
import {connect} from "react-redux";
import {useEffect} from "react";
import {authenticationService} from "../_services/authentication.service";
import UpdateProfile from "../components/cabinet/UpdateProfile";
import Success from "../components/helpers/Success";
import Alert from "../components/helpers/Alert";

function Cabinet(props) {
    useEffect(() => {
        const user = authenticationService.currentUserValue
        if (user.token) {
            props.getMyComplaints(user.user.id)
        }
    }, [])

    return(
        <div>
            {props.success && <Success />}
            {props.alert && <Alert />}
            <MyComplaints
                myComplaints={props.myComplaints} />
                <UpdateProfile />
        </div>
    )
}

const mapStateToProps = state => ({
    myComplaints: state.user.myComplaints,
    success: state.app.success,
    alert: state.app.alert
})

const mapDispatchToProps = {
    getMyComplaints,
    getCities
}
export default connect(mapStateToProps, mapDispatchToProps)(Cabinet)
