import { useState, useEffect } from "react"
import { IsDayOffApi } from "../services/isDayOffApi"
import { AxiosHttpClient } from "../services/axiosHttpClient"

const httpClient = new AxiosHttpClient()
const isDayOffApi = new IsDayOffApi(httpClient)

export const useFetchHolidays = (year: number, month: number) => {
	const [holidays, setHolidays] = useState<string[]>([])

	useEffect(() => {
		const fetchAndSetHolidays = async () => {
			try {
				const result = await isDayOffApi.fetchHolidays(year, month)
				setHolidays(result)
			} catch (error) {
				console.error("Error fetching holidays:", error)
			}
		}
		fetchAndSetHolidays()
	}, [year, month])

	return holidays
}
