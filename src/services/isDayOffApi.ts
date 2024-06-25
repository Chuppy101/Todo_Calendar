import { HttpClient } from "./httpClient"

export class IsDayOffApi {
	private httpClient: HttpClient

	constructor(httpClient: HttpClient) {
		this.httpClient = httpClient
	}

	async fetchHolidays(year: number, month: number): Promise<string[]> {
		try {
			const data = await this.httpClient.get(
				"https://isdayoff.ru/api/getdata",
				{ year, month, country: "ru" }
			)
			if (typeof data === "string") {
				const holidays = data
					.split("")
					.map((day, index) =>
						day === "1"
							? `${year}-${month.toString().padStart(2, "0")}-${(index + 1)
									.toString()
									.padStart(2, "0")}`
							: null
					)
					.filter((date): date is string => date !== null)

				return holidays
			} else {
				throw new Error("Unexpected response format")
			}
		} catch (error) {
			console.error("Error fetching holidays:", error)
			throw error
		}
	}
}
