import React, { useContext, useState, useEffect } from "react"
import { ProfileContext } from "../../context/ProfileContext"
import AddProfileModal from "../AddProfileModal/AddProfileModal"
import "./ProfileSwitcher.scss"

const ProfileSwitcher: React.FC = () => {
	const { currentProfile, profiles, switchProfile, deleteProfile } =
		useContext(ProfileContext)
	const [isModalOpen, setIsModalOpen] = useState(false)
	const [isDropdownOpen, setIsDropdownOpen] = useState(false)
	const [profileToEdit, setProfileToEdit] = useState<string | null>(null)
	const [profileToDelete, setProfileToDelete] = useState<string | null>(null)
	const [activeAction, setActiveAction] = useState<"edit" | "delete" | null>(
		null
	)

	useEffect(() => {
		if (activeAction) {
			setIsDropdownOpen(true)
		}
	}, [activeAction])

	const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen)
	const openModal = () => setIsModalOpen(true)
	const closeModal = () => {
		setIsModalOpen(false)
		setProfileToEdit(null)
	}

	const handleDeleteProfile = (profile: string) => {
		deleteProfile(profile)
		setProfileToDelete(null)
		setActiveAction(null)
		setIsDropdownOpen(false)
	}

	const handleEditProfile = (profile: string) => {
		setProfileToEdit(profile)
		setIsModalOpen(true)
		setActiveAction(null)
	}

	const handleOpenDropdownForAction = (action: "edit" | "delete") => {
		setActiveAction(action)
		setTimeout(() => {
			setIsDropdownOpen(true)
		}, 100) // Добавляем небольшую задержку
	}

	const handleProfileClick = (profile: string) => {
		if (activeAction === "edit") {
			handleEditProfile(profile)
		} else if (activeAction === "delete") {
			handleDeleteProfile(profile)
		} else {
			switchProfile(profile)
			setIsDropdownOpen(false)
		}
	}

	return (
		<div className="profile-switcher">
			<div className="profile-switcher__name">Profiles</div>
			<div className="profile-switcher__buttons">
				{profiles.length < 5 && (
					<button
						className="profile-switcher__round-button"
						onClick={() => {
							setProfileToEdit(null)
							openModal()
						}}
					>
						+
					</button>
				)}
				<button
					className="profile-switcher__round-button"
					onClick={() => handleOpenDropdownForAction("delete")}
				>
					-
				</button>
				<button
					className="profile-switcher__round-button"
					onClick={() => handleOpenDropdownForAction("edit")}
				>
					✎
				</button>
			</div>
			<div className="profile-switcher__selector" onClick={toggleDropdown}>
				{currentProfile} ▼
			</div>
			{isDropdownOpen && (
				<div className="profile-switcher__dropdown">
					{profiles.map((profile) => (
						<div
							key={profile}
							className={`profile-switcher__option ${
								activeAction === "delete" && profileToDelete === profile
									? "profile-switcher__option--delete"
									: ""
							} ${
								activeAction === "edit" ? "profile-switcher__option--edit" : ""
							}`}
							onMouseEnter={() => {
								if (activeAction === "delete") {
									setProfileToDelete(profile)
								} else if (activeAction === "edit") {
									setProfileToEdit(profile)
								}
							}}
							onMouseLeave={() => {
								if (activeAction === "delete") {
									setProfileToDelete(null)
								} else if (activeAction === "edit") {
									setProfileToEdit(null)
								}
							}}
							onClick={() => handleProfileClick(profile)}
							style={{ cursor: "pointer" }}
						>
							{profile}
						</div>
					))}
				</div>
			)}
			{isModalOpen && (
				<AddProfileModal onClose={closeModal} profileToEdit={profileToEdit} />
			)}
		</div>
	)
}

export default ProfileSwitcher
