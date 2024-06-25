export interface HttpClient {
	get(url: string, params?: any): Promise<any>
	post(url: string, data: any): Promise<any>
}
