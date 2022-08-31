import axios from 'axios';
import { authHeader } from '../utils/_helpers/authHeaders';
import { AppUrl, BaseUrl } from '../utils/_helpers/_globalServices';

export const login = async (loginData) => {
    const requestOptions = {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(loginData),
        };
      
        const response = await axios.post(`${BaseUrl}/login`, loginData, requestOptions);
        return response;
}

export const getTask = async (id, company_id) => {
    try {
        const res = await axios.get(
            `${AppUrl}/${id}?company_id=${company_id}`,
            {
                method: "GET",
                headers: authHeader(),
            },
        );
        return res
    } catch (error) {
        console.log(error.message)
    }
}

export const createTask = async (company_id, body) => {
    try {
        const res = await axios.post(
            `${AppUrl}?company_id=${company_id}`,
            body,
            {
                headers: authHeader(),
            },
        );
        return res
    } catch (err) {
        return {error: err?.message}
    }
}

export const editTask = async (task_id,company_id, body) => {
    try {
        const res = await axios.put(
            `${AppUrl}/${task_id}?company_id=${company_id}`,
            body,
            {
                headers: authHeader(),
            },
        );
        return res
    } catch (err) {
        return {error: err?.message}
    }
}

export const deleteTask = async (task_id,company_id) => {
    try {
        const res = await axios.delete(
            `${AppUrl}/${task_id}?company_id=${company_id}`,
            {
                headers: authHeader(),
            },
        );

        return res
    } catch (err) {
        return {error: err?.message}
    }
}