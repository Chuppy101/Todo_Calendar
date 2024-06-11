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

	return (
		<div className={`day ${isHoliday ? "holiday" : ""}`} onClick={toggleModal}>
			<span>{date}</span>
			{isOpen && <Modal date={date} onClose={toggleModal} />}
		</div>
	)
}

export default Day
