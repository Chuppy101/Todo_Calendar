import React, { useEffect, useState } from "react"
import { useFetchHolidays } from "../../hooks/useFetchHolidays"
import Day from "../Day/Day"
import "./Calendar.scss"

const monthNames = [
	"Январь",
	"Февраль",
	"Март",
	"Апрель",
	"Май",
	"Июнь",
	"Июль",
	"Август",
	"Сентябрь",
	"Октябрь",
	"Ноябрь",
	"Декабрь",
]

const Calendar: React.FC = () => {
	const [days, setDays] = useState<string[]>([])
	const [selectedYear, setSelectedYear] = useState<number>(
		new Date().getFullYear()
	)
	const [selectedMonth, setSelectedMonth] = useState<number>(
		new Date().getMonth() + 1
	)

	const holidays = useFetchHolidays(selectedYear, selectedMonth)

	useEffect(() => {
		const daysInMonth = new Date(selectedYear, selectedMonth, 0).getDate()
		const daysArray = Array.from(
			{ length: daysInMonth },
			(_, i) =>
				`${selectedYear}-${selectedMonth.toString().padStart(2, "0")}-${(i + 1)
					.toString()
					.padStart(2, "0")}`
		)
		setDays(daysArray)
	}, [selectedYear, selectedMonth])

	return (
		<div className="calendar-container">
			<div className="calendar__controls">
				<select
					value={selectedYear}
					onChange={(e) => setSelectedYear(parseInt(e.target.value))}
					aria-label="Select Year"
				>
					{[...Array(20)].map((_, i) => (
						<option key={i} value={new Date().getFullYear() - i}>
							{new Date().getFullYear() - i}
						</option>
					))}
				</select>
				<select
					value={selectedMonth}
					onChange={(e) => setSelectedMonth(parseInt(e.target.value))}
					aria-label="Select Month"
				>
					{[...Array(12)].map((_, i) => (
						<option key={i + 1} value={i + 1}>
							{i + 1}
						</option>
					))}
				</select>
				<span className="month-name">{monthNames[selectedMonth - 1]}</span>
			</div>
			<div className="calendar__days">
				{days.map((day) => (
					<Day key={day} date={day} isHoliday={holidays.includes(day)} />
				))}
			</div>
		</div>
	)
}

export default Calendar
