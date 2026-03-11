import { sileo } from "sileo";
import axiosInstance from "../utils/axiosUtil.ts";
import { useNavigate } from "react-router-dom";

type LoginTypes = {
    email: string;
    password: string;
}

type SignupTypes = {
    email: string;
    password: string;
    confirmPassword: string;
}

export const useAuth = () => {

    const handleLogin = async ({ email, password }: LoginTypes) => {
        if(!email || !password) {
            sileo.error({
                title: "Login error",
                description: "Required all fields!",
            });
            return;
        }


        try {
            const { data } = await axiosInstance.post('/api/auth/login', {
                email: email,
                password: password,
            })

            localStorage.setItem('authToken', data.token)

            sileo.success({
                title: "Success",
                description: data.message || "Login successful",
            });

        } catch(error: any) {
            const message = error.response?.data?.message || "Something went wrong";

            sileo.error({
                title: "Login failed",
                description: message,
            });
        }
    }

    const handleSignUp = async ({ email, password, confirmPassword }: SignupTypes) => {
        if(!email || !password || !confirmPassword) {
            sileo.error({
                title: "Login error",
                description: "Required all fields!",
            });
            return;
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
                email: email,
                password: password,
                confirmPassword: confirmPassword,
            })

            localStorage.setItem('authToken', data.token)

            sileo.success({
                title: "Success",
                description: data.message || "Login successful",
            });

        } catch(error: any) {
            const message = error.response?.data?.message || "Something went wrong";

            sileo.error({
                title: "Registration failed",
                description: message,
            });
        }
    }

    return { handleLogin, handleSignUp }
}