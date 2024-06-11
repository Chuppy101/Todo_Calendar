import React, { useContext, useState } from "react"
import { TaskContext } from "../../context/TaskContext"
import { ProfileContext } from "../../context/ProfileContext"
import "./TaskForm.scss"

interface TaskFormProps {
	date: string
}

const TaskForm: React.FC<TaskFormProps> = ({ date }) => {
	const { dispatch } = useContext(TaskContext)
	const { currentProfile } = useContext(ProfileContext)
	const [text, setText] = useState("")

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault()
		dispatch({
			type: "ADD_TASK",
			payload: { currentProfile, task: { date, text } },
		})
		setText("")
	}

	return (
		<form className="task-form" onSubmit={handleSubmit}>
			<input
				type="text"
				value={text}
				onChange={(e) => setText(e.target.value)}
				placeholder="New task"
				required
			/>
			<button type="submit">Add</button>
		</form>
	)
}

export default TaskForm
