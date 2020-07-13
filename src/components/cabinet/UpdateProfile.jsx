import { connect } from "react-redux";
import {useState} from "react";
import {updateUserInfo} from "../../redux/actions/userActions";
import {authenticationService} from "../../_services/authentication.service";

function UpdateProfile(props) {
    const [name, setName] = useState(null)
    const [secondName, setSecondName] = useState(null)
    const [email, setEmail] = useState(null)
    const [phone, setPhone] = useState(null)
    const [telegram, setTelegram] = useState(null)
    const [viber, setViber] = useState(null)
    const [whatsapp, setWhatsapp] = useState(null)
    const [site, setSite] = useState(null)
    const [avatar, setAvatar] = useState(null)
    const [regionId, setRegionId] = useState(null)

    const submitHandler = (e) => {
       e.preventDefault()
        const user = authenticationService.currentUserValue.user
        props.updateUserInfo(
            name ? name : user.name,
            secondName ? secondName : user.second_name,
            email ? email : user.email,
            phone ? phone : user.phone,
            telegram ? telegram : user.telegram,
            viber ? viber : user.viber,
            whatsapp ? whatsapp : user.whatsapp,
            site ? site : user.site,
            avatar ? avatar : user.avatar,
            regionId ? regionId : user.region_id,
        )
    }

  return (
    <div>
     <h3> Редактировать информацию о пользователе</h3>
      <form encType={`multipart/form-data`} onSubmit={submitHandler} style={{display: 'grid'}}>
        <label>
          Имя
          <input type={`text`} onChange={e=>setName(e.target.value)} className={`form-control`} />
        </label>
        <label>
          Фамилия
          <input type={`text`} onChange={e=>setSecondName(e.target.value)} className={`form-control`} />
        </label>
        <label>
          Емейл
          <input type={`email`} onChange={e=>setEmail(e.target.value)} className={`form-control`} />
        </label>
        <label>
          Телефон
          <input type={`text`} onChange={e=>setPhone(e.target.value)} className={`form-control`} />
        </label>
        <label>
          Телеграм
          <input type={`text`} onChange={e=>setTelegram(e.target.value)} className={`form-control`}/>
        </label>
        <label>
          Вайбер
          <input type={`text`} onChange={e=>setViber(e.target.value)} className={`form-control`}/>
        </label>
        <label>
          WhatsApp
          <input type={`text`} onChange={e=>setWhatsapp(e.target.value)} className={`form-control`}/>
        </label>
        <label>
          Веб сайт
          <input type={`url`} onChange={e=>setSite(e.target.value)} className={`form-control`}/>
        </label>
        <label>
          Фото
          <input type={`file`} onChange={e=>setAvatar(e.target.files[0])} />
        </label>
          <label>
              Регион
              <select onChange={e=>setRegionId(e.target.value)} className={`form-control`}>
                  <option hidden value={`default`}></option>
                  {props.locations && props.locations.length
                  ? props.locations.map((loc, i) => (
                      <option key={i} value={loc.id}>{loc.name_ru}</option>
                      ))
                      : null}
              </select>
          </label>
          <div>
              <button className={`btn btn-primary`} type="submit">Сохранить</button>
          </div>
      </form>
    </div>
  );
}

const mapStateToProps = (state) => ({
    locations: state.app.locations
});

const mapDispatchToProps = {
    updateUserInfo
};
export default connect(mapStateToProps, mapDispatchToProps)(UpdateProfile);
