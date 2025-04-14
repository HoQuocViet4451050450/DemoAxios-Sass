// api-url.ts
export const API_URL = 'http://localhost:5005/api';

export const URLS = {
  PHONGBAN: {
    GET_ALL: `${API_URL}/departments`,
    CREATE: `${API_URL}/department/create`,
    DELETE: (id: number) => `${API_URL}/department/delete/${id}`,
  },
  NGUOIDUNG: {
    GET_ALL: `${API_URL}/users`,
    CREATE: `${API_URL}/user/create`,
    DELETE: (id: number) => `${API_URL}/user/delete/${id}`,
    UPDATE: (id: number) => `${API_URL}/user/update/${id}`,
    SEARCH: (keyword: string) => `${API_URL}/user/search?hoten=${keyword}`,
  },
  BANGLUONG: {
    GET_ALL: `${API_URL}/salaries`,
    CREATE: `${API_URL}/salary/create`,
    DELETE: (id: number) => `${API_URL}/salary/delete/${id}`,
    UPDATE: (id: number) => `${API_URL}/salary/update/${id}`,
    SEARCH: (keyword: string) => `${API_URL}/salary/search?hoten=${keyword}`,
  },
};
