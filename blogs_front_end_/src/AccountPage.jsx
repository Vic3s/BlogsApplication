import { useEffect, useState } from "react"

function Account(){

    const[acc, setAcc] = useState({user: null})

    useEffect(()=> {
        const getAcc = async () => {
            await fetch("http://localhost:5000/api/account/data", {
                method: "GET",
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
            })
            .then(response => response.json())
            .then(accObj => {
                setAcc(accObj.user)})
            .catch(err => console.log(err));
        }
        getAcc();
    }, [])


    return  <div id="main-container-accoutn">
                <h1 class="login-title">Account</h1>

                <h2>{acc.name}</h2>
                <h2>{acc.email}</h2>

                <form action="/logout?_method=DELETE" method="post">
                    <button type="submit" id="log-out">Log Out</button>
                    
                </form>

        </div>
}

export default Account