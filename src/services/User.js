import axios from "axios";
const APIURL = process.env.REACT_APP_API_URL||'http://localhost:8000';

const register = (username, email, password) => {
  return axios.post(`${APIURL}/signup`, {
    username,
    email,
    password
  })
};

const signin = async (username, password) => {
  const res = await axios.post(`${APIURL}/signin`, {
    username,
    password
  });

  if (res.data.accessToken) {
    localStorage.setItem("user", JSON.stringify(res.data));
  }
  return res.data;
}
const signOut = async () => {
  localStorage.removeItem("user");
}
const getCurrentUser = () => {

  return JSON.parse(localStorage.getItem("user"));
}

const getUserToken = () => {
  const user = getCurrentUser();
  return user&&user.accessToken;
}

const User = {
  register,
  signin,
  getCurrentUser,
  getUserToken,
  signOut
};

export default User;