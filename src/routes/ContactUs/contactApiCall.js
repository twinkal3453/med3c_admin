import { API } from "../../backend";

// get all Contacts
export const getContacts = (userId, token) => {
  // console.log(token);
  return fetch(`${API}/contacts/${userId}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-type": "application/json",
    },
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

// get a contact
export const getContact = (contactUsId, userId, token) => {
  return fetch(`${API}/contact/${contactUsId}/${userId}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-type": "application/json",
    },
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

// delete contact
export const deleteContact = (contactUsId, userId, token) => {
  return fetch(`${API}/contact/${contactUsId}/${userId}`, {
    method: "DELETE",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};
