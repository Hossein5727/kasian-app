export const getToken = (setNewToken, token) => {
  const tokenData = JSON.parse(sessionStorage.getItem("formData"));
  if (tokenData) {
    setNewToken(tokenData);
  }

  return token;
};
