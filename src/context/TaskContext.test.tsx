import React, { useContext } from "react"
import { render, screen, fireEvent } from "@testing-library/react"
import { TaskProvider, TaskContext } from "./TaskContext"
import { ProfileProvider } from "./ProfileContext"

const TestComponent = () => {
	const { state, dispatch } = useContext(TaskContext)

	return (
		<div>
			<button
				onClick={() =>
					dispatch({
						type: "ADD_TASK",
						payload: {
							currentProfile: "User",
							task: { date: "2024-06-24", text: "Test Task" },
						},
					})
				}
			>
				Add Task
			</button>
			{state.tasks["User"]?.map((task) => (
				<span key={task.id}>{task.text}</span>
			))}
		</div>
	)
}

describe("TaskContext", () => {
	test("adds task", () => {
		render(
			<ProfileProvider>
				<TaskProvider>
					<TestComponent />
				</TaskProvider>
			</ProfileProvider>
		)

		const addButton = screen.getByText("Add Task")
		fireEvent.click(addButton)

		const taskText = screen.getByText("Test Task")
		expect(taskText).toBeInTheDocument()
	})
})
