import { SignupForm } from "./SignupForm";
import { Modal } from "../../context/Modal";
import { hideModal } from "../../store/ui";
import { useDispatch } from "react-redux";

export const SignupFormModal = () => {
    const dispatch = useDispatch()

    return (
        <>
            <Modal onClose={() => dispatch(hideModal())}>
                <SignupForm></SignupForm>
            </Modal>
        </>
    )
}