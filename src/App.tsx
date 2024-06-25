import React from "react"
import Calendar from "./components/Calendar/Calendar"
import { TaskProvider } from "./context/TaskContext"
import { ProfileProvider } from "./context/ProfileContext"
import ProfileSwitcher from "./components/ProfileSwitcher/ProfileSwitcher"
import "./App.scss"

const App: React.FC = () => {
	return (
		<ProfileProvider>
			<TaskProvider>
				<header className="app__header">
					<h1>To-Do Calendar</h1>
				</header>
				<div className="app">
					<aside className="sidebar">
						<ProfileSwitcher />
					</aside>
					<main className="main-content">
						<Calendar />
					</main>
				</div>
			</TaskProvider>
		</ProfileProvider>
	)
}

export default App
