import { useState } from "react"

function Login() {

    const[email, setEmail] = useState("")
    const[password, setPassword] = useState("")

    userInputObj = {email: email, password: password}


    function getUserInfo(e) {
        e.preventDefault();

        fetch("http://localhost:5000/api/blogs/data", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            }, body: JSON.stringify(userInputObj),
        }).then(response => {
            if(!response.ok){
                throw new Error("*Faild to post blog!*")
            }
            return response.json();
        }).then(data => console.log('Response: ', data))
        .catch((err) => console.log(err));
    }

    return <>
    
        <div id="main-container-login">
            <div className="login-title">Login</div>
            
            <form onSubmit={getUserInfo}>                

                <label for="email">Email: </label>
                <input type="email" name="email" id="email" onChange={(e) => setEmail(e.target.value)} />

                <label for="password">Password: </label>
                <input type="password" name="password" id="password" onChange={(e) => setPassword(e.target.value)} />

                <button type="submit">Log In</button>
            </form>
        </div>
    
    </>

}

export default Login