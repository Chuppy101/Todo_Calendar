import React, { useState } from "react"
import Modal from "../Modal/Modal"
import "./Day.scss"

interface DayProps {
	date: string
	isHoliday: boolean
}

const Day: React.FC<DayProps> = ({ date, isHoliday }) => {
	const [isOpen, setIsOpen] = useState(false)

	const toggleModal = () => {
		setIsOpen(!isOpen)
	}

	const dayOfMonth = date.split("-")[2]

	return (
		<div
			className={`day ${isHoliday ? "day--holiday" : ""}`}
			onClick={toggleModal}
		>
			<span>{dayOfMonth}</span>
			{isOpen && <Modal date={date} onClose={toggleModal} />}
		</div>
	)
}

export default Day
