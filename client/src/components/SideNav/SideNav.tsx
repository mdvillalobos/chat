import './SideNav.css'
import { useUser } from "../../../context/userContext.tsx";
import { TbSettingsFilled } from "react-icons/tb";


const SideNav = () => {
    const { user } = useUser();

    return (
        <section className='side-nav-section'>
            <p className="brand-logo-icon">M</p>

            <div className='side-nav-utils'>
                <TbSettingsFilled/>
                <TbSettingsFilled/>
                <TbSettingsFilled/>
                <TbSettingsFilled/>
            </div>

            <TbSettingsFilled/>
        </section>
    )
}

export default SideNav