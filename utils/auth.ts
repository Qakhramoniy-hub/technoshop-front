// --- UMUMIY EVENT DISPATCH FUNKSIYASI ---
const dispatchStorageEvent = () => {
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new Event('localStorageChange'));
  }
};

export const setToken = (token: string) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('access_token', token);
    dispatchStorageEvent();
  }
};

export const getToken = () => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('access_token');
  }
  return null;
};

export const removeToken = () => {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('access_token');
    localStorage.removeItem('user_info');
    dispatchStorageEvent();
  }
};

export const setUserInfo = (user: any) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('user_info', JSON.stringify(user));
    dispatchStorageEvent();
  }
};

export const getUserInfo = () => {
  if (typeof window !== 'undefined') {
    const user = localStorage.getItem('user_info');
    return user ? JSON.parse(user) : null;
  }
  return null;
};

export const isAuthenticated = () => {
  return !!getToken();
};

export const isAdmin = () => {
  const user = getUserInfo();
  return user?.isAdmin === true;
};

export const logout = () => {
  removeToken();
};
