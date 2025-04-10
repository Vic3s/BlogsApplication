import Footer from './partials/Footer'
import { useEffect, useState } from 'react'
import "./styles/blogs_page.css"
import NavLoggedIn from "./partials/NavLoggedIn.jsx"
import NavLoggedOut from "./partials/NavLoggedOut.jsx"


function BlogsPage(){

    const[blogs, setBlogs] = useState([])

    useEffect(() => {
        const getBlogs = async () => {

            await fetch("http://localhost:5000/api/blogs/data")
            .then(response => response.json())
            .then(json => setBlogs(json.result))
            .catch(err => console.log(err));
        }
        getBlogs();
    })

    return <>
        <NavLoggedIn/>
        <div className="blog content">
            <h1 className="heading1">Create and post your blogs here!</h1>
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