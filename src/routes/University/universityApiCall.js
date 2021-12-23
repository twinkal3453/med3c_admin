import { API } from "../../backend";

// create a university
export const createUniversity = (userId, token, university, countryId) => {
  const formData = new FormData();
  formData.append("picture", university.picture);
  formData.append("name", university.name);
  formData.append("facts", university.facts);
  formData.append("description", university.description);
  formData.append("awards", university.awards);
  formData.append("achievements", university.achievements);
  formData.append("affiliatedBy", university.affiliatedBy);
  formData.append("recent", university.recent);
  formData.append("climate", university.climate);
  formData.append("why", university.why);
  formData.append("nowDays", university.nowDays);
  formData.append("figures", university.figures);
  formData.append("faculties", university.faculties);
  formData.append("trainingFields", university.trainingFields);
  formData.append("general", university.general);
  formData.append("duration", university.duration);
  console.log(formData);

  return fetch(`${API}university/create/${countryId}/${userId}`, {
    method: "POST",
    headers: {
      Accept: "mulitpart/form-data",
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

// get All universities
export const getUniversities = (userId, token) => {
  return fetch(`${API}universities/${userId}`, {
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

// get a University
export const getUniversity = (universityId, token) => {
  return fetch(`$(API)university/${universityId}`, {
    method: "GET",
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

// update a University
export const updateUniversity = (universityId, userId, token, university) => {
  const formData = new FormData();
  formData.append("picture", university.picture);
  formData.append("name", university.name);
  formData.append("facts", university.facts);
  formData.append("description", university.description);
  formData.append("awards", university.awards);
  formData.append("achievements", university.achievements);
  formData.append("affiliatedBy", university.affiliatedBy);
  formData.append("recent", university.recent);
  formData.append("climate", university.climate);
  formData.append("why", university.why);
  formData.append("nowDays", university.nowDays);
  formData.append("figures", university.figures);
  formData.append("faculties", university.faculties);
  formData.append("trainingFields", university.trainingFields);
  formData.append("general", university.general);
  formData.append("duration", university.duration);
  // console.log(formData);

  return fetch(`${API}university/${universityId}/${userId}`, {
    method: "PUT",
    headers: {
      Accept: "mulitpart/form-data",
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

// delete a country
export const deleteUniversity = (universityId, userId, token) => {
  return fetch(`${API}university/${universityId}/${userId}`, {
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
