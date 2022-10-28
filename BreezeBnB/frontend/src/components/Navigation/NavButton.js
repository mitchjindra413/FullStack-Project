import { useEffect, useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { logout } from "../../store/session"
import { LoginFormModal } from "../LoginFormModal"

export const NavButton = () => {
    const dispatch = useDispatch()
    const [showMenu, setShowMenu] = useState(false)
    const user = useSelector(state => state.session.user)

    const openMenu = () => {
        if (showMenu) return;
        setShowMenu(true);
    }

    useEffect(() => {
        if (!showMenu) return

        const closeMenu = () => {
            setShowMenu(false)
        }

        document.addEventListener('click', closeMenu);

        return () => document.removeEventListener('click', closeMenu)
    }, [showMenu])



    return (
        <>
            <div>
                <button id="nav-button" onClick={openMenu}>
                    <div id="nav-button-pics">
                        <div id='three-bars'>
                            <i className="fa-sharp fa-solid fa-bars"></i>
                        </div>
                        <div id='profile-pic-nav'>
                            <img className="profile-pic" src="https://a0.muscache.com/defaults/user_pic-50x50.png?v=3" alt=""></img>
                        </div>
                    </div>
                </button>
            </div>
            <div id='dropdown-menu'>
                {!user &&(
                    <div id='not-logged-in'>
                        <LoginFormModal></LoginFormModal>
                        <button>Sign up</button>
                    </div>
                    
                )}
                {user && (
                    <div id=''>
                    </div>
                )}
            </div> 
        </>
    )
}