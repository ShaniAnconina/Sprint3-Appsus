const { NavLink } = ReactRouterDOM

export function Home() {

    return <section className="home">
        <h1>Our mission is to <span className="blue">organize</span> the world’s <span className="red">information</span> and <br />
        make it universally <span className="green">accessible</span> and <span className="yellow">useful</span>.</h1>
            <nav className="icons-nav">
                <NavLink to="/about"><img src="./assets/img/about.png" /></NavLink>
                <NavLink to="/mail"><img src="./assets/img/gmail.png" /></NavLink>
                <NavLink to="/note"><img src="./assets/img/keep.png" /></NavLink>
            </nav>
    </section>
}