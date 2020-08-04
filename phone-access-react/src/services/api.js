const BACKEND_DOMAIN = process.env.REACT_APP_SKIPLI_ACCESS_DOMAIN;

const headers = () => {
  return {
    "Content-Type": "application/json",
    Accept: "application/json"
  };
};

const getPhoneNumber = (phoneNumber) => {
    const pN = { phoneNumber }
    return fetch(`${BACKEND_DOMAIN}/phone`, {
        method: "POST",
        headers: headers(),
        body: JSON.stringify(pN)
    }).then(resp => resp.json())
    .catch( err => console.log("catch err here", err));
};

const validateCode = (phoneNumber, accessCode) => {
    const data = { phoneNumber, accessCode }
    return fetch(`${BACKEND_DOMAIN}/access`, {
        method: "POST",
        headers: headers(),
        body: JSON.stringify(data)
    }).then(resp => resp.json());
};


export const api = {
    getPhoneNumber,
    validateCode
};