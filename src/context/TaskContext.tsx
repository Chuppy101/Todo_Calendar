import React, { createContext, useReducer, useEffect, useContext } from "react"
import { v4 as uuidv4 } from "uuid"
import {
	getTasksFromLocalStorage,
	saveTasksToLocalStorage,
} from "../utils/localStorage"
import { ProfileContext } from "./ProfileContext"

export interface Task {
	id: string
	date: string
	text: string
	completed: boolean
}

interface State {
	tasks: {
		[profile: string]: Task[]
	}
}

interface Action {
	type: string
	payload: any
}

const initialState: State = {
	tasks: getTasksFromLocalStorage(),
}

const TaskContext = createContext<{
	state: State
	dispatch: React.Dispatch<Action>
}>({ state: initialState, dispatch: () => null })

const taskReducer = (state: State, action: Action): State => {
	const { currentProfile } = action.payload
	switch (action.type) {
		case "ADD_TASK":
			const newTask: Task = {
				id: uuidv4(),
				...action.payload.task,
				completed: false,
			}
			return {
				...state,
				tasks: {
					...state.tasks,
					[currentProfile]: [...(state.tasks[currentProfile] || []), newTask],
				},
			}
		case "REMOVE_TASK":
			return {
				...state,
				tasks: {
					...state.tasks,
					[currentProfile]: state.tasks[currentProfile].filter(
						(task: Task) => task.id !== action.payload.id
					),
				},
			}
		case "TOGGLE_TASK":
			return {
				...state,
				tasks: {
					...state.tasks,
					[currentProfile]: state.tasks[currentProfile].map((task: Task) =>
						task.id === action.payload.id
							? { ...task, completed: !task.completed }
							: task
					),
				},
			}
		default:
			return state
	}
}

const TaskProvider: React.FC<{ children: React.ReactNode }> = ({
	children,
}) => {
	const { currentProfile } = useContext(ProfileContext)
	const [state, dispatch] = useReducer(taskReducer, initialState)

	useEffect(() => {
		saveTasksToLocalStorage(state.tasks)
	}, [state.tasks])

	return (
		<TaskContext.Provider value={{ state, dispatch }}>
			{children}
		</TaskContext.Provider>
	)
}

export { TaskContext, TaskProvider }
