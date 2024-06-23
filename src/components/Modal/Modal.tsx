import React, { useContext, useEffect, useRef } from "react"
import ReactDOM from "react-dom"
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

	const modalRoot = document.getElementById("modal-root")
	const el = useRef(document.createElement("div"))

	useEffect(() => {
		const currentEl = el.current
		modalRoot?.appendChild(currentEl)
		return () => {
			modalRoot?.removeChild(currentEl)
		}
	}, [modalRoot])

	const handleClickOutside = (
		event: React.MouseEvent<HTMLDivElement, MouseEvent>
	) => {
		if (event.target === event.currentTarget) {
			onClose()
		}
	}

	return ReactDOM.createPortal(
		<div className="modal" onClick={handleClickOutside}>
			<div className="modal__content" onClick={(e) => e.stopPropagation()}>
				<button className="modal__close" onClick={onClose} aria-label="Close">
					X
				</button>
				<h2>Tasks</h2>
				<TaskForm date={date} />
				<TaskList tasks={tasks} />
			</div>
		</div>,
		el.current
	)
}

export default Modal
