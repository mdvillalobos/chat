import './Signup.css'
import { type SyntheticEvent, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth.ts";
import Branding from "../../components/Branding/Branding.tsx";
import InputField from "../../components/InputField/InputField.tsx";
import SocialsButtonGrp from "../../components/SocialsButtonGrp/SocialsButtonGrp.tsx";


const Signup = () => {
    const { handleSignUp } = useAuth();
    const [ data, setData ] = useState({
        email: '',
        password: '',
        confirmPassword: '',
    })

    const onSubmit = async (e: SyntheticEvent<HTMLFormElement>) => {
        e.preventDefault();
        await handleSignUp(data)
    }
    return (
        <main className='signup-main-page'>
            <Branding/>

            <section className='signup-card-section'>
                <div className='signup-card'>
                    <div className='signup-card-header'>
                        <h1>Welcome back</h1>
                        <p>Please enter your details to continue</p>
                    </div>

                    <form
                        className='signup-card-form'
                        onSubmit={onSubmit }
                    >
                        <div className='input-container'>
                            <label className='input-label'>EMAIL ADDRESS</label>
                            <InputField
                                inputType="text"
                                inputValue={data.email}
                                inputPlaceholder={"john@example.com"}
                                inputMaxLength={40}
                                onChange={(e) => setData({...data, email: e.target.value})}
                            />
                        </div>

                        <div className='input-container'>
                            <label className='input-label'>PASSWORD</label>

                            <InputField
                                inputType="password"
                                inputValue={data.password}
                                inputPlaceholder={'Min. 8 characters'}
                                inputMaxLength={16}
                                onChange={(e) => setData({...data, password: e.target.value})}
                            />
                        </div>

                        <div className='input-container'>
                            <label className='input-label'>PASSWORD</label>

                            <InputField
                                inputType="password"
                                inputValue={data.confirmPassword}
                                inputPlaceholder={'Min. 8 characters'}
                                inputMaxLength={16}
                                onChange={(e) => setData({...data, confirmPassword: e.target.value})}
                            />
                        </div>


                        <input
                            type='submit'
                            value="Create Account"
                            className='signup-btn'
                        />
                    </form>

                    <div className='divider'>
                        <span>Or continue with</span>
                    </div>

                    <SocialsButtonGrp/>

                    <div className="sign-in-row">
                        <p>Already have an account?</p>
                        <Link to={'/Login'}>
                            Sign in
                        </Link>
                    </div>
                </div>
            </section>
        </main>
    )
}

export default Signup;