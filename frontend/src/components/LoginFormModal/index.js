import { LoginForm } from "./LoginForm";
import { Modal } from "../../context/Modal";
import { hideModal } from "../../store/ui";
import { useDispatch } from "react-redux";

export const LoginFormModal = () => {
    // const [showModal, toggleShowModal] = useState(false)
    const dispatch = useDispatch()
    

    return (
    <>
        <Modal onClose={() => dispatch(hideModal())}>
            <LoginForm />
        </Modal>
    </>
    )
}