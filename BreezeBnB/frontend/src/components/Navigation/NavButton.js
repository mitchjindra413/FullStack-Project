import { useEffect, useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { logout } from "../../store/session"
import { showModal, showSignupModal } from "../../store/ui"


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

    const handleSignupButton = (e) => {
        e.preventDefault();
        dispatch(showSignupModal());
    };

    const handleLoginButton = () => {
        dispatch(showModal())
    }

    const whichButtons = () => {
        if(showMenu && !user) {
            return (
                <ul className = "profile-dropdown" >
                    <li><button onClick={handleLoginButton}>Log in</button></li>
                    <li><button onClick={handleSignupButton}>Sign up</button></li>
                </ul >
            )
        } else if (showMenu && user) {
            return (
            <ul className="profile-dropdown">
                <li>
                    <button onClick={() => dispatch(logout())}>Log Out</button>
                </li>
            </ul>
            )
        }
    }

    return (
        <>
            <div id='button-dropdown'>
                <button id="nav-button" onClick={openMenu} style={showMenu ? { boxShadow: '0 0 5px 0.5px #dddddd' } : {} }>
                    <div id="nav-button-pics" >
                        <div id='three-bars'>
                            <i className="fa-sharp fa-solid fa-bars"></i>
                        </div>
                        <div id='profile-pic-nav'>
                            <img className="profile-pic" src="https://a0.muscache.com/defaults/user_pic-50x50.png?v=3" alt=""></img>
                        </div>
                    </div>
                </button>
                {whichButtons()}
            </div>
        </>

    )
}