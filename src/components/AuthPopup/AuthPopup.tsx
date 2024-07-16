import React, { useState } from 'react';
import './AuthPopup.css';
import Image from 'next/image';
import logo from '@/assets/fitgf.png';
import Input from '@mui/joy/Input';
import Select from '@mui/joy/Select';
import Option from '@mui/joy/Option';
import { AiOutlineClose } from 'react-icons/ai';
import dayjs from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DesktopDatePicker } from '@mui/x-date-pickers';
import { ToastContainer, toast } from 'react-toastify';

interface AuthPopupProps {
    setShowpopup: React.Dispatch<React.SetStateAction<boolean>>;
}

interface SignupFormData {
    name: string | null;
    email: string | null;
    password: string | null;
    weightInKg: number | null;
    heightInCm: number | null;
    goal: string | null;
    gender: string | null;
    dob: Date | null;
    activityLevel: string | null;
}

const AuthPopup: React.FC<AuthPopupProps> = ({ setShowpopup }) => {
    const [showSignup, setShowSignup] = useState<boolean>(false);
    const [signupformData, setSignupFormData] = useState<SignupFormData>({
        name: '',
        email: '',
        password: '',
        weightInKg: 0.0,
        heightInCm: 0.0,
        goal: '',
        gender: '',
        dob: new Date(),
        activityLevel: ''
    });
    const [loginformData, setLoginFormData] = useState({
        email: '',
        password: '',
    });
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false); // Add a state to track login status

    const handleLogin = () => {
        console.log(loginformData);
        fetch(process.env.NEXT_PUBLIC_BACKEND_API + '/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(loginformData),
            credentials: 'include'
        })
        .then(res => res.json())
        .then(data => {
            console.log(data);
            if (data.ok) {
                toast.success(data.message);
                setIsLoggedIn(true); // Update the login status
                setShowpopup(false);
            } else {
                toast.error(data.message);
            }
        }).catch(err => {
            console.log(err);
        });
    };

    const handleSignup = () => {
        fetch(process.env.NEXT_PUBLIC_BACKEND_API + '/auth/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(signupformData),
            credentials: 'include'
        })
        .then(res => res.json())
        .then(data => {
            console.log(data);
            if (data.ok) {
                toast.success(data.message);
                setShowSignup(false);
            } else {
                toast.error(data.message);
            }
        }).catch(err => {
            console.log(err);
        });
    };

    const handleLogout = () => {
        fetch(process.env.NEXT_PUBLIC_BACKEND_API + '/auth/logout', {
            method: 'POST',
            credentials: 'include' // Ensure cookies are sent with the request
        })
        .then(res => res.json())
        .then(data => {
            console.log(data);
            if (data.ok) {
                toast.success('Logout successful');
                setIsLoggedIn(false); // Update the login status
                setShowpopup(false); // Close the popup after logout
            } else {
                toast.error(data.message);
            }
        })
        .catch(err => {
            console.log(err);
        });
    };

    return (
        <div className='popup'>
            <button className='close'
                onClick={() => setShowpopup(false)}
            >
                <AiOutlineClose />
            </button>
            {isLoggedIn ? (
                <div className='authform'>
                    <div className='left'>
                        <Image src={logo} alt="Logo" />
                    </div>
                    <div className='right'>
                        <h1>Welcome back!</h1>
                        <button onClick={handleLogout}>Logout</button>
                    </div>
                </div>
            ) : (
                showSignup ? (
                    <div className='authform'>
                        <div className='left'>
                            <Image src={logo} alt="Logo" />
                        </div>
                        <div className='right'>
                            <h1>Signup to become a freak</h1>
                            <form>
                                <Input
                                    color="warning"
                                    placeholder="name"
                                    size="lg"
                                    variant="solid"
                                    onChange={(e) => setSignupFormData(prevData => ({
                                        ...prevData,
                                        name: e.target.value
                                    }))}
                                />
                                <Input
                                    color="warning"
                                    placeholder="email"
                                    size="lg"
                                    variant="solid"
                                    onChange={(e) => setSignupFormData(prevData => ({
                                        ...prevData,
                                        email: e.target.value
                                    }))}
                                />
                                <Input
                                    color="warning"
                                    placeholder="password"
                                    size="lg"
                                    variant="solid"
                                    type='password'
                                    onChange={(e) => setSignupFormData(prevData => ({
                                        ...prevData,
                                        password: e.target.value
                                    }))}
                                />
                                <Input
                                    color="warning"
                                    size="lg"
                                    variant="solid"
                                    type="number"
                                    placeholder='Weight in kg'
                                    onChange={(e) => setSignupFormData(prevData => ({
                                        ...prevData,
                                        weightInKg: parseFloat(e.target.value)
                                    }))}
                                />
                                <Select
                                    color="warning"
                                    placeholder="Activity Level"
                                    size="lg"
                                    variant="solid"
                                    onChange={(event, newValue) => setSignupFormData(prevData => ({
                                        ...prevData,
                                        activityLevel: newValue?.toString() || ''
                                    }))}
                                >
                                    <Option value="sedentary">Sedentary</Option>
                                    <Option value="light">Light</Option>
                                    <Option value="moderate">Moderate</Option>
                                    <Option value="active">Active</Option>
                                    <Option value="veryActive">Very Active</Option>
                                </Select>
                                <Select
                                    color="warning"
                                    placeholder="Goal"
                                    size="lg"
                                    variant="solid"
                                    onChange={(event, newValue) => setSignupFormData(prevData => ({
                                        ...prevData,
                                        goal: newValue?.toString() || ''
                                    }))}
                                >
                                    <Option value="weightLoss">Lose</Option>
                                    <Option value="weightMaintain">Maintain</Option>
                                    <Option value="weightGain">Gain</Option>
                                </Select>
                                <Select
                                    color="warning"
                                    placeholder="Gender"
                                    size="lg"
                                    variant="solid"
                                    onChange={(event, newValue) => setSignupFormData(prevData => ({
                                        ...prevData,
                                        gender: newValue?.toString() || ''
                                    }))}
                                >
                                    <Option value="male">Male</Option>
                                    <Option value="female">Female</Option>
                                    <Option value="other">Other</Option>
                                </Select>
                                <label>Height</label>
                                <Input
                                    color="warning"
                                    size="lg"
                                    variant="solid"
                                    type="number"
                                    placeholder='cm'
                                    onChange={(e) => setSignupFormData(prevData => ({
                                        ...prevData,
                                        heightInCm: parseFloat(e.target.value)
                                    }))}
                                />
                                <label>Date of Birth</label>
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <DesktopDatePicker
                                        defaultValue={dayjs(new Date())}
                                        sx={{ backgroundColor: 'white' }}
                                        onChange={(newValue) => setSignupFormData(prevData => ({
                                            ...prevData,
                                            dob: new Date(newValue as any)
                                        }))}
                                    />
                                </LocalizationProvider>
                                <button
                                    onClick={(e) => {
                                        e.preventDefault();
                                        handleSignup();
                                    }}
                                >Signup</button>
                            </form>
                            <p>Already have an account? <button onClick={() => setShowSignup(false)}>Login</button></p>
                        </div>
                    </div>
                ) : (
                    <div className='authform'>
                        <div className='left'>
                            <Image src={logo} alt="Logo" />
                        </div>
                        <div className='right'>
                            <h1>Login to become a freak</h1>
                            <form>
                                <Input
                                    color="warning"
                                    placeholder="email"
                                    size="lg"
                                    variant="solid"
                                    onChange={(e) => setLoginFormData(prevData => ({
                                        ...prevData,
                                        email: e.target.value
                                    }))}
                                />
                                <Input
                                    color="warning"
                                    placeholder="password"
                                    size="lg"
                                    variant="solid"
                                    type='password'
                                    onChange={(e) => setLoginFormData(prevData => ({
                                        ...prevData,
                                        password: e.target.value
                                    }))}
                                />
                                <button
                                    onClick={(e) => {
                                        e.preventDefault();
                                        handleLogin();
                                    }}
                                >Login</button>
                            </form>
                            <p>Don't have an account? <button onClick={() => setShowSignup(true)}>Signup</button></p>
                        </div>
                    </div>
                )
            )}
        </div>
    );
};

export default AuthPopup;
