import './SocialButtonGrp.css'
import { FcGoogle } from "react-icons/fc";
import { BsApple}  from "react-icons/bs";
import { FaFacebook } from "react-icons/fa";

const SocialsButtonGrp = () => {
    return (
        <div className='socials-btn-grp'>
            <button className='socials-btn'>
                <span className='google'>
                    <FcGoogle/>
                </span>
                <p>Google</p>
            </button>

            <button className='socials-btn'>
                <span className='apple'>
                    <BsApple/>
                </span>
                <p>Apple</p>
            </button>

            <button className='socials-btn'>
                <span className='facebook'>
                    <FaFacebook/>
                </span>
                <p>Facebook</p>
            </button>
        </div>
    )
}

export default SocialsButtonGrp