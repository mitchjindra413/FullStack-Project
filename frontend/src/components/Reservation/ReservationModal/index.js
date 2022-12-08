import { Modal } from "../../../context/Modal";
import { hideModal } from "../../../store/ui";
import { useDispatch } from "react-redux";
import { SuccessfulReservation } from "./SuccessfulReservation";

export const SuccessfulReservationModal = () => {
    const dispatch = useDispatch()

    return (
        <>
            <Modal onClose={() => dispatch(hideModal())}>
                <SuccessfulReservation></SuccessfulReservation>
            </Modal>
        </>
    )
}