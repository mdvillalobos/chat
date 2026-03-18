import './ProfileRegistration.css'
import InputField from "../../components/InputField/InputField.tsx";
import {useState} from "react";

const ProfileRegistration = () => {
    const [ userInfo, setUserInfo ] = useState({
        firstName: '',
        lastName: '',
        contactNumber: '',
    })
    return (
        <main className='profile-registration-main'>
            <div className='profile-registration-name-container'>
                <div className='profile-registration-input-container'>
                    <label>First name</label>
                    <InputField
                        type={'text'}
                        value={userInfo.firstName}
                        placeholder={'John'}
                        maxLength={20}
                        onChange={(e) => setUserInfo({ ...userInfo, firstName: e.target.value })}
                    />
                </div>

                <div>
                    <label>Last name</label>
                    <InputField
                        type={'text'}
                        value={userInfo.lastName}
                        placeholder={'Doe'}
                        maxLength={20}
                        onChange={(e) => setUserInfo({ ...userInfo, lastName: e.target.value })}
                    />
                </div>
            </div>

            <div>
                <label>Contact Number</label>
                <InputField
                    type={'text'}
                    value={userInfo.lastName}
                    placeholder={'Doe'}
                    maxLength={20}
                    onChange={(e) => setUserInfo({ ...userInfo, lastName: e.target.value })}
                />
            </div>
        </main>
    )
}

export default ProfileRegistration