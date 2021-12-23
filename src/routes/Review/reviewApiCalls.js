import { API } from "../../backend";

// create a review
export const createReview = (userId, token, review) => {
  const formData = new FormData();
  formData.append("photo", review.photo);
  formData.append("name", review.name);
  formData.append("address", review.address);
  formData.append("content", review.content);

  return fetch(`${API}review/create/${userId}`, {
    method: "POST",
    headers: {
      Accept: "multipart/form-data",
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  })
    .then((response) => {
      // console.log(response);
      return response.json();
    })
    .then((err) => console.log(err));
};

// get All reviews
export const getReviews = () => {
  return fetch(`${API}/reviews`, {
    method: "GET",
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

// update a review
export const updateReview = (reviewId, userId, token, review) => {
  const formData = new FormData();
  formData.append("photo", review.photo);
  formData.append("name", review.name);
  formData.append("address", review.address);
  formData.append("content", review.content);

  return fetch(`${API}review/${reviewId}/${userId}`, {
    method: "PUT",
    headers: {
      Accept: "multipart/form-data",
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

// delete a review
export const deleteReview = (reviewId, userId, token) => {
  return fetch(`${API}/review/${reviewId}/${userId}`, {
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
