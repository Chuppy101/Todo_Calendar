import React, { useState, useContext } from "react"
import Modal from "../Modal/Modal"
import { TaskContext } from "../../context/TaskContext"
import { ProfileContext } from "../../context/ProfileContext"
import "./Day.scss"

interface DayProps {
	date: string
	isHoliday: boolean
}

const Day: React.FC<DayProps> = ({ date, isHoliday }) => {
	const [isOpen, setIsOpen] = useState(false)
	const { state } = useContext(TaskContext)
	const { currentProfile } = useContext(ProfileContext)
	const tasks =
		state.tasks[currentProfile]?.filter((task) => task.date === date) || []

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
			{isHoliday && <div className="holiday-label">Holiday</div>}
			{tasks.length > 0 && <div className="task-indicator">✔</div>}
			{isOpen && <Modal date={date} onClose={toggleModal} />}
		</div>
	)
}

export default Day
