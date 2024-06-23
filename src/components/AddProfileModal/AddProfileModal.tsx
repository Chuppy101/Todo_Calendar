import React, { useEffect, useRef, useContext, useState } from "react"
import ReactDOM from "react-dom"
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

	const modalRoot = document.getElementById("modal-root")
	const el = useRef(document.createElement("div"))

	useEffect(() => {
		const currentEl = el.current
		modalRoot?.appendChild(currentEl)
		return () => {
			modalRoot?.removeChild(currentEl)
		}
	}, [modalRoot])

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

	const handleClickOutside = (
		event: React.MouseEvent<HTMLDivElement, MouseEvent>
	) => {
		if (event.target === event.currentTarget) {
			onClose()
		}
	}

	return ReactDOM.createPortal(
		<div
			className="modal"
			onClick={handleClickOutside}
			role="dialog"
			aria-modal="true"
		>
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
					className="modal__input"
				/>
				<button onClick={handleSaveProfile} className="modal__button">
					{profileToEdit ? "Save" : "Add"}
				</button>
			</div>
		</div>,
		el.current
	)
}

export default AddProfileModal
