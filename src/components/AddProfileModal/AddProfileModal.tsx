import React, { useState, useContext } from "react"
import { ProfileContext } from "../../context/ProfileContext"
import "./AddProfileModal.scss"

interface AddProfileModalProps {
	onClose: () => void
}

const AddProfileModal: React.FC<AddProfileModalProps> = ({ onClose }) => {
	const { addProfile } = useContext(ProfileContext)
	const [profileName, setProfileName] = useState("")

	const handleAddProfile = () => {
		if (profileName.trim() !== "") {
			addProfile(profileName.trim())
			onClose()
		}
	}

	return (
		<div className="modal">
			<div className="modal__content">
				<button className="modal__close" onClick={onClose}>
					X
				</button>
				<h2>Add New Profile</h2>
				<input
					type="text"
					value={profileName}
					onChange={(e) => setProfileName(e.target.value)}
					placeholder="Enter profile name"
				/>
				<button onClick={handleAddProfile}>Add</button>
			</div>
		</div>
	)
}

export default AddProfileModal
