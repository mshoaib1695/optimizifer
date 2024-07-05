// const API_URL_AUTH = process.env.NEXT_PUBLIC_BASE_API_URL + "auth/";
// const API_URL_PAYMENT = process.env.NEXT_PUBLIC_BASE_API_URL + "payment/";
// const API_URL_COMPRESS = process.env.NEXT_PUBLIC_BASE_API_URL + "compressify/";
const API_URL_AUTH =  "https://auth-api-stage.compressify.io/";
const API_URL_PAYMENT ="https://payment-api-stage.compressify.io/";
const API_URL_COMPRESS = "https://api-stage.compressify.io/";

export const pngApi = async (formData, headers ) => {
  const response = await fetch(`${API_URL_COMPRESS}compress/png`, {
    method: "POST",
    body: formData,
    headers: headers
  });

  return response;
};
export const jpgApi = async (formData, headers ) => {
  const response = await fetch(`${API_URL_COMPRESS}compress/jpg`, {
    method: "POST",
    body: formData,
    headers: headers

  });

  return response;
};
export const webpApi = async (formData, headers) => {
  const response = await fetch(`${API_URL_COMPRESS}compress/webp`, {
    method: "POST",
    body: formData,
    headers: headers
  });

  return response;
};

export const getConfigs = async () => {
  const response = await fetch(`${API_URL_COMPRESS}config/COMPRESSIFY`, {
    method: "GET",
  });

  return response;
};

export const pdfApi = async (formData, headers ) => {
  const response = await fetch(`${API_URL_COMPRESS}compress/pdf`, {
    method: "POST",
    body: formData,
    headers: headers

  });
  return response;
};

export const signIn = async (payload) => {
  const response = await fetch(`${API_URL_AUTH}api/auth/signin`, {
    method: "POST",
    body: JSON.stringify(payload),
    headers: {
      "Content-Type": "application/json",
    },
  });

  return response;
};

export const signUp = async (payload) => {
  const response = await fetch(`${API_URL_AUTH}api/auth/signup`, {
    method: "POST",
    body: JSON.stringify(payload),
    headers: {
      "Content-Type": "application/json",
    },
  });

  return response;
};

export const forgotPassword = async (payload) => {
  const response = await fetch(`${API_URL_AUTH}api/auth/forgot-password`, {
    method: "POST",
    body: JSON.stringify(payload),
    headers: {
      "Content-Type": "application/json",
    },
  });

  return response;
};

export const updatePassword = async (payload) => {
  const response = await fetch(`${API_URL_AUTH}api/auth/update-password`, {
    method: "PATCH",
    body: JSON.stringify({
      confirmPassword: payload.confirmPassword,
      password: payload.password,
    }),
    headers: {
      "Content-Type": "application/json",
      authorization: "Bearer " + payload.token,
    },
  });

  return response;
};

export const resetPassword = async (payload) => {
  const response = await fetch(
    `${API_URL_AUTH}api/auth/reset-password/${payload.token}`,
    {
      method: "POST",
      body: JSON.stringify({
        confirmPassword: payload.confirmPassword,
        password: payload.password,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  return response;
};

export const verifyEmail = async (payload) => {
  const response = await fetch(`${API_URL_AUTH}api/auth/verification`, {
    method: "PATCH",
    body: JSON.stringify({
      token: payload.token,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  return response;
};

export const getUserDetails = async (payload) => {
  const response = await fetch(`${API_URL_AUTH}api/auth/me/`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      authorization: "Bearer " + payload.token,
    },
  });

  return response;
};

export const createSession = async (payload) => {
  const response = await fetch(
    `${API_URL_PAYMENT}api/session/create-session?sessionType=${payload.sessionType}&planType=${payload.planType}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: "Bearer " + payload.token,
      },
    }
  );

  return response;
};
