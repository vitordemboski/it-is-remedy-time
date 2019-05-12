import { post } from './api';
import { API_URL } from './constants'

export const enviaMensagem = async (compartimento) => {
    return post(await API_URL(), { compartimento });
};



