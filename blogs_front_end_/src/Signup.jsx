import { useState } from "react";
import { Link, useNavigate } from 'react-router-dom'
import Nav from "./partials/Nav";
import "./styles/signup_page.css"

function Signup() {

    const[name, setName] = useState("");
    const[email, setEmail] = useState("");
    const[password, setPassword] = useState("");

    const navigate = useNavigate();

    const postUserInput = (e) => {
        e.preventDefault();

        const userCreateReqObj = {name: name, email: email, password: password}

        fetch("http://localhost:5000/api/signup/data", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            }, body: JSON.stringify(userCreateReqObj),
        }).then(response => {
            if(!response.ok){
                throw new Error("*Faild to post blog!*")
            }
            return response.json();
        }).then(data => {
            console.log('Response: ', data);
            navigate("/");
        })
        .catch((err) => console.log(err));
    }

    return <>
        <div className="main-container-signup">
            <Nav/>


            <div className="signup-title">Sign Up for an account!</div>
            
            <form onSubmit={postUserInput}>                
                <label htmlFor="name">Name: </label>
                <input type="text" name="name" id="name" onChange={(e) => setName(e.target.value)}/>

                <label htmlFor="email">Email: </label>
                <input type="email" name="email" id="email" onChange={(e) => setEmail(e.target.value)}/>

                <label htmlFor="password">Password: </label>
                <input type="password" name="password" id="password" onChange={(e) => setPassword(e.target.value)}/>

                <button type="submit">Sign Up</button>
            </form>
            <p className="login-redirect">You have and account? <span className="link-login">
                <Link to="/login">Log in!</Link></span></p>
        </div>
    </>

}

export default Signup