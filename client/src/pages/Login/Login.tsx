'use client'
import './Login.css'
import { Link } from 'react-router-dom'
import { type SyntheticEvent, useState } from "react";
import { useAuth } from "../../hooks/useAuth.ts";
import Branding from "../../components/Branding/Branding.tsx";
import InputField from "../../components/InputField/InputField.tsx";
import SocialsButtonGrp from "../../components/SocialsButtonGrp/SocialsButtonGrp.tsx";


const Login = () => {
    const { handleLogin } = useAuth();
    const [ data, setData ] = useState({
        email: '',
        password: ''
    })

    const onSubmit = async (e: SyntheticEvent<HTMLFormElement>) => {
        e.preventDefault();
        await handleLogin(data)
    }

    return (
        <main className='login-main-page'>
            <Branding/>

            <section className='login-card-section'>
                <div className='login-card'>
                    <div className='login-card-header'>
                            <h1>Welcome back</h1>
                            <p>Please enter your details to continue</p>
                            </div>

                            <form
                            onSubmit={onSubmit}
                        className='login-card-form'
                    >
                        <div className='input-container'>
                            <label className='input-label'>EMAIL ADDRESS</label>
                            <InputField
                                inputType="text"
                                inputValue={data.email}
                                inputPlaceholder={"you@example.com"}
                                inputMaxLength={20}
                                onChange={(e) => setData({...data, email: e.target.value})}
                            />
                        </div>

                        <div className='input-container'>
                            <label className='input-label'>PASSWORD</label>

                            <InputField
                                inputType="password"
                                inputValue={data.password}
                                inputPlaceholder={'Enter your password'}
                                inputMaxLength={16}
                                onChange={(e) => setData({...data, password: e.target.value})}
                            />
                        </div>

                        <div className='login-forgot-pass-btn'>
                            <Link to='/auth/forgot-password'>
                                Forgot password?
                            </Link>
                        </div>

                        <input
                            type='submit'
                            value="Login"
                            className='login-btn'
                        />
                    </form>

                    <div className='divider'>
                        <span>Or continue with</span>
                    </div>

                   <SocialsButtonGrp/>

                    <div className="signup-row">
                        <p>Don't have an account?</p>
                        <Link to={'/Signup'}>
                            Sign up free
                        </Link>
                    </div>
                </div>
            </section>
        </main>
    )
}

export default Login