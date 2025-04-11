import { useEffect, useState } from "react"
import { Link } from 'react-router-dom'
import "./partials_styles/nav_n_footer.css"



export default function NavLoggedIn() {

    const[user, setUser] = useState({user: null});

    useEffect(() => {
        const getUserIfExists = async() => {
            await fetch("http://localhost:5000/api/account/data", {
                method: "GET",
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include',
            })
            .then(response => response.json())
            .then(userObj => {
                setUser(userObj)})
            .catch(err => console.log(err));
        }
        getUserIfExists();
    }, []);

    function UserExistsCheck(){
        if(user.user == null){
            return <li><Link to="/signup">Sign Up</Link></li>
        }else{
            return <>
                <li><Link to="/create">Create Blogs</Link></li>
                <li><Link to="/account">Accoutn</Link></li>
            </>
        }
    }

    return <nav>
            <div class="site-title">
                <p>Blogify</p>
            </div>
            <ul>
                {/* <li><a href="/">Blogs</a></li> */}
                {/* <li><a href="/create">Create blogs</a></li>  */}
                <li><Link to="/">Blogs</Link></li>
                <UserExistsCheck/>
            </ul>
        </nav>

}