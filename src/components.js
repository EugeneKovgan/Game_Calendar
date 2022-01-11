const NavBar = {
    render: (customClass = "") => {
        return `
        <header class="header" ${customClass}" id="header">
        <div class="container_wraper">
            <div class="header__body">
                <a href="#" class="heder__logo">
                    <img src="./styles/img/500_F_186105992_PS4Ew3SaT24gwQxON8HLoIZnkYHdb6zq.jpg" alt="">
                </a>
                <div class="header__burger" id="headerburger"><span></span></div>
        
                <nav class="header__menu" id="headermenu">
                    <ul class="header__list">
                        <li>
                            <a class="header__link" href="#main">Планируемые</a>
                        </li>
                        <li>
                            <a class="header__link" href="#past">Прошедшие</a>
                        </li>
                        <li>
                            <a class="header__link" href="#rules">Правила</a>
                        </li>
                        <li>
                            <a class="header__link" href="#links">Ссылки</a>
                        </li>
                        <li><a class="header__link" href="#newgames">Добавить игру</a>
                        </li>
                    </ul>
                </nav>
            </div>
        </div>
        </header>
      `;
    }
};



const Content = {
    render: (customClass = "") => {
        return `
        <div class="container_wraper">
            <div class="content ${customClass}" id="content"></div>
        </div>
        `;
    }
};

const Footer = {
    render: (customClass = "") => {
        return `
        <div class="container_wraper">
            <footer class="footer ${customClass}">
                <p>&copy; 2020 Eugene Kovgan</p>
            </footer>
        </div>
      `;
    }
};