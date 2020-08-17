import React, { useEffect, useState } from "react";
import { authenticationService } from "../../_services/authentication.service";

export default function () {
  const [user, setUser] = useState(null);
  const [warning, setWarning] = useState('');

  useEffect(() => {
    const userData = authenticationService.currentUserValue;
    if (userData.user) {
      setUser(userData.user);
      warningMessageHandler(userData.user);
    }
  }, []);

  const warningMessageHandler = (userData) => {
    if (userData.activation_token_sms && userData.activation_token_email) {
      setWarning('У вас не подтвержден номер телефона и емейл. Пожалуйста сделайте это, чтобы пользоваться всеми возможностями EGOLIST')
    } else if (userData.activation_token_sms && !userData.activation_token_email) {
      setWarning('У вас не подтвержден номер телефона. Пожалуйста сделайте это, чтобы пользоваться всеми возможностями EGOLIST')
    } else if (!userData.activation_token_sms && userData.activation_token_email) {
      setWarning('У вас не подтвержден емейл. Пожалуйста, сделайте это, чтобы пользоваться всеми возможностями EGOLIST')
    } else {
      setWarning(null)
    }
  };

  return (
    <div className={`text-white`}>
      {user && user.active ? (
        <div>
          Статус: <span className={`text-success`}>Верифицирован</span>
        </div>
      ) : (
        <div>
          Статус: <span className={`text-danger`}>Не верифицирован</span>
        </div>
      )}

      {warning && (
        <div className="alert alert-danger" role="alert">
          {warning}
        </div>
      )}
    </div>
  );
}
