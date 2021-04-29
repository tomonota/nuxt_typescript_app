import axios, { AxiosInstance, AxiosResponse } from 'axios'

class HttpClient {
  public instance: AxiosInstance

  public constructor() {
    this.instance = axios.create({
      baseURL: process.env.API_URL + '/api',
      headers: {
        'Content-Type': 'application/json;charset=UTF-8'
      },
      timeout: 20000
    })
  }

  async get<T>(url: string, params?: Object): Promise<T> {
    const res = await this.instance.get<T>(url, { params })
    return res.data
  }

  async post<D>(
    url: string,
    data: D,
    onSuccess?: (response?: AxiosResponse) => void,
    onError?: () => void
  ) {
    try {
      const res = await this.instance.post(url, data)
      if (onSuccess) {
        onSuccess(res)
      }
    } catch (e) {
      if (onError) {
        onError()
      }
    }
  }

  setToken(token: string) {
    this.instance.defaults.headers.common.IdToken = token
  }
}

export const httpClient = new HttpClient()
