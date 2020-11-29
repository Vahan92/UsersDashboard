import * as types from "./types";
import axios from "axios";
import { message } from "antd";

const baseUrl = "https://brainstorm-interview-task.herokuapp.com";

export const fetchTotalUsers = () => (dispatch) => {
  fetch(`${baseUrl}/users`)
    .then((res) => res.json())
    .then((posts) =>
      dispatch({
        type: types.FETCH_ALL_USERS,
        payload: posts,
      })
    );
};

export const fetchRequiredUsers = (page, limit) => (dispatch) => {
  fetch(`${baseUrl}/users?_page=${page}&_limit=${limit}`)
    .then((res) => res.json())
    .then((posts) => {
      const result = posts.map((value) => {
        return Object.assign({}, value, { key: value.id });
      });
      dispatch({
        type: types.FETCH_REQUIRED_USERS,
        payload: result,
      });
    });
};

export const addUser = (user, page, limit) => (dispatch) => {
  user.photo = user.upload
    ? user.upload[0].response.url
    : "https://cdn190.picsart.com/232804661007900.png";
  (user.registeredDate = new Date()),
    (user.lastActiveDate = new Date()),
    delete user["upload"];
  axios
    .post(`${baseUrl}/users`, user)
    .then((res) => {
      dispatch(fetchRequiredUsers(page, limit));
      dispatch(fetchTotalUsers());
      dispatch({
        type: types.ADD_EDIT_USER,
        payload: [{}, ""],
      });
      message.success("User successfully added", 7);
    })
    .catch((error) => {
      message.error("Something went wrong", 7);
    });
};

export const editUser = (user, page, limit) => (dispatch) => {
  if (user.upload) {
    user.photo = user.upload[0].response.url;
  }
  delete user["upload"];
  axios
    .patch(`${baseUrl}/users/${user.id}`, user)
    .then((response) => {
      message.success("User information was successfully updated", 7);
      dispatch(fetchRequiredUsers(page, limit));
      dispatch({
        type: types.ADD_EDIT_USER,
        payload: [{}, ""],
      });
    })
    .catch(function (error) {
      if (error.response.status === 404) {
        message.error("There is not such a user", 7);
      }
      if (error.response.status === 400) {
        message.error(error.response.data, 7);
      }
    });
};

export const changeStatus = (user, value, page, limit) => (dispatch) => {
  axios
    .patch(`${baseUrl}/users/${user.id}`, { disabled: value })
    .then(function (response) {
      dispatch(fetchRequiredUsers(page, limit));
    })
    .catch(function (error) {
      if (error.response.status === 404) {
        message.error("There is not such a user", 7);
      }
      message.error(error.response.data, 7);
    });
};

export const deleteUser = (id, page, limit) => (dispatch) => {
  axios
    .delete(`${baseUrl}/users/${id}`, {})
    .then((res) => {
      message.success("User successfully deleted", 7);
      dispatch(fetchTotalUsers());
      dispatch(fetchRequiredUsers(page, limit));
    })
    .catch((error) => {
      if (error.response.status === 404) {
        message.error("There is not such a user", 7);
      }
    });
};

export const getUser = (user, openForm) => (dispatch) => {
  dispatch({
    type: types.ADD_EDIT_USER,
    payload: [user, openForm],
  });
};
