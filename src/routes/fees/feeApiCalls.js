import { API } from "../../backend";
import axios from "axios";

// Create fees a university
export const createFees = (userId, token, fee, universityId) => {
  return axios
    .post(`${API}fee/${universityId}/${userId}`, fee, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
    .then(function (response) {
      return response;
    })
    .catch(function (error) {
      return error;
    });
};

// get All fees
export const getFees = (universityId) => {
  return fetch(`${API}fee/${universityId}`, {
    method: "GET",
    headers: {
      "Content-type": "application/json",
    },
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

// // update fees a university
export const updateFee = (userId, token, fee, universityId) => {
  return axios
    .put(`${API}fee/${universityId}/${userId}`, fee, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
    .then(function (response) {
      return response;
    })
    .catch(function (error) {
      return error;
    });
};

// delete fee
export const deleteFee = (universityId, userId, token) => {
  return fetch(`${API}fee/${universityId}/${userId}`, {
    method: "DELETE",
    headers: {
      "Content-type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};
