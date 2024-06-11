import { Task } from "../context/TaskContext"

export const getTasksFromLocalStorage = (): { [profile: string]: Task[] } => {
	const tasks = localStorage.getItem("tasks")
	return tasks ? JSON.parse(tasks) : {}
}

export const saveTasksToLocalStorage = (tasks: {
	[profile: string]: Task[]
}) => {
	localStorage.setItem("tasks", JSON.stringify(tasks))
}
