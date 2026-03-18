import { sileo } from "sileo";
import axiosInstance from "../utils/axiosUtil.ts";
import { useNavigate } from "react-router-dom";
import {useUser} from "../../context/userContext.tsx";

type LoginTypes = {
    email: string;
    password: string;
}

type SignupTypes = {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    confirmPassword: string;
}

export const useAuth = () => {
    const navigate = useNavigate();
    const { setUser } = useUser();

    const handleLogin = async ({ email, password }: LoginTypes) => {
        if(!email || !password) {
            return sileo.error({
                title: "Login failed!",
                description: "All fields are required!",
                fill: "#171717",
                styles: {
                    title: "text-white!",
                    description: "text-white/75!",
                },
            });
        }

        try {
            const { data } = await axiosInstance.post('/api/auth/login', {
                email: email,
                password: password,
            })

            sileo.success({
                title: "Success",
                description: data.message || "Login successful",
                fill: "#171717",
                styles: {
                    title: "text-white!",
                    description: "text-white/75!",
                },
            });

            setUser(data.data)
            return navigate('/chat')
        } catch(error: any) {
            const message = error.response?.data?.message || "Something went wrong";

            sileo.error({
                title: "Login failed",
                description: message,
                fill: "#171717",
                styles: {
                    title: "text-white!",
                    description: "text-white/75!",
                },
            });
        }
    }

    const handleSignUp = async ({ firstName, lastName, email, password, confirmPassword }: SignupTypes) => {
        if(!firstName || !lastName ||  !email || !password || !confirmPassword) {
            return sileo.error({
                title: "Login error",
                description: "Required all fields!",
            });
        }

        if(password.length < 8) {
            return sileo.error({
                title: "Login error",
                description: "Password is too short!",
                fill: "#171717",
                styles: {
                    title: "text-white!",
                    description: "text-white/75!",
                },
            });
        }

        if(password !== confirmPassword) {
            return sileo.error({
                title: "Login error",
                description: "Password do not match",
                fill: "#171717",
                styles: {
                    title: "text-white!",
                    description: "text-white/75!",
                },
            });
        }
        // if(!isPolicyChecked) {
        //     sileo.error({
        //         title: "Consent required",
        //         description: "Please accept the Privacy Policy.",
        //     });
        //     return;
        // }

        try {
            const { data } = await axiosInstance.post('/api/auth/signup', {
                firstName, lastName, email, password, confirmPassword,
            })

            localStorage.setItem('authToken', data.token)

            sileo.success({
                title: "Success",
                description: data.message || "Login successful",
                fill: "#171717",
                styles: {
                    title: "text-white!",
                    description: "text-white/75!",
                },
            });

        } catch(error: any) {
            const message = error.response?.data?.message || "Something went wrong";

            sileo.error({
                title: "Registration failed",
                description: message,
                fill: "#171717",
                styles: {
                    title: "text-white!",
                    description: "text-white/75!",
                },
            });
        }
    }

    return { handleLogin, handleSignUp }
}