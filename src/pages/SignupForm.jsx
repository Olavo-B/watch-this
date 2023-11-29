import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import useAuth from "../hooks/UseAuth";
import HomeButton from '../components/HomeButton';



const SignupForm = () => {

    const [username , setUsername] = useState("");
    const [usernameConfirm , setUsernameConfirm] = useState("");
    const [password , setPassword] = useState("");
    const [error , setError] = useState("");
    const navigate = useNavigate();


    const { signup } = useAuth();

    const handleSignup = () => {
        if(!username | !usernameConfirm | !password){
            setError("Fill in all fields");
            alert("Fill in all fields");
            return;
        }

        if(username !== usernameConfirm){
            setError("Usernames do not match");
            alert("Usernames do not match");
            return;
        }

        const res = signup(username , password);

        if(res){
            setError(res);
            alert(res);
            return;
        }

        navigate('/login');


      
    };

    return (
        <div>
            <div className="login-container">
                <div className="containerForm">
                    <input
                        type="text"
                        placeholder="Username"
                        value={username}
                        onChange={(e) => [setUsername(e.target.value) , setError("")]}
                    />
                </div>
                <div className="containerForm">
                    <input
                        type="text"
                        placeholder="Confirm Username"
                        value={usernameConfirm}
                        onChange={(e) => [setUsernameConfirm(e.target.value) , setError("")]}
                    />
                </div>
                <div className="containerForm">
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => [setPassword(e.target.value) , setError("")]}
                    />
                </div>
  
                    <button onClick={handleSignup} className="btn">Sign Up</button>
            
       
                    <Link to="/login">Already have an account?</Link>
              
            </div>

            <div className="icons">
                <HomeButton />
            </div>
        </div>
    );
}

export default SignupForm;
