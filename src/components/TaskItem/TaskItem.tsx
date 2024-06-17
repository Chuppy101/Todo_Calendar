import React, { useContext } from "react"
import { TaskContext } from "../../context/TaskContext"
import { ProfileContext } from "../../context/ProfileContext"
import "./TaskItem.scss"

interface TaskItemProps {
	task: {
		id: string
		text: string
		completed: boolean
	}
}

const TaskItem: React.FC<TaskItemProps> = ({ task }) => {
	const { dispatch } = useContext(TaskContext)
	const { currentProfile } = useContext(ProfileContext)

	const toggleComplete = () => {
		dispatch({ type: "TOGGLE_TASK", payload: { id: task.id, currentProfile } })
	}

	const removeTask = () => {
		dispatch({ type: "REMOVE_TASK", payload: { id: task.id, currentProfile } })
	}

	return (
		<div className="task-item">
			<input
				type="checkbox"
				checked={task.completed}
				onChange={toggleComplete}
				aria-label="Complete Task"
			/>
			<span className={task.completed ? "task-item__completed" : ""}>
				{task.text}
			</span>
			<button onClick={removeTask} aria-label="Delete Task">
				Delete
			</button>
		</div>
	)
}

export default TaskItem
