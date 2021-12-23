import { API } from "../../backend";

// create a Slider
export const createSlider = (userId, token, slider) => {
  // console.log(slider);
  const formData = new FormData();
  formData.append("photo", slider.photo);

  return fetch(`${API}slider/create/${userId}`, {
    method: "POST",
    headers: {
      Accept: "multipart/form-data",
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  })
    .then((response) => {
      return response.json();
    })
    .then((err) => console.log(err));
};

// get All Sliders
export const getSliders = () => {
  return fetch(`${API}/sliders`, {
    method: "GET",
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

// delete a country
export const deleteSlider = (sliderId, userId, token) => {
  return fetch(`${API}/slider/${sliderId}/${userId}`, {
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
