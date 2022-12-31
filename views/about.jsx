
export function About() {
    return <section className="about-container">
        <h1>About us</h1>
        <div className="about-app">
            <p>APPSUS, an application that provides email and notes services in one place.
                We developed this app as part of a fullstack development course in four days.
                The code is built on the purity of react framework.
                We used Google Keep and Gmail as a references for this project.</p>
        </div>
        <div className="about">
            <div className="shani">
                <img src="./assets/img/shani.png" />
                <h2>Shani Anconina</h2>
                <p>28 years old, born and raised in Ashdod.
                    A fullstack web development student at Coding Academy.
                    In this project I was in charge of the mail app.</p>
                <div className="social-links">
                    <a href="https://github.com/ShaniAnconina/" className="fa-brands github" target="_blank"></a>
                    <a href="https://www.linkedin.com/in/shani-anconina-894322143/" className="fa-brands linkedin" target="_blank"></a>
                </div>
            </div>
            <div className="yovel">
                <img src="./assets/img/yovel.jpg" />
                <h2>Yovel Nehmady</h2>
                <p>24 years old, born and raised in Ashdod.
                    A fullstack web development student at Coding Academy.
                    In this project I was in charge of the note app.</p>
                <div className="social-links">
                    <a href="https://github.com/YovelNehmady/" className="fa-brands github" target="_blank"></a>
                    <a href="https://www.linkedin.com/in/yovel-nehmadi-73644123a/" className="fa-brands linkedin" target="_blank"></a>
                </div>
            </div>
        </div>
    </section>
}
