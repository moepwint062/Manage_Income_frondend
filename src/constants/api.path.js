import { environment } from "./environment";

// Login User Token
export const TOKEN = localStorage.getItem("token");

// Register
export const REGISTER_URL = `${environment.apiUrl}/register`;

// Login
export const LOGIN_URL = `${environment.apiUrl}/login`;
export const LOGOUT_URL = `${environment.apiUrl}/logout`;

// Home
export const HOME_URL = `${environment.apiUrl}/home`;
export const GET_INCOME_URL = `${environment.apiUrl}/home-service/show-incomeList`;
export const CREATE_INCOME_URL = `${environment.apiUrl}/home-service/save-to-income`;
export const CREATE_WISHITEM_URL = `${environment.apiUrl}/home-service/save-to-wishList`;
export const GET_WISHITEM_URL = `${environment.apiUrl}/home-service/show-wishList`;
export const GET_CANBUYLIST_URL = `${environment.apiUrl}/home-service/show-canBuyList`;

