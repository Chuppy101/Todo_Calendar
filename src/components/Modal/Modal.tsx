import React, { useContext } from "react"
import TaskForm from "../TaskForm/TaskForm"
import TaskList from "../TaskList/TaskList"
import { TaskContext } from "../../context/TaskContext"
import { ProfileContext } from "../../context/ProfileContext"
import "./Modal.scss"

interface ModalProps {
	date: string
	onClose: () => void
}

const Modal: React.FC<ModalProps> = ({ date, onClose }) => {
	const { state } = useContext(TaskContext)
	const { currentProfile } = useContext(ProfileContext)
	const tasks =
		state.tasks[currentProfile]?.filter(
			(task: { date: string }) => task.date === date
		) || []

	const handleClickOutside = (
		event: React.MouseEvent<HTMLDivElement, MouseEvent>
	) => {
		if (event.target === event.currentTarget) {
			onClose()
		}
	}

	return (
		<div
			className="modal"
			onClick={handleClickOutside}
			role="dialog"
			aria-modal="true"
		>
			<div className="modal__content" onClick={(e) => e.stopPropagation()}>
				<button className="modal__close" onClick={onClose} aria-label="Close">
					X
				</button>
				<h2>Tasks for {date}</h2>
				<TaskForm date={date} />
				<TaskList tasks={tasks} />
			</div>
		</div>
	)
}

export default Modal
