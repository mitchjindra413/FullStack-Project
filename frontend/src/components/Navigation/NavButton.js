import { useEffect, useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { Link } from "react-router-dom"
import { logout } from "../../store/session"
import { showModal, showSignupModal } from "../../store/ui"
import blank from './image.jpg'

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
                    <li onClick={handleLoginButton} style={{cursor: 'pointer'}}>Log in</li>
                    <li onClick={handleSignupButton} style={{ cursor: 'pointer' }}>Sign up</li>
                    <hr style={{color: '#ebebeb'}}></hr>
                    <a href="https://www.linkedin.com/in/mitchell-jindra/" target="_blank" rel="noreferrer"><li>LinkedIn</li></a>
                    <a href="https://mitchjindra413.github.io/Portfolio-Website/" target="_blank" rel="noreferrer"><li>Portfolio</li></a>
                    <a href="https://github.com/mitchjindra413/FullStack-Project" target="_blank" rel="noreferrer"><li>Github</li></a>
                </ul >
            )
        } else if (showMenu && user) {
            return (
            <ul className="profile-dropdown">
                {/* <li>
                    <Link to='/profile'>
                        <button>Profile</button>
                    </Link>
                </li> */}
                    <Link to='/trips'>
                        <li>Trips</li>
                    </Link>
                    <li onClick={() => dispatch(logout())} style={{ cursor: 'pointer' }}>Log Out</li>
                <hr style={{ color: '#ebebeb' }}></hr>
                    <a href="https://www.linkedin.com/in/mitchell-jindra/" target="_blank" rel="noreferrer"><li>LinkedIn</li></a>
                    <a href="https://mitchjindra413.github.io/Portfolio-Website/" target="_blank" rel="noreferrer"><li>Portfolio</li></a>
                    <a href="https://github.com/mitchjindra413/FullStack-Project" target="_blank" rel="noreferrer"><li>Github</li></a>
            </ul>
            )
        }
    }

    const profilePicLink = () => {
        if (!user){
            return blank
        }else if(user && !user.profilePic){
            return "https://a0.muscache.com/defaults/user_pic-50x50.png?v=3"
        } else{
            return user.profilePic
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
                            <img className="profile-pic" src={profilePicLink()} alt=""></img>
                        </div>
                    </div>
                </button>
                {whichButtons()}
            </div>
        </>

    )
}