import {useState} from "react";
import * as authService from "../../services/auth-service";
// import * as userService from "../../services/users-service";
import {useNavigate} from "react-router-dom";
import {useProfile} from "../../contexts/profile-context";

const Signup = () => {
    const [newUser, setNewUser] = useState({});
    const navigate = useNavigate();
    const {signup} = useProfile();

    const handleSignUpButton = async () => {
        try {
            await signup(newUser)
            navigate('/browse-books')
        } catch (e) {
            alert(e)
        }
    }

    return (
        <div>
            <h1>Signup</h1>
            <input className="mb-2 form-control"
                   onChange={(e) =>
                       setNewUser({...newUser, email: e.target.value})}
                   placeholder="email"/>
            <input className="mb-2 form-control"
                   onChange={(e) =>
                       setNewUser({...newUser, password: e.target.value})}
                   placeholder="password" type="password"/>
            <button onClick={handleSignUpButton}
                    className="btn btn-primary mb-5">Signup
            </button>
        </div>
    );
}

export default Signup;
