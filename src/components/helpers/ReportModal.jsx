import React, {useEffect, useState} from 'react'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'
import {connect} from "react-redux";
import {addComplaint, getComplaintsInfo} from "../../redux/actions/userActions";
import {showAlert} from "../../redux/actions/appActions";
import Success from "./Success";
import Alert from "./Alert";

const ModalReport = (props) => {
    const [complaintText, setComplaintText] = useState(null)
    const [complaintType, setComplaintType] = useState(null)

    useEffect(() => {
        props.getComplaintsInfo()
    }, [])

    const [modal, setModal] = useState(false)

    const toggle = () => setModal(!modal)

    const setNewComplaint = () => {
        props.setShowToast(false)
        if (complaintText && complaintText.trim().length && complaintType) {
            props.addComplaint(complaintText,complaintType, props.userId)
            toggle()
        } else {
            alert('Для отправки жалобы выберите тип и опишите проблему')
            props.showAlert('Для отправки жалобы выберите тип и опишите проблему')
        }
    }

    return (
        <div>
            <span className={`p-0 bg-none`} onClick={toggle}>Пожаловаться</span>
            <Modal isOpen={modal} toggle={toggle}>
                <ModalHeader toggle={toggle}>Заполните форму жалобы</ModalHeader>
                <ModalBody>
                    {props.success && <Success />}
                    {props.alert && <Alert />}
                    {props.complaintsInfo && props.complaintsInfo.types && props.complaintsInfo.types.length
                    ? <select onChange={e=>setComplaintType(e.target.value)}>
                            <option value={`default`} hidden>Тип жалобы</option>
                            {props.complaintsInfo.types.map((type, i) => (
                                <option value={type.id} key={i}>{type.value}</option>
                            ))}
                        </select> : null}
                        <textarea className={`form-control`} onChange={e=>setComplaintText(e.target.value)} />
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={setNewComplaint}>Отправить</Button>{' '}
                    <Button color="secondary" onClick={toggle}>Отменить</Button>
                </ModalFooter>
            </Modal>
        </div>
    )
}

const  mapStateToProps = state => ({
    complaintsInfo: state.user.complaintsInfo,
    success: state.app.success,
    alert: state.app.alert
})

const mapDispatchToProps = {
    addComplaint,
    getComplaintsInfo,
    showAlert
}
export default connect(mapStateToProps,  mapDispatchToProps)(ModalReport)