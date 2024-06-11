import React from "react"
import Calendar from "./components/Calendar/Calendar"
import { TaskProvider } from "./context/TaskContext"
import { ProfileProvider } from "./context/ProfileContext"
import ProfileSwitcher from "./components/ProfileSwitcher/ProfileSwitcher"

const App: React.FC = () => {
	return (
		<ProfileProvider>
			<TaskProvider>
				<div className="app">
					<h1>To-Do Calendar</h1>
					<ProfileSwitcher />
					<Calendar />
				</div>
			</TaskProvider>
		</ProfileProvider>
	)
}

export default App
