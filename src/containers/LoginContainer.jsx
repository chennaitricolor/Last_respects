import React, { useEffect, useState } from 'react';
import { LoginComponent } from '../components/LoginComponent';
import { useDispatch, useSelector } from 'react-redux';
import { actionTypes } from '../utils/actionTypes';

export const LoginContainer = () => {
  const [loginDetails, setLoginDetails] = useState({
    userId: '',
    password: '',
    showPassword: false,
  });

  const dispatch = useDispatch();
  const getLoginResponse = useSelector((state) => state.loginResponse);

  useEffect(() => {}, [getLoginResponse]);

  const handleOnChange = (event, id, type) => {
    if (type === 'text') {
      setLoginDetails({
        ...loginDetails,
        [id]: event.target.value,
      });
    }
  };

  const handleClickShowPassword = () => {
    setLoginDetails({
      ...loginDetails,
      showPassword: !loginDetails.showPassword,
    });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleLogin = () => {
    dispatch({
      type: actionTypes.INITIATE_LOGIN,
      payload: {
        name: loginDetails.userId,
        password: loginDetails.password,
      },
    });
  };

  return (
    <div style={{ height: '100%' }}>
      <LoginComponent
        loginDetails={loginDetails}
        handleOnChange={handleOnChange}
        handleLogin={handleLogin}
        getLoginResponse={getLoginResponse}
        handleClickShowPassword={handleClickShowPassword}
        handleMouseDownPassword={handleMouseDownPassword}
      />
    </div>
  );
};

export default LoginContainer;
