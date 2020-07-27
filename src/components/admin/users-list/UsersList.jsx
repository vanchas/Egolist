import React, { useEffect, useState } from "react";
import UserItem from "./UserItem";
import UpdateUserForm from "./UpdateUserForm";
import { getAllUsers } from "../../../redux/actions/adminActions";
import ListSort from "./ListSort";
import s from "./update.module.scss";
import { connect } from "react-redux";
import HttpRequest from "../../../_helpers/HttpRequest";

function UsersWhoSentFilesForVerification(props) {
  const [userToUpdate, setUserToUpdate] = useState(null);
  const [loading, setLoading] = useState(true);
  const [allUsers, setAllUsers] = useState(null);

  const fetchAllUsers = () => {
    HttpRequest.execute(`/admin/users`)
        .then(data => {
          setAllUsers(data.data)
        }).catch(err => console.error(err));
  }

  const searchHandler = (e, search) => {
    e.preventDefault()
      setLoading(true)
    HttpRequest.execute(`/admin/users/${search}`)
        .then(data => {
          setAllUsers(data.data)
        }).catch(err => console.error(err));
  }

  const sortHandler = (id) => {
      setLoading(true)
      HttpRequest.execute(`admin/users/sort/${id}`)
          .then(data => {
              setAllUsers(data.data)
          }).catch(err => console.error(err));
  }

  useEffect(() => {
    // props.getAllUsers()
    fetchAllUsers()
    setTimeout(() => setLoading(false), 5000)
  }, []);

  return (
    <>
      <ListSort
          searchHandler={searchHandler}
          sortHandler={sortHandler}
      />
      {allUsers && allUsers.length ? (
        <>
          {!userToUpdate ? (
            <>
              <div className={`h3 my-3`}>Список всех пользователей</div>
              <ul className={s.users_list}>
                {allUsers.map((user, ind) => (
                  <UserItem
                    key={ind}
                    user={user}
                    setUserToUpdate={setUserToUpdate}
                  />
                ))}
              </ul>
            </>
          ) : (
            <UpdateUserForm
              user={userToUpdate}
              setUserToUpdate={setUserToUpdate}
            />
          )}
        </>
      ) : loading ? (
        <div className={`py-5 text-center h2`}>Загрузка...</div>
      ) : (
        <div className={`py-5 text-center h2`}>
          Нет ни одного зарегистрированного пользовалетя
        </div>
      )}
    </>
  );
}

const mapStateToProps = (state) => ({
  users: state.admin.allUsers,
});
const mapDispatchToProps = {
  getAllUsers,
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UsersWhoSentFilesForVerification);
