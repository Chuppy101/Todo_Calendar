import React, { useContext, useState } from "react"
import { ProfileContext } from "../../context/ProfileContext"
import AddProfileModal from "../AddProfileModal/AddProfileModal"
import "./ProfileSwitcher.scss"

const ProfileSwitcher: React.FC = () => {
	const { currentProfile, profiles, switchProfile } = useContext(ProfileContext)
	const [isModalOpen, setIsModalOpen] = useState(false)
	const [isDropdownOpen, setIsDropdownOpen] = useState(false)

	const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen)
	const openModal = () => setIsModalOpen(true)
	const closeModal = () => setIsModalOpen(false)

	return (
		<div className="profile-switcher">
			<div className="profile-selector" onClick={toggleDropdown}>
				{currentProfile} ▼
			</div>
			{isDropdownOpen && (
				<div className="profile-dropdown">
					{profiles.map((profile) => (
						<div
							key={profile}
							className="profile-option"
							onClick={() => {
								switchProfile(profile)
								setIsDropdownOpen(false)
							}}
						>
							{profile}
						</div>
					))}
					{profiles.length < 5 && (
						<div className="profile-option add-profile" onClick={openModal}>
							+ Add Profile
						</div>
					)}
				</div>
			)}
			{isModalOpen && <AddProfileModal onClose={closeModal} />}
		</div>
	)
}

export default ProfileSwitcher
