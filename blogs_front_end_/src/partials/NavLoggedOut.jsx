import "./partials_styles/nav_n_footer.css"

export default function NavLogedOut() {

    return <nav>
            <div class="site-title">
                <p>Blogify</p>
            </div>
            <ul>
                <li><a href="/">Blogs</a></li>
                <li><a href="/create">Create blogs</a></li> 
                <li><a href="/signup">Sign Up</a></li>
            </ul>
        </nav>
}