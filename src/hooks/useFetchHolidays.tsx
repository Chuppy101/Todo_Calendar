import { useState, useEffect } from "react"
import { fetchHolidays } from "../services/isDayOffApi"

export const useFetchHolidays = (year: number, month: number) => {
	const [holidays, setHolidays] = useState<string[]>([])

	useEffect(() => {
		const fetchAndSetHolidays = async () => {
			try {
				const result = await fetchHolidays(year, month)
				setHolidays(result)
			} catch (error) {
				console.error("Error fetching holidays:", error)
			}
		}
		fetchAndSetHolidays()
	}, [year, month])

	return holidays
}
