import React, { useEffect, useState } from "react";
import UserItem from "./UserItem";
import UpdateUserForm from "./UpdateUserForm";
import { getAllUsers, searchAllUsers, sortAllUsersList } from "../../../redux/actions/adminActions";
import ListSort from "./ListSort";
import s from "./update.module.scss";
import { connect } from "react-redux";
import Pagination from "../../helpers/Pagination";

function UsersWhoSentFilesForVerification(props) {
  const [userToUpdate, setUserToUpdate] = useState(null);
  const [loading, setLoading] = useState(true);
  const [allUsers, setAllUsers] = useState(null);
  const [lastPage, setLastPage] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);

  const searchHandler = (e, search) => {
    e.preventDefault();
    setAllUsers(null);
    setLoading(true);
    props.searchAllUsers(search)
  };

  const sortHandler = (id) => {
    setAllUsers(null);
    setLoading(true);
    props.sortAllUsersList(id)
  };

  const paginationClickHandler = (page) => {
    if (page === "next") {
        if (currentPage < lastPage) {
          props.getAllUsers(currentPage + 1)
        }
    } else if (page === "prev") {
        if (currentPage !== 1) {
          props.getAllUsers(currentPage - 1)
        }
    } else {
        if (currentPage !== page) {
          props.getAllUsers(page)
        }
    }
  };

  useEffect(() => {
    if (props.users) {
      setCurrentPage(props.users.current_page);
      setLastPage(props.users.last_page);
      setAllUsers(props.users.data);
    } else {
      props.getAllUsers(1)
    }
    setTimeout(() => setLoading(false), 5000);
  }, [props.users]);

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
  searchAllUsers,
  sortAllUsersList
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UsersWhoSentFilesForVerification);
