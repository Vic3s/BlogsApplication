import { useState } from "react"
import { useNavigate } from "react-router-dom"
import "./styles/login_page.css"


function Login() {

    const[email, setEmail] = useState("")
    const[password, setPassword] = useState("")

    const navigate = useNavigate();

    function postUserInput(e) {
        e.preventDefault();

        const userLoginReqObj = {email: email, password: password}

        fetch("http://localhost:5000/api/login/data", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
            body: JSON.stringify(userLoginReqObj),
        }).then(response => {
            if(!response.ok){
                throw new Error("* Failed to post to server! *")
            }
            return response.json();
        }).then(data => {
            console.log('Response: ', data)
            navigate("/");
        })
        .catch((err) => console.log(err));

    }

    return <>
    
        <div className="main-container-login">
            <div className="login-title">Log in to your account.</div>
            
            <form onSubmit={postUserInput}>                

                <label htmlFor="email">Email: </label>
                <input type="email" name="email" id="email" onChange={(e) => setEmail(e.target.value)} />

                <label htmlFor="password">Password: </label>
                <input type="password" name="password" id="password" onChange={(e) => setPassword(e.target.value)} />

                <button type="submit">Log In</button>
            </form>
        </div>
    
    </>

}

export default Login