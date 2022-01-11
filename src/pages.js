const HomePage = {
    id: "main",
    title: "Календарь игр. Планируемые игры",
    render: (className = "container", ...rest) => {
        return `
      <section class="${className}">
        <h3>Планируемые игры:</h3>      
        <div class="futureGames" id="futureGames">
        </div>
      </section>
    `;
    }
};


const Past = {
    id: "past",
    title: "Календарь игр. Прошедшие игры",
    render: (className = "container", ...rest) => {
        return `
      <section class="${className}">
        <h3>Прошедшие игры:</h3>             
        <div class="PastGames" id="PastGames">     
        </div> 
      </section>
    `;
    }
};


const Rules = {
    id: "rules",
    title: "Календарь игр. Правила",
    render: (className = "container", ...rest) => {
        return `
      <section class="${className}">      
      <h3>Правила:</h3> 
      <p><a href="https://forum.airsoft.by/viewtopic.php?t=10073" class="linkMenu"><strong>Правила airsoftBy</strong></a></p>
      <p><a href="http://airsoftgun.by/forum/viewtopic.php?t=56343" class="linkMenu"><strong>Правила airsoftGun</strong></a></p>           
      </section>
    `;
    }
};


const Links = {
    id: "links",
    title: "Календарь игр. Ссылки",
    render: (className = "container", ...rest) => {
        return `
  <section class="${className}">
    <h3>Ссылки:</h3>      
    <p><a href="https://forum.airsoft.by/" class="linkMenu"><strong>airsoft.by</strong></a></p>
    <p><a href="http://airsoftgun.by/" class="linkMenu"><strong>airsoftgun.by</strong></a></p>       
  </section>
        `;
    }
};




const NewGames = {
    id: "newgames",
    title: "Календарь игр. Добавить игру",
    render: (className = "container", ...rest) => {
        return `
        <section class="${className}">   
        <div id="newGameContentContainer">
        </div>
        </section>
        `;
    }
}


const ErrorPage = {
    id: "error",
    title: "Календарь игр. Achtung, warning, kujdes, attenzione, pozornost...",
    render: (className = "container", ...rest) => {
        return `
      <section class="${className}">
        <h1>Ошибка 404</h1>
        <br> 
        <p>Страница не найдена, попробуйте вернуться на <a href="#main">главную</a>.</p>
      </section>
    `;
    }
};