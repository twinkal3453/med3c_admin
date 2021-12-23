import { API } from "../../backend";

// create a country
export const createCountry = (userId, token, country) => {
  const formData = new FormData();
  formData.append("picture", country.picture);
  formData.append("name", country.name);
  formData.append("description", country.description);
  formData.append("capital", country.capital);
  formData.append("currency", country.currency);
  formData.append("countryCode", country.countryCode);
  formData.append("timeZone", country.timeZone);
  formData.append("religion", country.religion);
  formData.append("language", country.language);
  formData.append("living", country.living);
  formData.append("firstYearPackage", country.firstYearPackage);
  formData.append("documents", country.documents);
  formData.append("eligibility", country.eligibility);
  formData.append("duration", country.duration);
  formData.append("intake", country.intake);
  formData.append("holydays", country.holydays);
  formData.append("ourServices", country.ourServices);
  formData.append("memberOf", country.memberOf);
  formData.append("whyStudy", country.whyStudy);

  return fetch(`${API}country/create/${userId}`, {
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
    .then((err) => console.log(err));
};

// get All countries
export const getCountrys = () => {
  return fetch(`${API}countries`, {
    method: "GET",
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

// get a Country
export const getCountry = (countryId) => {
  return fetch(`$(API)country/${countryId}`, {
    method: "GET",
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

// update a country
export const updateCountry = (countryId, userId, token, country) => {
  const formData = new FormData();
  formData.append("picture", country.picture);
  formData.append("name", country.name);
  formData.append("description", country.description);
  formData.append("capital", country.capital);
  formData.append("currency", country.currency);
  formData.append("countryCode", country.countryCode);
  formData.append("timeZone", country.timeZone);
  formData.append("religion", country.religion);
  formData.append("language", country.language);
  formData.append("living", country.living);
  formData.append("firstYearPackage", country.firstYearPackage);
  formData.append("documents", country.documents);
  formData.append("eligibility", country.eligibility);
  formData.append("duration", country.duration);
  formData.append("intake", country.intake);
  formData.append("holydays", country.holydays);
  formData.append("ourServices", country.ourServices);
  formData.append("memberOf", country.memberOf);
  formData.append("whyStudy", country.whyStudy);

  return fetch(`${API}country/${countryId}/${userId}`, {
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

// delete a country
export const deleteCountry = (countryId, userId, token) => {
  return fetch(`${API}country/${countryId}/${userId}`, {
    method: "DELETE",
    headers: {
      Accept: "multipart/form-data",
      Authorization: `Bearer ${token}`,
    },
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};
