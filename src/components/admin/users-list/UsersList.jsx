import React, { useEffect, useState } from "react";
import UserItem from "./UserItem";
import UpdateUserForm from "./UpdateUserForm";
import { getAllUsers } from "../../../redux/actions/adminActions";
import { showAlert } from "../../../redux/actions/appActions";
import ListSort from "./ListSort";
import s from "./update.module.scss";
import { connect, useDispatch } from "react-redux";
import HttpRequest from "../../../_helpers/HttpRequest";
import Pagination from "../../helpers/Pagination";

function UsersWhoSentFilesForVerification(props) {
  const [userToUpdate, setUserToUpdate] = useState(null);
  const [loading, setLoading] = useState(true);
  const [allUsers, setAllUsers] = useState(null);
  const [lastPage, setLastPage] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const dispatch = useDispatch();

  const fetchAllUsers = (page) => {
    HttpRequest.execute(`/admin/users?page=${page}`)
      .then((data) => {
        setCurrentPage(data.current_page);
        setLastPage(data.last_page);
        setAllUsers(data.data);
      })
      .catch((err) => console.error(err));
  };

  const searchHandler = (e, search) => {
    e.preventDefault();
    setAllUsers(null);
    setLoading(true);
    HttpRequest.execute(`/admin/users/${search.length ? search : "~search~"}`)
      .then((data) => {
        setCurrentPage(data.current_page);
        setLastPage(data.last_page);
        setAllUsers(data.data);
      })
      .catch((err) => console.error(err));
  };

  const sortHandler = (id) => {
    setAllUsers(null);
    setLoading(true);
    HttpRequest.execute(`/admin/users/sort/${id}`)
      .then((data) => {
        setCurrentPage(data.current_page);
        setLastPage(data.last_page);
        setAllUsers(data.data);
      })
      .catch((err) => dispatch(showAlert(err.message)));
  };

  const paginationClickHandler = (page) => {
    if (page === "next") {
        if (currentPage < lastPage) {
            fetchAllUsers(currentPage + 1)
        }
    } else if (page === "prev") {
        if (currentPage !== 1) {
            fetchAllUsers(currentPage - 1)
        }
    } else {
        if (currentPage !== page) {
            fetchAllUsers(page)
        }
    }
  };

  useEffect(() => {
    // props.getAllUsers()
    fetchAllUsers(1);
    setTimeout(() => setLoading(false), 5000);
  }, []);

  return (
    <>
      <ListSort searchHandler={searchHandler} sortHandler={sortHandler} />
      {allUsers && allUsers.length ? (
        <>
          {!userToUpdate ? (
            <>
              <div className={`h3 my-3`}>Список всех пользователей</div>
                <Pagination
                    handler={paginationClickHandler}
                    current={currentPage}
                    array={Array.from({length: lastPage})}
                />
              <ul className={s.users_list}>
                {allUsers.map((user, ind) => (
                  <UserItem
                    key={ind}
                    user={user}
                    setUserToUpdate={setUserToUpdate}
                  />
                ))}
              </ul>
                <Pagination
                    handler={paginationClickHandler}
                    current={currentPage}
                    array={Array.from({length: lastPage})}
                />
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
  showAlert,
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UsersWhoSentFilesForVerification);
