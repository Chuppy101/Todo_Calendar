import axios from "axios"

export const fetchHolidays = async (year: number, month: number) => {
	try {
		const response = await axios.get("https://isdayoff.ru/api/getdata", {
			params: { year, month, country: "ru" },
			responseType: "text",
		})

		console.log("Response data:", response.data) // Отладочный вывод

		if (typeof response.data === "string") {
			// Преобразуем строку в массив дат
			const holidays = response.data
				.split("")
				.map((day, index) => {
					if (day === "1") {
						return `${year}-${month.toString().padStart(2, "0")}-${(index + 1)
							.toString()
							.padStart(2, "0")}`
					}
					return null
				})
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
