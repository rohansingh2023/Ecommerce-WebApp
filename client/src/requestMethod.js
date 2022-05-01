import axios from "axios";

const BASE_URL = "http://localhost:5000/api";
// const TOKEN = JSON.parse(localStorage.getItem("auth")).token;
const user = JSON.parse(localStorage.getItem("persist:root"))?.user;
const currentUser = user && JSON.parse(user).currentUser;
const TOKEN = currentUser?.accessToken;

// const TOKEN =
//   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxNDQ3NzhiMmE2YWZmNDYyZGExYjE1NSIsImlzQWRtaW4iOnRydWUsImlhdCI6MTYzMzQzMjgyMSwiZXhwIjoxNjMzNjkyMDIxfQ.n6ZSIR9UBgHTX33VlH6NyOZSYgyCbnRx2RRkXe4j88U";

export const publicRequest = axios.create({
  baseURL: BASE_URL,
});

export const userRequest = axios.create({
  baseURL: BASE_URL,
  headers: {
    token: `Bearer ${TOKEN}`,
  },
});
