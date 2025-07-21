export const BASE_URL = "http://localhost:5001";

//utils/apiPath.js
export const API_PATH = {
    AUTH: {
        LOGIN: "/api/auth/login",
        REGISTER: "/api/auth/signup",
        GET_USER_INFO: "/api/auth/getUserInfo",
    },
    DASHBOARD: {
        GET_DATA: "/api/dashboard",
    },
    INCOME: {
        ADD_INCOME: "/api/income/add",
        GET_ALL_INCOME: "/api/income/get",
        DELETE_INCOME: (incomeId) => `/api/income/delete/${incomeId}`,
        DOWNLOAD_INCOME: "/api/income/download",
    },
    EXPENSE: {
        ADD_EXPENSE: "/api/expense/add",
        GET_ALL_EXPENSE: "/api/expense/all",
        DELETE_EXPENSE: (expenseId) => `/api/expense/delete/${expenseId}`,
        DOWNLOAD_EXPENSE: "/api/expense/download",
    },
};

