import React, { useEffect, useState } from "react"
import { fetchHolidays } from "../../services/isDayOffApi"
import Day from "../Day/Day"
import "./Calendar.scss"

const Calendar: React.FC = () => {
	const [days, setDays] = useState<string[]>([])
	const [holidays, setHolidays] = useState<string[]>([])
	const [selectedYear, setSelectedYear] = useState<number>(
		new Date().getFullYear()
	)
	const [selectedMonth, setSelectedMonth] = useState<number>(
		new Date().getMonth() + 1
	)

	useEffect(() => {
		const fetchAndSetHolidays = async () => {
			try {
				const result = await fetchHolidays(selectedYear)
				setHolidays(result)
			} catch (error) {
				console.error("Error fetching holidays:", error)
			}
		}
		fetchAndSetHolidays()
	}, [selectedYear])

	useEffect(() => {
		const daysInMonth = new Date(selectedYear, selectedMonth, 0).getDate()
		const daysArray = Array.from(
			{ length: daysInMonth },
			(_, i) => `${selectedYear}-${selectedMonth}-${i + 1}`
		)
		setDays(daysArray)
	}, [selectedYear, selectedMonth])

	return (
		<div className="calendar">
			<div>
				<select
					value={selectedYear}
					onChange={(e) => setSelectedYear(parseInt(e.target.value))}
				>
					{[...Array(10)].map((_, i) => (
						<option key={i} value={new Date().getFullYear() - i}>
							{new Date().getFullYear() - i}
						</option>
					))}
				</select>
				<select
					value={selectedMonth}
					onChange={(e) => setSelectedMonth(parseInt(e.target.value))}
				>
					{[...Array(12)].map((_, i) => (
						<option key={i + 1} value={i + 1}>
							{i + 1}
						</option>
					))}
				</select>
			</div>
			{days.map((day) => (
				<Day key={day} date={day} isHoliday={holidays.includes(day)} />
			))}
		</div>
	)
}

export default Calendar