const ACCESS_TOKEN_KEY = "access_token";

export const storeToken = (accessToken: string) => {
  if (typeof window !== "undefined") {
    localStorage.setItem(ACCESS_TOKEN_KEY, accessToken);
  }
};

export const getToken = (): string | null => {
  if (typeof window !== "undefined") {
    return localStorage.getItem(ACCESS_TOKEN_KEY);
  }
  return null;
};

export const removeToken = () => {
  if (typeof window !== "undefined") {
    localStorage.removeItem(ACCESS_TOKEN_KEY);
  }
};
