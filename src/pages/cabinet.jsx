import {getMyComplaints} from "../redux/actions/userActions";
import MyComplaints from "../components/cabinet/MyComplaints";
import {connect} from "react-redux";
import {useEffect} from "react";
import {authenticationService} from "../_services/authentication.service";
import UpdateProfile from "../components/cabinet/UpdateProfile";

function Cabinet(props) {
    useEffect(() => {
        const user = authenticationService.currentUserValue
        if (user.token) {
            props.getMyComplaints(user.user.id)
        }
    }, [])

    return(
        <div>
            <MyComplaints
                myComplaints={props.myComplaints} />
                <UpdateProfile />
        </div>
    )
}

const mapStateToProps = state => ({
    myComplaints: state.user.myComplaints
})

const mapDispatchToProps = {
    getMyComplaints
}
export default connect(mapStateToProps, mapDispatchToProps)(Cabinet)
