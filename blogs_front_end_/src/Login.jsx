import { useState } from "react"

function Login() {

    const[email, setEmail] = useState("")
    const[password, setPassword] = useState("")



    function postUserInput(e) {
        e.preventDefault();

        const userLoginReqObj = {email: email, password: password}

        fetch("http://localhost:5000/api/login/data", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: "include", 
            body: JSON.stringify(userLoginReqObj),
        }).then(response => {
            if(!response.ok){
                throw new Error("*Faild to post guest imput info!*")
            }
            console.log(response)
            return response.json();
        }).then(data => console.log('Response: ', data))
        .catch((err) => console.log(err));
    }

    return <>
    
        <div id="main-container-login">
            <div className="login-title">Login</div>
            
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