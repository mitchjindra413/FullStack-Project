import { useState } from "react";
import { LoginForm } from "./LoginForm";
import { Modal } from "../../context/Modal";

export const LoginFormModal = () => {
    const [showModal, toggleShowModal] = useState(false)

    return (
    <>
        <button onClick={() => toggleShowModal(true)}>Log In</button>
        {showModal && (
            <Modal onClose={() => toggleShowModal(false)}>
                <LoginForm />
            </Modal>
            )
        }
    </>
    )
}