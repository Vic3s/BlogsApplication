import "./nav_n_footer.css"


export default function NavLoggedIn() {

    return <nav>
            <div class="site-title">
                <p>Blogs</p>
            </div>
            <ul>
                <li><a href="/">Blogs</a></li>
                <li><a href="/create">Create blogs</a></li> 
                <li><a href="/account">Accoutn</a></li>
            </ul>
        </nav>

}