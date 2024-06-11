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
	const [profileName, setProfileName] = useState("")

	useEffect(() => {
		if (profileToEdit) {
			setProfileName(profileToEdit)
		}
	}, [profileToEdit])

	const handleSaveProfile = () => {
		if (profileName.trim() !== "") {
			if (profileToEdit) {
				editProfile(profileToEdit, profileName.trim())
			} else {
				addProfile(profileName.trim())
			}
			onClose()
		}
	}

	return (
		<div className="modal">
			<div className="modal__content">
				<button className="modal__close" onClick={onClose}>
					X
				</button>
				<h2>{profileToEdit ? "Edit Profile" : "Add New Profile"}</h2>
				<input
					type="text"
					value={profileName}
					onChange={(e) => setProfileName(e.target.value)}
					placeholder="Enter profile name"
				/>
				<button onClick={handleSaveProfile}>
					{profileToEdit ? "Save" : "Add"}
				</button>
			</div>
		</div>
	)
}

export default AddProfileModal
