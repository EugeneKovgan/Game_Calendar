// "use strict"
// List of components (from components.js)
const components = {
    navbar: NavBar,
    content: Content,
    footer: Footer,
};
// List of supported routes (from pages.js)
const routes = {
    main: HomePage,
    past: Past,
    rules: Rules,
    links: Links,
    newgames: NewGames,
    default: HomePage,
    error: ErrorPage,
};

/* ----- spa init module --- */

const mySPA = (function() {
    console.log('работает ваще?');
    /* ------- begin view -------- */
    function ModuleView() {
        let myModuleContainer = null;
        let menu = null;
        let contentContainer = null;
        let routesObj = null;

        this.init = function(container, routes) {
            myModuleContainer = container;
            routesObj = routes;
            menu = myModuleContainer.querySelector("#headermenu");
            contentContainer = myModuleContainer.querySelector("#content");
        }

        this.renderContent = function(hashPageName) {
            this.routeName = "default";

            if (hashPageName.length > 0) {
                this.routeName = hashPageName in routes ? hashPageName : "error";
            }

            window.document.title = routesObj[this.routeName].title;
            contentContainer.innerHTML = routesObj[this.routeName].render(`${this.routeName}-page`);
            this.updateButtons(routesObj[this.routeName].id);
        }


        this.getRoutName = function() {
            return this.routeName;
        };


        this.updateButtons = function(currentPage) {
            const menuLinks = headermenu.querySelectorAll(".header__link");

            for (let i = 0, menuLinksCount = menuLinks.length; i < menuLinksCount; i++) {
                if (currentPage === menuLinks[i].getAttribute("href").slice(1)) {
                    menuLinks[i].classList.add("active");
                } else {
                    menuLinks[i].classList.remove("active");
                }
            }
        }

        this.prinFutureGamesContainer = function() {
            document.getElementById("futureGames").innerHTML = `          
                    <div class="container">
                        <div id="games">
                        </div>
                    </div>
            `;
        }

        this.prinPastGamesContainer = function() {
            document.getElementById("PastGames").innerHTML = `          
                    <div class="container">
                        <div id="games">
                        </div>
                    </div>
            `;
        }

        this.printGame = function(gameList) {
            let GameListContainer = document.getElementById('games-list__container');
            if (!GameListContainer) {
                document.getElementById("games").innerHTML += `               
                        <div class="games-list">
                            <h4 class="title is-4"></h4>
                                <div id="games-list">                          
                                </div>                                
                            <div id="games-list__container" class="games-list__container"></div>
                            <br>                             
                        </div>                
                `;
                GameListContainer = document.getElementById('games-list__container');
            } else {
                GameListContainer.innerHTML = '';
            }

            for (let game in gameList) {
                GameListContainer.appendChild(createRow(game, gameList));
            }

            function createRow(game, gameList) {
                let row = document.createElement('div');
                let titleCollapsible = document.createElement('div')
                let nameG = document.createElement('p');
                let contentCollapsible = document.createElement('div');
                let dateG = document.createElement('p');
                let rulesG = document.createElement('p');
                let placeG = document.createElement('p');
                let priceG = document.createElement('p');
                let decriptionG = document.createElement('p');
                let datePublic = document.createElement('p');
                let dt = new Date(gameList[game].datePublic);
                let dp = new Date(gameList[game].newGameDate);
                row.setAttribute('data-id', game);
                titleCollapsible.classList.add("collapsible");
                contentCollapsible.classList.add("contentCollapsible");
                // nameG.classList.add("collapsible");
                nameG.innerHTML = `<strong class="titleGame">${gameList[game].newGameName}</strong>`;
                dateG.innerHTML = `<span><strong class="descriptGame titleData">Дата проведения: </strong>${dp.toLocaleDateString()}</span>`;
                rulesG.innerHTML = `<strong class="descriptGame">Правила проведения: </strong>${gameList[game].gamerules}`;
                placeG.innerHTML = `<strong class="descriptGame">Место проведения: </strong>${gameList[game].placeGame}`;
                priceG.innerHTML = `<strong class="descriptGame">Стоимость участия: </strong> ${gameList[game].priceGame} BYN`;
                decriptionG.innerHTML = `<strong class="descriptGame">Описание: </strong><p class="descriptionP">${gameList[game].descriptionGame}<p>`;
                datePublic.innerHTML = `<p class="datePublic">Дата публикации: ${dt.toLocaleDateString()}<p>`;
                // debugger
                row.appendChild(titleCollapsible);
                titleCollapsible.appendChild(nameG)
                titleCollapsible.appendChild(dateG);
                row.appendChild(contentCollapsible);
                // contentCollapsible.appendChild(dateG);
                contentCollapsible.appendChild(rulesG);
                contentCollapsible.appendChild(placeG);
                contentCollapsible.appendChild(priceG);
                contentCollapsible.appendChild(decriptionG);
                contentCollapsible.appendChild(datePublic);
                return row;
            }
            this.menuGameCollapsible();
        }

        //collapsible list 
        this.menuGameCollapsible = function() {
            let coll = document.getElementsByClassName('collapsible');
            for (let i = 0; i < coll.length; i++) {
                coll[i].addEventListener('click', function() {
                    console.log('click');
                    this.classList.toggle('active');
                    let content = this.nextElementSibling;
                    if (content.style.maxHeight) {
                        content.style.maxHeight = null;
                    } else {
                        content.style.maxHeight = content.scrollHeight + 'px'
                    }
                })
            }
        }


        this.loginError = function(error) {
            newGameContentContainer.querySelector('#error').innerHTML = `${error}`;
        }


        this.formForLogin = function() {
            document.getElementById("newGameContentContainer").innerHTML = `  
            <form class="loginForm" id="loginForm">              
            <fieldset class="fieldset"><legend><h3>Залогиньтесь, пожалуйста</h3></legend> 
                <div id="login" class="loginForm">  

                    <label for="fieldEmail" class="form_label">     
                    <input class="fieldEmail" id="fieldEmail" name="fieldEmail" type="email" required>
                    <span class="placeholder">Email</span>
                    </label>                

                    <label for="fieldPassword" class="form_label">            
                    <input class="fieldPassword" id="fieldPassword" name="fieldPassword" type="password" required>
                    <span class="placeholder">Password</span> 
                    </label>   
                    <div class="error" style="height:20px; color:red"></div>
                   
                    <div class="error" id="error" style="height:20px; color:red"></div>  

                    <button id="loginBtn" class="button submitBtn">
                      Войти
                    </button> 

                </div>
                </div>
            </fieldset>
            </form>              
            `;
        }


        this.formForAddGames = function() {
            document.getElementById("newGameContentContainer").innerHTML = `
            <form class="addNewGame" id="addNewGame"> 
            <fieldset class="fieldset"><legend><h3>Заполните форму</h3></legend>

            <div class="newGameName">
                <label for="newGameName" class="form_label">
                   <input type="text" id="newGameName" name="newGameName" minlength="5" maxlength="256" required>
                   <span class="placeholder">Название игры</span>                   
                   </label>
                <div class="error" style="height:20px; color:red"</div>          
            </div>
            
            <div class="newGameDate">
                <label for="newGameDate" class="form_label">
                    <input type="date" id="newGameDate" name="newGameDate" required>
                    <span class="placeholder">Дата проведения</span>
                    
                </label>
                <div class="error" style="height:20px; color:red"></div>            
            </div>
            
            <div>
            <label for="input_rules_game" class="form_label">
                 <input type="text" list="variableRules" name="gamerules" class="input_rules_game" id="gamerules" required>
                 <span class="placeholder">Правила проведения</span>                        
                    <datalist id="variableRules">
                        <option value="airsoft_by">airsoft_by</option>
                        <option value="airsoft_gun">airsoft_gun</option>           
                    </datalist>                                                                          
            </label> 
            </div>

            <div class="error" style="height:20px; color:red"></div>                  
            
            <div class="placeGame">
                <label for="placeGame" class="form_label">
                     <input type="text" id="placeGame" name="placeGame" required>
                     <span class="placeholder">Место проведения</span>
                </label>                    
                <div class="error" style="height:20px; color:red"></div>             
            </div>
            
            <div class="input_price_game">         
                <label for="priceGame" class="form_label">
                     <input type="number" id="priceGame" name="priceGame" min="0" required>
                     <span class="placeholder">Стоимость участия BYN</span>
                </label>   
                <div class="error" style="height:20px; color:red"></div>                
            </div>
            
            <div class="input_description_game">
                <label for="descriptionGame" class="form_label">
                     <textarea name="descriptionGame" id="descriptionGame" name="descriptionGame" required></textarea>
                     <span class="placeholder">Дополнительная информация</span>                    
                </label> 
                <div class="error" style="height:20px; color:red"></div>          
            </div>    
            
            <button type="submit" id="submitBtn" class="button submitBtn" disabled>      
                Submit
            </button>      
            
                 </fieldset>
               </form> 
               `;
        }
    };

    /* -------- end view --------- */
    /* ------- begin model ------- */

    function ModuleModel() {
        let myModuleView = null;
        let myModuleModel = null;
        let gameForm = null;
        let submitBtn = null;
        const that = this;
        this.init = function(view) {
            myModuleView = view;
        };

        this.updateState = function() {
            const hashPageName = window.location.hash.slice(1).toLowerCase();
            myModuleView.renderContent(hashPageName);
            if (hashPageName == "main" || hashPageName == "") {
                firebase.auth().onAuthStateChanged(function() {
                    console.log('вошли в базу');
                    myModuleView.prinFutureGamesContainer();
                    that.printGamesList(false);
                })
            };

            if (hashPageName == "past") {
                firebase.auth().onAuthStateChanged(function() {
                    console.log('вошли в базу');
                    myModuleView.prinPastGamesContainer();
                    that.printGamesList(true);
                })
            };
            if (hashPageName == "newgames") {
                myModuleView.formForLogin();
            }
        };


        this.printGamesList = function(isPast) {
            let currentDate = Date.now();
            myGamesDB.ref("games").orderByChild("newGameDate").once("value", function(snapshot) {
                this.gameArray = [];
                console.log(snapshot.val());
                snapshot.forEach((messageSnapshot) => {
                    if (isPast) {
                        let t = new Date(messageSnapshot.val().newGameDate)
                        if (currentDate > t) {
                            this.gameArray.push(messageSnapshot.val());
                        }
                    } else {
                        let t = new Date(messageSnapshot.val().newGameDate)
                        if (currentDate <= t) {
                            this.gameArray.push(messageSnapshot.val());
                        }
                    }
                });
                myModuleView.printGame(gameArray);
            }, function(error) {
                console.log("Error: " + error.code);
            });
        }

        this.addGame = function(newGameName, newGameDate, gamerules, placeGame, priceGame, descriptionGame) {
            myGamesDB.ref('games/' + `game_${newGameName}`).set({
                    newGameName: `${newGameName}`,
                    newGameDate: `${newGameDate}`,
                    gamerules: `${gamerules}`,
                    placeGame: `${placeGame}`,
                    priceGame: `${priceGame}`,
                    descriptionGame: `${descriptionGame}`,
                    datePublic: new Date().toJSON(),
                })
                .then(function() {
                    console.log(`Игра: "${newGameName}" добавлена в коллецию games`);
                    alert(`игра: ${newGameName} добавлена !`)
                })
                .catch(function(error) {
                    console.error("Ошибка добавления новой игры: ", error);
                });
        }

        //gameForm validation
        this.validationGameFormListener = function() {
            gameForm = document.querySelector('#addNewGame');
            submitBtn = document.querySelector('#submitBtn');
            for (let elem of gameForm.elements) {
                if (!elem.classList.contains("button_gameForm" && "fieldset")) {
                    elem.addEventListener("blur", function() {
                        // validateGameFormInput(elem);
                        if (gameForm.newGameName.value !== '' &&
                            gameForm.newGameDate.value !== '' &&
                            gameForm.gamerules.value !== '' &&
                            gameForm.placeGame.value !== '' &&
                            gameForm.priceGame.value.value !== '' &&
                            gameForm.descriptionGame.value !== '')
                            submitBtn.disabled = false;
                    });
                }
            }
        }

        const validateGameFormInput = function(elem) {
            if (elem.name === "newGameName") {
                console.log(elem.name)
                if (elem.value === "") {
                    elem.nextElementSibling.textContent = "Введите название игры";
                    console.log('пусто')
                } else {
                    elem.nextElementSibling.textContent = "";
                }
            }

            if (elem.name === "newGameDate") {
                if (elem.value === "") {
                    elem.nextElementSibling.textContent = "Укажите дату проведения";
                } else {
                    elem.nextElementSibling.textContent = "";
                }
            }
            if (elem.name === "gamerules") {
                if (elem.value === "") {
                    elem.nextElementSibling.textContent = "Укажите правила";
                } else {
                    elem.nextElementSibling.textContent = "";
                }
            }

            if (elem.name === "placeGame") {
                if (elem.value === "") {
                    elem.nextElementSibling.textContent = "Укажите место проведения";
                } else {
                    elem.nextElementSibling.textContent = "";
                }
            }

            if (elem.name === "priceGame") {
                if (elem.value === "") {
                    elem.nextElementSibling.textContent = "Укажите стоимость участия";
                } else {
                    elem.nextElementSibling.textContent = "";
                }
            }

            if (elem.name === "descriptionGame") {
                if (elem.value === "") {
                    elem.nextElementSibling.textContent = "Введите дополнительные данные";
                } else {
                    elem.nextElementSibling.textContent = "";
                }
            }
        };


        this.login = function(userEmail, userPass) {

            firebase.auth().signOut();

            if (userEmail && userPass) {
                // firebase.auth().createUserWithEmailAndPassword(userEmail, userPass)
                firebase.auth().signInWithEmailAndPassword(userEmail, userPass)
                    .catch(function(error) {
                        console.log("Error: " + error.message);
                        myModuleView.loginError("Неверный email или пароль. Введите корректные данные.");
                    });

                firebase.auth().onAuthStateChanged(function(user) {
                    if (user) {
                        // User is signed in.
                        myModuleView.formForAddGames();
                        that.validationGameFormListener();
                    } else {
                        myModuleView.formForLogin();
                    }
                });

            } else {
                myModuleView.loginError("Пустое поле Email или Password. Введите данные в указанные поля.");
            }
        }
    };


    /* -------- end model -------- */
    /* ----- begin controller ---- */
    function ModuleController() {
        let myModuleContainer = null;
        let myModuleModel = null;
        let gameForm = null;
        let submitBtn = null;
        // let isValidate = false;

        const headerBurgerBtn = document.getElementById('headerburger');
        const headerMenu = document.getElementById('headermenu');
        const contentLocked = document.getElementById('body'); //ID весит на body !!!!
        this.init = function(container, model) {
            myModuleContainer = container;
            myModuleModel = model;

            window.addEventListener("hashchange", this.updateState);
            this.updateState(); //первая отрисовка
        }

        this.updateState = function() {
            myModuleModel.updateState();
        }

        // adaptive menu
        headerBurgerBtn.addEventListener('click', function() {
            headerBurgerBtn.classList.toggle('active');
            headerMenu.classList.toggle('active');
            contentLocked.classList.toggle('lock');
        });

        headerMenu.addEventListener('click', function() {
            headerMenu.classList.toggle('active');

        })

        //work with gameForm
        document.addEventListener('click', function(event) {
            gameForm = document.querySelector('#addNewGame');
            submitBtn = document.querySelector('#submitBtn');

            if (event.target && event.target.id === 'submitBtn') {
                event.preventDefault();
                event.stopPropagation();
                myModuleModel.addGame(
                    gameForm.newGameName.value,
                    gameForm.newGameDate.value,
                    gameForm.gamerules.value,
                    gameForm.placeGame.value,
                    gameForm.priceGame.value,
                    gameForm.descriptionGame.value,
                );
                gameForm.newGameName.value = '';
                gameForm.newGameDate.value = '';
                gameForm.gamerules.value = '';
                gameForm.placeGame.value = '';
                gameForm.priceGame.value = '';
                gameForm.descriptionGame.value = '';
                submitBtn.disabled = true;
            }
        });


        document.addEventListener('click', function(event) {
            let loginForm = document.getElementById('loginForm');
            if (event.target && event.target.id === 'loginBtn') {
                event.preventDefault();
                event.stopPropagation();
                myModuleModel.login(
                    loginForm.querySelector("#fieldEmail").value,
                    loginForm.querySelector("#fieldPassword").value,
                );
            }
        });
    };
    /* ------ end controller ----- */

    return {
        init: function({ container, routes, components }) {
            this.renderComponents(container, components);
            const view = new ModuleView();
            const model = new ModuleModel();
            const controller = new ModuleController();

            view.init(document.getElementById(container), routes);
            model.init(view);
            controller.init(document.getElementById(container), model);
        },

        renderComponents: function(container, components) {
            const root = document.getElementById(container);
            const componentsList = Object.keys(components);
            for (let item of componentsList) {
                root.innerHTML += components[item].render("component");
            }
        },
    };

}());
/* ------ end app module ----- */

/*** --- init module --- ***/
document.addEventListener("DOMContentLoaded", mySPA.init({
    container: "spa",
    routes: routes,
    components: components
}));