const { Link, NavLink } = ReactRouterDOM

export function AppHeader() {

    return <header className="app-header">
            <Link to="/">
                <h3 className="logo">Appsus</h3>
            </Link>
            <nav>
                <NavLink to="/">Home</NavLink>
                <NavLink to="/about">About</NavLink>
                <NavLink to="/mail">Mail</NavLink>
                <NavLink to="/note">Note</NavLink>
            </nav>
        {/* <div className="border-container">
            <div className="red">.</div>
            <div className="yellow">.</div>
            <div className="green">.</div>
            <div className="blue">.</div>
        </div> */}
    </header >
}
