import axios from 'axios';
import Constants from 'expo-constants';

const instance = axios.create({
  baseURL: Constants.expoConfig?.extra?.apiUrl,
  timeout: 3 * 60 * 1000,
});

export const httpClient = instance;

export async function httpPOST<Req, Res = Req>(
  url: string,
  data: Req,
  token?: string,
): Promise<Res> {
  return (
    await httpClient.post<Res>(url, data, {
      headers: {authorization: `Bearer ${token}`},
    })
  ).data;
}

export async function httpGET<T>(url: string, token?: string): Promise<T> {
  return (
    await httpClient.get<T>(url, {
      headers: {authorization: `Bearer ${token}`},
    })
  ).data;
}
