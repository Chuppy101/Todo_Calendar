import React from "react"
import TaskItem from "../TaskItem/TaskItem"
import "./TaskList.scss"

interface TaskListProps {
	tasks: { id: string; text: string; completed: boolean }[]
}

const TaskList: React.FC<TaskListProps> = ({ tasks }) => {
	return (
		<div className="task-list">
			{tasks.map((task) => (
				<TaskItem key={task.id} task={task} />
			))}
		</div>
	)
}

export default TaskList
