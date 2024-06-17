import React, { useContext, useState, useEffect } from "react"
import { ProfileContext } from "../../context/ProfileContext"
import AddProfileModal from "../AddProfileModal/AddProfileModal"
import "./ProfileSwitcher.scss"

const ProfileSwitcher: React.FC = () => {
	const { currentProfile, profiles, switchProfile, deleteProfile } =
		useContext(ProfileContext)
	const [isModalOpen, setIsModalOpen] = useState(false)
	const [isDropdownOpen, setIsDropdownOpen] = useState(false)
	const [isEditing, setIsEditing] = useState(false)
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
		setIsDropdownOpen(true)
	}

	return (
		<div className="profile-switcher">
			<div className="profile-name">Профили</div>
			<div className="profile-buttons">
				{profiles.length < 5 && (
					<button
						className="round-button"
						onClick={() => {
							setProfileToEdit(null)
							openModal()
						}}
					>
						+
					</button>
				)}
				<button
					className="round-button"
					onClick={() => handleOpenDropdownForAction("delete")}
				>
					-
				</button>
				<button
					className="round-button"
					onClick={() => handleOpenDropdownForAction("edit")}
				>
					✎
				</button>
			</div>
			<div className="profile-selector" onClick={toggleDropdown}>
				{currentProfile} ▼
			</div>
			{isDropdownOpen && (
				<div className="profile-dropdown">
					{profiles.map((profile) => (
						<div
							key={profile}
							className={`profile-option ${
								activeAction === "delete" && profileToDelete === profile
									? "profile-option--delete"
									: ""
							} ${activeAction === "edit" ? "profile-option--edit" : ""}`}
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
							onClick={() => {
								if (activeAction === "edit" && profileToEdit === profile) {
									handleEditProfile(profile)
								} else if (
									activeAction === "delete" &&
									profileToDelete === profile
								) {
									handleDeleteProfile(profile)
								} else {
									switchProfile(profile)
									setIsDropdownOpen(false)
								}
							}}
							style={{ cursor: isEditing ? "text" : "pointer" }}
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
