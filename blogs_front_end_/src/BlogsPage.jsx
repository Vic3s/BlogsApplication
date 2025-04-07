import Footer from './partials/Footer'
import { useEffect, useState } from 'react'
import "./blogs_page.css"
import NavLoggedIn from "./partials/NavLoggedIn.jsx"

function BlogsPage(){

    const[blogs, setBlogs] = useState([])
    const[userLogged, setUserLogged] = useState()

    useEffect(() => {
        const getBlogs = async () => {

            await fetch("http://localhost:5000/api/blogs/data")
            .then(response => response.json())
            .then(json => setBlogs(json.result))
            .catch(err => console.log(err));
        }
        const getUserLogged = async () => {

            await fetch("http://localhost:5000/api/blogs/data")
            .then(response => response.json())
            .then(json => setBlogs(json.user))
            .catch(err => console.log(err));
        }
        getBlogs();
        getUserLogged();
    })

    return <>
        <NavLoggedIn/>

        <div className="blog content">
            <h1 className="heading1">Blogify</h1>
            <hr color="#222" width="300px" size="4px" class="line"/>
            <h2>All Blogs</h2>

            <div>
                {blogs.map((blog)=> {
                    return <a className="single" key={blog._id} href={`/blogs/${blog._id}`}>
                            <h3 className="title">{blog.title}</h3>
                            <p className="snippit">{blog.snippet}</p>
                        </a>
                    })
                }
            </div>
                    
        </div>

        <Footer></Footer>
    </>
}

export default BlogsPage