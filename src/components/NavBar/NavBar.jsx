const NavBar = () => {
    return(<div>
        <header className="header" id="header">
        <div className="container_wraper">
            <div className="header__body">
                <a href="#" className="heder__logo">
        <img src="./styles/img/500_F_186105992_PS4Ew3SaT24gwQxON8HLoIZnkYHdb6zq.jpg" alt=""/>
        </a>
        <div className="header__burger" id="headerburger"><span></span></div>

        <nav className="header__menu" id="headermenu">
            <ul className="header__list">
                <li>
                    <a className="header__link" href="#main">Планируемые</a>
                </li>
                <li>
                    <a className="header__link" href="#past">Прошедшие</a>
                </li>
                <li>
                    <a className="header__link" href="#rules">Правила</a>
                </li>
                <li>
                    <a className="header__link" href="#links">Ссылки</a>
                </li>
                <li><a className="header__link" href="#newgames">Добавить игру</a>
                </li>
            </ul>
        </nav>
    </div>
</div>
</header>
        </div>
)}

export default NavBar