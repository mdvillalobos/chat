import './Login.css'
import { Link } from 'react-router-dom'
import { type SyntheticEvent, useState } from "react";
import { useAuth } from "../../hooks/useAuth.ts";
import Branding from "../../components/Branding/Branding.tsx";
import InputField from "../../components/InputField/InputField.tsx";
import SocialsButtonGrp from "../../components/SocialsButtonGrp/SocialsButtonGrp.tsx";
import Button from "../../components/Button/Button.tsx";

import { TbEye } from "react-icons/tb";
import { TbEyeClosed } from "react-icons/tb";

const Login = () => {
    const { handleLogin } = useAuth();
    const [ isSubmitting, setSubmitting ] = useState(false);
    const [ isShowPassword, setIsShowPassword ] = useState(false);
    const [ data, setData ] = useState({
        email: '',
        password: ''
    })

    const onSubmit = async (e: SyntheticEvent<HTMLFormElement>) => {
        e.preventDefault();
        setSubmitting(true);
        await handleLogin(data)
        setSubmitting(false)
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
                                type="text"
                                value={data.email}
                                placeholder={"you@example.com"}
                                maxLength={40}
                                onChange={(e) => setData({...data, email: e.target.value})}
                            />
                        </div>

                        <div className='input-container'>
                            <label className='input-label'>PASSWORD</label>

                            <InputField
                                type={isShowPassword ? 'text' : 'password'}
                                value={data.password}
                                placeholder={'Enter your password'}
                                maxLength={16}
                                onChange={(e) => setData({...data, password: e.target.value})}
                                Icon={isShowPassword ? TbEye : TbEyeClosed}
                                IconOnClick={() => setIsShowPassword(!isShowPassword)}
                            />
                        </div>

                        <div className='login-forgot-pass-btn'>
                            <Link to='/auth/forgot-password'>
                                Forgot password?
                            </Link>
                        </div>


                        <Button
                            type={'submit'}
                            value={'Login'}
                            isSubmitting={isSubmitting}
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