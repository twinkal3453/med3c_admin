import { API } from "../../backend";

// get all contacts
export const getApplications = (userId, token) => {
  return fetch(`${API}/apply/${userId}`, {
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

// get a product
export const getApplication = (applicationId, userId, token) => {
  return fetch(`${API}/apply/${applicationId}/${userId}`, {
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

// delete application
export const deleteApplication = (applicationId, userId, token) => {
  return fetch(`${API}/apply/${applicationId}/${userId}`, {
    method: "DELETE",
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
