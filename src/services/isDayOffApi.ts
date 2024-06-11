import axios from "axios"

export const fetchHolidays = async (year: number) => {
	const response = await axios.get(`https://api.isdayoff.ru/v1.0/${year}`)
	return response.data
}
