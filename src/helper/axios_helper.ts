import axios, { AxiosRequestConfig, AxiosResponse, Method, ResponseType } from 'axios'

const axiosHelper = (
  url: string,
  params: object,
  body: object,
  method: Method,
  headers: object,
  responseType: ResponseType = 'json',
) => {
  return new Promise((resolve, reject) => {
    const axiosMeta: AxiosRequestConfig = {
      url: url,
      method: method,
      params: params,
      data: body,
      headers: headers,
      responseType: responseType,
    }

    // Make the API Call
    axios(axiosMeta)
      .then((result: AxiosResponse) => resolve(result.data))
      .catch((error) => {
        if (error.response && error.response.data) reject(error.response.data)
        else reject({ 'error': 'Server error.' })
      })
  })
}

export default axiosHelper
