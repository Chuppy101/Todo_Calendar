import React, { useState, useContext, useEffect } from "react"
import { ProfileContext } from "../../context/ProfileContext"
import "./AddProfileModal.scss"

interface AddProfileModalProps {
	onClose: () => void
	profileToEdit?: string | null
}

const AddProfileModal: React.FC<AddProfileModalProps> = ({
	onClose,
	profileToEdit,
}) => {
	const { addProfile, editProfile } = useContext(ProfileContext)
	const [profileName, setProfileName] = useState<string>("")

	useEffect(() => {
		if (profileToEdit) {
			setProfileName(profileToEdit)
		}
	}, [profileToEdit])

	const handleSaveProfile = () => {
		if (profileName.trim()) {
			if (profileToEdit) {
				editProfile(profileToEdit, profileName.trim())
			} else {
				addProfile(profileName.trim())
			}
			onClose()
		}
	}

	return (
		<div className="modal" role="dialog" aria-modal="true">
			<div className="modal__content">
				<button className="modal__close" onClick={onClose} aria-label="Close">
					X
				</button>
				<h2>{profileToEdit ? "Edit Profile" : "Add New Profile"}</h2>
				<input
					type="text"
					value={profileName}
					onChange={(e) => setProfileName(e.target.value)}
					placeholder="Enter profile name"
					aria-label="Profile Name"
				/>
				<button onClick={handleSaveProfile}>
					{profileToEdit ? "Save" : "Add"}
				</button>
			</div>
		</div>
	)
}

export default AddProfileModal
