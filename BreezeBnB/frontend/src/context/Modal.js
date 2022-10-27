import { createContext, useContext, useEffect, useRef, useState } from "react";
import './Modal.css'

const ModalContext = createContext()

export const ModalProvider = ({children}) => {
    const modalRef = useRef();
    const [value, setValue] = useState();

    useEffect(() => {
        setValue(modalRef.current)
    }, [])

    return (
        <>
            <ModalContext.Provider value={value}>
                {children}
            </ModalContext.Provider>
            <div ref={modalRef} />
        </>
    )
}

export const Modal = ({ onClose, children }) => {
    const modalNode = useContext(ModalContext)


    return (
        <div id="modal">
            <div id="modal-background" onClick={onClose}></div>
            <div id="modal-content">
                {children}
            </div>
        </div>
    )
}