import { useState } from "react"
import { useDispatch } from "react-redux"
import { signup } from "../../store/session"
import './SignupForm.css'
import { hideModal } from "../../store/ui"

export const SignupForm = () => {
    const dispatch = useDispatch()

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [birthdate, setBirthdate] = useState('')
    const [first_name, setFirstName] = useState('')
    const [last_name, setLastName] = useState('')
    const [errors, setErrors] = useState([])

    const handleSubmit = (e) => {
        e.preventDefault()
        setErrors([])

        return dispatch(signup({ email, password, birthdate, first_name, last_name }))
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
        <form id='signup-form' onSubmit={handleSubmit}>
            <header>
                <div>
                    <button onClick={() => dispatch(hideModal())}>X</button>
                </div>
                <h3>Sign up</h3>
            </header>
            <hr></hr>
            <h1 id="login-title">Welcome to Breezebnb</h1>
            <ul>
                {errors.map(error => <li key={error}>{error}</li>)}
            </ul>
            <div>
                <input
                    type="text"
                    value={first_name}
                    onChange={(e) => setFirstName(e.target.value)}
                    required
                    placeholder="First Name"
                />
            </div>
            <div>
                <input
                    type="text"
                    value={last_name}
                    onChange={(e) => setLastName(e.target.value)}
                    required
                    placeholder="Last Name"
                />
            </div>
            <div>
                <input
                    type="date"
                    value={birthdate}
                    onChange={(e) => setBirthdate(e.target.value)}
                    required
                    placeholder="Birthdate: YYYY-MM-DD"
                />
            </div>
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
        </form>
    )
}