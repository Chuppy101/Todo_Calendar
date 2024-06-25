import axios from "axios"
import { HttpClient } from "./httpClient"

export class AxiosHttpClient implements HttpClient {
	async get(url: string, params?: any): Promise<any> {
		const response = await axios.get(url, { params, responseType: "text" })
		return response.data
	}

	async post(url: string, data: any): Promise<any> {
		const response = await axios.post(url, data)
		return response.data
	}
}
