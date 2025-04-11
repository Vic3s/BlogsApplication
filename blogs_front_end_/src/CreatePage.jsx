import { useState} from "react";
import NavLoggedIn from "./partials/Nav.jsx"
import "./styles/create_page.css"


function Create(){

    const[title, setTitle] = useState("");
    const[snippet, setSnippet] = useState("");
    const[body, setBody] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();

        const blogObj = {title: title, snippet: snippet, body: body}

        fetch("http://localhost:5000/api/blogs/data", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            }, body: JSON.stringify(blogObj),
        }).then(response => {
            if(!response.ok){
                throw new Error("*Failed to post blog!*")
            }
            return response.json();
        }).then(data => console.log('Response: ', data))
        .catch((err) => console.log(err));
    }

    return <>

        <NavLoggedIn/>
    
        <div className="create-blog">
            <form onSubmit={handleSubmit}>
                <div className="inputTitle">
                    <label htmlFor="title">Blog title:</label>
                    <input type="text" id="title" name="title" onChange={(e) => setTitle(e.target.value)} required/>
                </div>
                <div className="inputSnippit">
                    <label htmlFor="snippet">Blog snippet:</label>
                    <input type="text" id="snippet" name="snippet" onChange={(e) => setSnippet(e.target.value)} required/>
                </div>
                <div className="inputBody">
                    <label htmlFor="body">Blog body:</label>
                    <textarea type="text" id="body" name="body" onChange={(e) => setBody(e.target.value)} required></textarea>
                </div>

                <button>Submit</button>
            </form>
        </div>

        </>
}

export default Create