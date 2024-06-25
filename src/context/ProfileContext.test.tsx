import React, { useContext } from "react"
import { render, screen, fireEvent } from "@testing-library/react"
import { ProfileProvider, ProfileContext } from "./ProfileContext"

const TestComponent = () => {
	const { currentProfile, addProfile, switchProfile } =
		useContext(ProfileContext)

	return (
		<div>
			<span>{currentProfile}</span>
			<button onClick={() => addProfile("TestProfile")}>Add Profile</button>
			<button onClick={() => switchProfile("TestProfile")}>
				Switch Profile
			</button>
		</div>
	)
}

describe("ProfileContext", () => {
	test("switches profile", () => {
		render(
			<ProfileProvider>
				<TestComponent />
			</ProfileProvider>
		)

		const addButton = screen.getByText("Add Profile")
		fireEvent.click(addButton)

		const switchButton = screen.getByText("Switch Profile")
		fireEvent.click(switchButton)

		const profileName = screen.getByText("TestProfile")
		expect(profileName).toBeInTheDocument()
	})
})
