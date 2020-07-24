import React, {useEffect, useState} from "react";
import UserItem from "./UserItem";
import UpdateUserForm from "./UpdateUserForm";
import ListSort from "./ListSort";

const users = [
  { id: 1, name: "Василий Петрович" },
  { id: 2, name: "Галина Леонидовна" },
  { id: 3, name: "Алла Пугачева" },
];

export default function (props) {
  const [userToUpdate, setUserToUpdate] = useState(null);
  const [usersArray, setUsersArray] = useState(null);

  useEffect(() => {
    if (users && users.length) {
      setUsersArray(users)
    }
  }, [])

  return (
    <>
      {usersArray && usersArray.length ? (
        <>
          {!userToUpdate ? (
            <>
              <div className={`h3 my-3`}>Список всех пользователей</div>
              <ListSort />
              <ul>
                {usersArray.map((user, ind) => (
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
      ) : (
        <div className={`py-5 text-center h2`}>
          Нет ни одного зарегистрированного пользовалетя
        </div>
      )}
    </>
  );
}
