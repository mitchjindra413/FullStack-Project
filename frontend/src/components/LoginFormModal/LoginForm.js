import { useState } from "react"
import { useDispatch } from "react-redux"
import { login } from "../../store/session"
import './LoginForm.css'
import { hideModal } from "../../store/ui"


export const LoginForm = () => {
    const dispatch = useDispatch()
    
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [errors, setErrors] = useState([])

    const handleSubmit = (e) => {
        e.preventDefault()
        setErrors([])


        return dispatch(login({ email, password }))
            .catch(async (res) => {
                let data;
                try {
                    data = await res.clone().json()
                } catch {
                    data = await res.text()
                }
                if (data?.errors) setErrors(data.errors)
                else if (data) setErrors([data])
                else setErrors([res.statusText])
                
            })        

    }

    return (
        <div className='modal-form'>
        <form  onSubmit={handleSubmit}>
            <header>
                <div>
                    <button onClick={() => dispatch(hideModal())}>X</button>
                </div>
                <h3>Log in</h3>
            </header>
                <hr></hr>
            <h1 id="login-title">Welcome to Breezebnb</h1>
            <div>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    placeholder="Email"
                />
            </div>
            <div>
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    placeholder="Password"
                />
            </div>
            <ul className="error-list">
                {errors.map(error => <li key={error}>{error}</li>)}
            </ul>
            <div className='submit-div'>
                <button type="submit">Log in</button>
            </div>
            <div id='line-div'>
                <div className="line"><hr></hr></div>
                    <div id='or'>or</div>
                <div className="line"><hr></hr></div>
            </div>
        </form>
            <div id='other-buttons-div'>
                <button className='other-buttons-login'><img src="https://a0.muscache.com/defaults/user_pic-50x50.png?v=3" alt=""></img>Log in with demo</button>
                <a href="https://github.com/mitchjindra413" target="_blank"><button className='other-buttons-login'><img src="https://breezebnb-seed.s3.us-west-1.amazonaws.com/assets/GitHub-Mark-64px.png"></img>Creator's github</button></a>
            </div>
        </div>
    )
}