import "./partials_styles/nav_n_footer.css"
import { useEffect, useState } from "react"

export default function NavLoggedIn() {

    const[user, setUser] = useState({});

    useEffect(() => {
        const getUserIfExists = async() => {
            await fetch("http://localhost:5000/api/account/data", {
                method: 'GET',
                credentials: "include",
            })
            .then(response => response.json())
            .then(userObj => {
                setUser(userObj.user)})
            .catch(err => console.log(err));
        }
        getUserIfExists();
    });

    function UserExistsCheck(){
        if(!user){
            return <li><a href="/signup">Sign Up</a></li>
        }else if(user){
            return <li><a href="/account">Accoutn</a></li>
        }
        return
    }

    return <nav>
            <div class="site-title">
                <p>Blogify</p>
            </div>
            <ul>
                <li><a href="/">Blogs</a></li>
                <li><a href="/create">Create blogs</a></li> 
                {/* <li><a href="/account">Accoutn</a></li> */}
                <UserExistsCheck/>
            </ul>
        </nav>

}