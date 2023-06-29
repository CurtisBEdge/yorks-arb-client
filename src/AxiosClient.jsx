import { useState } from "react";
import { useNavigate } from "react-router-dom";

import axios from "axios";
import { isEmpty } from "lodash";

import App from "./App";
import AppContext from "./context";

const AxiosClient = () => {
  const baseUrl =
    !process.env.NODE_ENV || process.env.NODE_ENV === "development"
      ? "http://localhost:8080/api"
      : "";

  const storeToken = localStorage.getItem('token')
  const [token, setToken] = useState(storeToken);
  const storeUser = localStorage.getItem('user')
  const [user, setUser] = useState(storeUser);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [sign, setSign] = useState(undefined);
  const navigate = useNavigate();
  const [signs, setSigns] = useState([]);

  const apiCall = ({ method, url, data, ...rest }) => axios({
    method,
    url: `${baseUrl}${url}`,
    data,
    headers: {
      authorization: !isEmpty(token) ? `Bearer ${token}` : null,
    },
    ...rest,
  }).catch((error) => {
    if (error.response.status === 401) {
      setToken(undefined);
      localStorage.removeItem('token')
      localStorage.removeItem('user')
      throw error;
    } else {
      throw error
    }
  });

  const login = ({ username, password }) => apiCall({
    method: 'post',
    url: "/auth/login",
    auth: { username, password },
  })
    .then(processUserDetails)

  const processUserDetails = ({ data }) => {
    setToken(data.token)
    setUser(data.user.username)
    localStorage.setItem('token', data.token)
    localStorage.setItem('user', data.user.username)
  }

  const changePassword = (formValues) => apiCall({
    method: 'patch',
    url: '/auth/editPassword',
    data: formValues,
  })

  const logout = () => {
    setToken(undefined);
    setIsLoggedIn(false);
    navigate("/")
    localStorage.removeItem('token')
    localStorage.removeItem('user')
  }

  const signup = (signupFormValues) => apiCall({
    method: 'post',
    url: '/auth/signup',
    data: signupFormValues,
  })

  const createSign = (formData) => apiCall({
    method: 'post',
    url: '/signs',
    data: formData,
    headers: {
      "content-type": "multipart/form-data",
      authorization: !isEmpty(token) ? `Bearer ${token}` : null,
    }
  })

  const editSign = (formData, signId) => apiCall({
    method: 'patch',
    url: `/signs/${signId}`,
    data: formData,
    headers: {
      "content-type": "multipart/form-data",
      authorization: !isEmpty(token) ? `Bearer ${token}` : null,
    }
  })

  const getSign = (id) => apiCall ({
    method:"get",
    url:`/signs/get/${id}`
  }).then((response) => {
    setSign(response.data);
    return Promise.resolve(response);
  });

  const getSigns= () => apiCall ({
    method:"get",
    url:`/signs/get`
  }).then(({data}) => setSigns(data));

  const deleteSign = (id) => apiCall({
    method: 'delete',
    url: `/signs/${id}`
  }).then(() => getSigns())
    .catch(() => getSigns())

  const client = {
    apiCall,
    login,
    signup,
    logout,
    changePassword,
    getSign,
    getSigns,
    deleteSign,
    createSign,
    editSign
  };

  return (
    <AppContext.Provider
      value={{
        client,
        baseUrl,
        token,
        setToken,
        isLoggedIn,
        setIsLoggedIn,
        user,
        setUser,
        sign,
        setSign,
        signs,
        logout,
        setSigns,
      }}
    >
      <App/>
    </AppContext.Provider>
  );
};

export default AxiosClient;
