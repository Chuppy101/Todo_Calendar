import { useState, useEffect } from "react"
import { fetchHolidays } from "../services/isDayOffApi"

export const useFetchHolidays = (year: number) => {
	const [holidays, setHolidays] = useState<string[]>([])

	useEffect(() => {
		const fetchAndSetHolidays = async () => {
			try {
				const result = await fetchHolidays(year)
				setHolidays(result)
			} catch (error) {
				console.error("Error fetching holidays:", error)
			}
		}
		fetchAndSetHolidays()
	}, [year])

	return holidays
}
