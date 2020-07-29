import React, { useEffect, useState } from "react";
import { authenticationService } from "../../_services/authentication.service";

export default function () {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const userData = authenticationService.currentUserValue;
    if (userData.user) {
      setUser(userData.user);
    }
  }, []);

  return (
    <div>
      {user && user.active ? (
        <div>
          Статус: <span className={`text-success`}>Верифицирован</span>
        </div>
      ) : (
        <div>
          Статус: <span className={`text-danger`}>Не верифицирован</span>
        </div>
      )}

      {user && user.activation_token_sms && user.activation_token_email ? (
        <div className="alert alert-danger" role="alert">
          У вас не подтвержден номер телефона и емейл. Пожалуйста сделайте это,
          чтобы пользоваться всеми возможностями EGOLIST
        </div>
      ) : user && user.activation_token_sms && !user.activation_token_email ? (
        <div className="alert alert-danger" role="alert">
          У вас не подтвержден номер телефона. Пожалуйста сделайте это, чтобы
          пользоваться всеми возможностями EGOLIST
        </div>
      ) : (
        <div className="alert alert-danger" role="alert">
          У вас не подтвержден номер емейл. Пожалуйста сделайте это, чтобы
          пользоваться всеми возможностями EGOLIST
        </div>
      )}
    </div>
  );
}
