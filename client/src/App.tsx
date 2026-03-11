import './assets/css/App.css'
import { Toaster } from "sileo";
import { Route, Routes } from "react-router-dom";
import Login from "./pages/Login/Login.tsx";
import ProtectedRoutes from "./components/ProtectedRoutes/ProtectedRoutes.tsx";
import Chat from "./pages/Chat/Chat.tsx"
import Signup from "./pages/Signup/Signup.tsx";

const App = () => {
    return (
        <>
            <Toaster position="top-right" />
            <Routes>
                <Route
                    path='/'
                    element={
                        <ProtectedRoutes isAuthPage={true}>
                            <Login />
                        </ProtectedRoutes>
                    }
                />
                <Route
                    path="/login"
                    element={
                        <ProtectedRoutes isAuthPage={true}>
                            <Login />
                        </ProtectedRoutes>
                    }
                />

                <Route
                    path="/signup"
                    element={
                        <ProtectedRoutes isAuthPage={true}>
                            <Signup />
                        </ProtectedRoutes>
                    }
                />

                <Route
                    path='/chat'
                    element={
                        <ProtectedRoutes>
                            <Chat />
                        </ProtectedRoutes>
                    }
                />
            </Routes>
        </>
    )
}

export default App
