import './Signup.css'
import { type SyntheticEvent, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth.ts";
import Branding from "../../components/Branding/Branding.tsx";
import InputField from "../../components/InputField/InputField.tsx";
import SocialsButtonGrp from "../../components/SocialsButtonGrp/SocialsButtonGrp.tsx";
import Button from "../../components/Button/Button.tsx";

import { TbEye, TbEyeClosed } from "react-icons/tb";

const Signup = () => {
    const { handleSignUp } = useAuth();

    const [ isShowPassword, setIsShowPassword ] = useState(false);
    const [ isShowConfirmPassword, setIsShowConfirmPassword] = useState(false);

    const [ data, setData ] = useState({
        firstName: '',
        lastName: '',
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
                        onSubmit={onSubmit}
                    >
                        <div className='signup-name-container'>
                            <div className='input-container'>
                                <label className='input-label'>FIRST NAME</label>
                                <InputField
                                    type="text"
                                    value={data.firstName}
                                    placeholder={"John"}
                                    maxLength={20}
                                    onChange={(e) => setData({...data, firstName: e.target.value})}
                                />
                            </div>

                            <div className='input-container'>
                                <label className='input-label'>LAST NAME</label>
                                <InputField
                                    type="text"
                                    value={data.lastName}
                                    placeholder={"Doe"}
                                    maxLength={20}
                                    onChange={(e) => setData({...data, lastName: e.target.value})}
                                />
                            </div>
                        </div>

                        <div className='input-container'>
                            <label className='input-label'>EMAIL ADDRESS</label>
                            <InputField
                                type="text"
                                value={data.email}
                                placeholder={"john@example.com"}
                                maxLength={40}
                                onChange={(e) => setData({...data, email: e.target.value})}
                            />
                        </div>

                        <div className='input-container'>
                            <label className='input-label'>PASSWORD</label>

                            <InputField
                                type={isShowPassword ? 'text' : 'password'}
                                value={data.password}
                                placeholder={'Min. 8 characters'}
                                maxLength={16}
                                onChange={(e) => setData({...data, password: e.target.value})}
                                Icon={isShowPassword ? TbEye : TbEyeClosed}
                                IconOnClick={() => setIsShowPassword(!isShowPassword)}
                            />
                        </div>

                        <div className='input-container'>
                            <label className='input-label'>PASSWORD</label>

                            <InputField
                                type={isShowConfirmPassword ? 'text' : 'password'}
                                value={data.confirmPassword}
                                placeholder={'Min. 8 characters'}
                                maxLength={16}
                                onChange={(e) => setData({...data, confirmPassword: e.target.value})}
                                Icon={isShowConfirmPassword ? TbEye : TbEyeClosed}
                                IconOnClick={() => setIsShowConfirmPassword(!isShowConfirmPassword)}
                            />
                        </div>


                        <Button
                            type={'submit'}
                            value={'Create Account'}
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