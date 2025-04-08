import { useState } from "react";

function Signup() {

    const[name, setName] = useState("");
    const[email, setEmail] = useState("");
    const[password, setPassword] = useState("");


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
        }).then(data => console.log('Response: ', data))
        .catch((err) => console.log(err));
    }

    return <>
    
        <div id="main-container-signup">
            <div className="signup-title">Signup</div>
            
            <form onSubmit={postUserInput}>                
                <label htmlFor="name">Name: </label>
                <input type="text" name="name" id="name" onChange={(e) => setName(e.target.value)}/>

                <label htmlFor="email">Email: </label>
                <input type="email" name="email" id="email" onChange={(e) => setEmail(e.target.value)}/>

                <label htmlFor="password">Password: </label>
                <input type="password" name="password" id="password" onChange={(e) => setPassword(e.target.value)}/>

                <button type="submit">Sign Up</button>
            </form>
            <p>You have and account? <span className="link-login"><a href="/login">Log in!</a></span></p>
        </div>
    </>

}

export default Signup