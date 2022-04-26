import React, {useState} from 'react';
import {useNavigate} from "react-router-dom";
import {useProfile} from "../../contexts/profile-context";

const Signin = () => {
    const [credentials, setCredentials] = useState({});
    const navigate = useNavigate();
    const {signin} = useProfile();

    const handleSigninButton = async () => {
        try {
            signin(credentials)
            navigate('/browse-books')
        } catch (e) {
            alert(e)
        }
    }

    return (
        <div>
            <h1>Sign In</h1>
            <input className="mb-2 form-control"
                   onChange={(e) =>
                       setCredentials({...credentials, email: e.target.value})}
                   placeholder="email"/>
            <input className="mb-2 form-control"
                   onChange={(e) =>
                       setCredentials({...credentials, password: e.target.value})}
                   placeholder="password" type="password"/>
            <button onClick={handleSigninButton}
                    className="btn btn-primary mb-5">Sign In
            </button>
        </div>
    );
};

export default Signin;