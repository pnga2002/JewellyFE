import axios from "axios"
import { history } from "../App";
export const TOKEN = "token"
export const USER_LOGIN = 'userLogin';
export const DOMAIN = 'http://localhost:8080';
export const http = axios.create({
    baseURL: DOMAIN,
});
http.interceptors.request.use((config) => {
    // config.headers = {
    //     ...config.headers,
    //     Authorization: `Bearer ${getStore(TOKEN)}`
    // };
    return config;
}, (err) => {
    return Promise.reject(err);
})
export const { luuStore, luuStoreJson, getStore, getStoreJson, removeStore } = {
    luuStore: (name, stringValue) => {
        localStorage.setItem(name, stringValue);
        return stringValue;
    },
    luuStoreJson: (name, value) => {
        let svalue = JSON.stringify(value);
        localStorage.setItem(name, svalue);
        return value
    },
    getStore: (name) => {
        if (localStorage.getItem(name)) {
            return localStorage.getItem(name)
        }
        return null
    },
    getStoreJson: (name) => {
        if (localStorage.getItem(name)) {
            return JSON.parse(localStorage.getItem(name));
        }
        return null;
    },
    removeStore: (name) => {
        if (localStorage.getItem(name)) {
            localStorage.removeItem(name);
        }
    }
}