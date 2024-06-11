import React, { createContext, useState, useEffect } from "react"

interface ProfileContextProps {
	currentProfile: string
	profiles: string[]
	switchProfile: (profileName: string) => void
	addProfile: (profileName: string) => void
}

const ProfileContext = createContext<ProfileContextProps>({
	currentProfile: "default",
	profiles: ["default"],
	switchProfile: () => {},
	addProfile: () => {},
})

const ProfileProvider: React.FC<{ children: React.ReactNode }> = ({
	children,
}) => {
	const [currentProfile, setCurrentProfile] = useState("default")
	const [profiles, setProfiles] = useState<string[]>(["default"])

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

	return (
		<ProfileContext.Provider
			value={{ currentProfile, profiles, switchProfile, addProfile }}
		>
			{children}
		</ProfileContext.Provider>
	)
}

export { ProfileProvider, ProfileContext }
