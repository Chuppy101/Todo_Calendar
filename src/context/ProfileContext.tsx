import React, { createContext, useState, useEffect } from "react"

interface ProfileContextProps {
	currentProfile: string
	profiles: string[]
	switchProfile: (profileName: string) => void
	addProfile: (profileName: string) => void
	editProfile: (oldProfileName: string, newProfileName: string) => void
	deleteProfile: (profileName: string) => void
}

const ProfileContext = createContext<ProfileContextProps>({
	currentProfile: "User",
	profiles: ["User"],
	switchProfile: () => {},
	addProfile: () => {},
	editProfile: () => {},
	deleteProfile: () => {},
})

const ProfileProvider: React.FC<{ children: React.ReactNode }> = ({
	children,
}) => {
	const [currentProfile, setCurrentProfile] = useState("User")
	const [profiles, setProfiles] = useState<string[]>(["User"])

	useEffect(() => {
		const savedProfiles = localStorage.getItem("profiles")
		if (savedProfiles) {
			setProfiles(JSON.parse(savedProfiles))
		}
	}, [])

	useEffect(() => {
		localStorage.setItem("profiles", JSON.stringify(profiles))
	}, [profiles])

	const switchProfile = (profileName: string) => {
		setCurrentProfile(profileName)
	}

	const addProfile = (profileName: string) => {
		if (profiles.length < 5 && !profiles.includes(profileName)) {
			setProfiles([...profiles, profileName])
		}
	}

	const editProfile = (oldProfileName: string, newProfileName: string) => {
		setProfiles(
			profiles.map((profile) =>
				profile === oldProfileName ? newProfileName : profile
			)
		)
		if (currentProfile === oldProfileName) {
			setCurrentProfile(newProfileName)
		}
	}

	const deleteProfile = (profileName: string) => {
		console.log("Deleting profile in context:", profileName) // Лог для отладки
		if (profiles.length > 1) {
			setProfiles(profiles.filter((profile) => profile !== profileName))
			if (currentProfile === profileName) {
				setCurrentProfile(profiles[0])
			}
		}
	}

	return (
		<ProfileContext.Provider
			value={{
				currentProfile,
				profiles,
				switchProfile,
				addProfile,
				editProfile,
				deleteProfile,
			}}
		>
			{children}
		</ProfileContext.Provider>
	)
}

export { ProfileProvider, ProfileContext }
