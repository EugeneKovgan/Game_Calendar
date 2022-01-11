const myApp = (function() {
    function AppView() {
        let appContainer = null;

        this.init = function(app) {
            appContainer = app;
            this.showLoginForm();
        }

        this.showLoginForm = function() {
            appContainer.innerHTML = `
          <div id="login" class="section">
            <div class="container">
              <div class="columns">
                <div class="column">
                  <h1 class="is-size-2 has-text-centered">Приветствую в моем приложении</h1>
                  <h2 class="is-size-4 has-text-centered">Залогиньтесь, пожалуйста.</h2>
                </div>
              </div>
              <div class="columns is-centered">
              <div class="column is-half">
                <div class="field">
                  <p class="control has-icons-left has-icons-right">
                    <input id="fieldEmail" class="input is-medium" type="email" placeholder="Email">
                    <span class="icon is-small is-left">
                      <i class="fas fa-envelope"></i>
                    </span>
                  </p>
                </div>
              </div>
            </div>
            <div class="columns is-centered">
              <div class="column is-half">
                <div class="field">
                  <p class="control has-icons-left">
                    <input id="fieldPassword" class="input is-medium" type="password" placeholder="Password">
                    <span class="icon is-small is-left">
                      <i class="fas fa-lock"></i>
                    </span>
                  </p>
                </div>
              </div>
            </div>
            <div class="columns is-centered">
              <div class="column">
                <div class="field is-grouped is-grouped-centered">
                  <p class="control">
                    <button id="loginBtn" class="button is-success is-medium">
                      Войти
                    </button>
                  </p>
                </div>
              </div>
            </div>
            <div class="columns">
              <div class="column">
                <div id="error" class="error">
                </div>
              </div>
            </div>
            </div>
          </div>
          `;
        }

        this.loginError = function(error) {
            appContainer.querySelector('#error').innerHTML = `${error}`;
        }

        this.showForm = function() {
            this.printTestData();
            this.addUserForm();
        }

        this.hideForm = function() {
            this.showLoginForm();
        }

        this.printTestData = function() {
            appContainer.innerHTML = `
                <section id="userForm" class="section">
                    <div class="container">
                        <a href="#" id="logoutBtn" class="logout button is-primary">Выйти</a>
                        <h1 class="title">Hello from AppView!</h1>
                        <p class="subtitle">Test app created.</p>
                        <div id="users">
                        </div>
                    </div>
                </section>
            `;
        }

        this.addUserForm = function() {
            document.getElementById('users').innerHTML += `
            <div class="columns">
                <div class="column">
                    <form id="addNewUser">
                        <h4 class="title is-4">Добавить пользователя</h4>
                        <div class="field-body">
                        <div class="field">
                          <div class="control has-icons-left has-icons-right">
                            <input type="text" class="input" id="newUserName" name="username" placeholder="Введите имя" required>
                            <span class="icon is-small is-left">
                              <i class="fas fa-user"></i>
                            </span>
                          </div>
                        </div>
                        <div class="field">
                          <div class="control has-icons-left has-icons-right">
                            <input id="newUserEmail" class="input" type="email" placeholder="Email input" name="useremail" placeholder="Введите email" required>
                            <span class="icon is-small is-left">
                              <i class="fas fa-envelope"></i>
                            </span>
                          </div>
                        </div>
                        <div class="field is-horizontal">
                            <div class="control">
                                <button class="button is-link" id="addBtn">Добавить</button>
                            </div>
                        </div>
                        </div>
                    </form>
                </div>
            </div>
            `;
        }

        this.printUser = function(userList) {
            let userListContainer = document.getElementById('users-list__container');
            if (!userListContainer) {
                document.getElementById('users').innerHTML += `
                <div class="columns">
                    <div class="column">
                        <div class="users-list">
                            <h4 class="title is-4">Список пользователей:</h4>
                            <table id="users-list" class="table is-bordered is-striped is-narrow is-hoverable is-fullwidth">
                                <thead>
                                    <tr>
                                        <th>Пользователь</th>
                                        <th>email</th>                                      
                                    </tr>
                                </thead>
                                <tbody id="users-list__container"></tbody>
                            </table>
                        </div>
                    </div>
                </div>
                `;
                userListContainer = document.getElementById('users-list__container');
            } else {
                userListContainer.innerHTML = '';
            }

            for (let user in userList) {
                userListContainer.appendChild(createRow(user, userList));
            }

            function createRow(user, userList) {
                let row = document.createElement('tr'),
                    td1 = document.createElement('td'),
                    td2 = document.createElement('td');
                // td3 = document.createElement('td');
                row.setAttribute('data-id', user);
                td1.innerHTML = `<strong>${userList[user].username}</strong>`;
                td2.innerHTML = `${userList[user].email}`;
                // td3.innerHTML = `<a href="#" class="delete is-medium" title="удалить пользователя">Удалить</a>`;
                row.appendChild(td1);
                row.appendChild(td2);
                // row.appendChild(td3);
                return row;
            }
        }

        this.clearUserList = function() {
            const container = document.getElementById('users-list__container');
            if (container) container.innerHTML = '';
        }
    }

    function AppModel() {
        let myAppView = null;
        const that = this;

        this.init = function(view) {
            myAppView = view;
        }

        this.login = function(userEmail, userPass) {
            if (userEmail && userPass) {
                firebase.auth().signInWithEmailAndPassword(userEmail, userPass)
                    .catch(function(error) {
                        console.log("Error: " + error.message);
                        myAppView.loginError("Неверный email или пароль. Введите корректные данные.");
                    });

                firebase.auth().onAuthStateChanged(function(user) {
                    if (user) {
                        // User is signed in.
                        myAppView.showForm();
                        that.getUsersList();
                        that.printUsersList();
                    } else {
                        // No user is signed in.
                        myAppView.hideForm();
                    }
                });
            } else {
                myAppView.loginError("Пустое поле Email или Password. Введите данные в указанные поля.");
            }
        }

        this.logout = function() {
            firebase.auth().signOut();
            console.log("Пшёл вон! =)");
        }

        this.addUser = function(username, useremail) {
            myAppDB.ref('users/' + `user_${username.replace(/\s/g, "").toLowerCase()}`).set({
                    username: `${username}`,
                    email: `${useremail}`
                })
                .then(function(username) {
                    console.log("Пользователь добавлен в коллецию users");
                })
                .catch(function(error) {
                    console.error("Ошибка добавления пользователя: ", error);
                });

            // this.updateUsersList();
        }

        this.getUsersList = function() {
            myAppDB.ref("users/").once("value")
                .then(function(snapshot) {
                    console.log("Users list:");
                    console.log(snapshot.val());
                }).catch(function(error) {
                    console.log("Error: " + error.code);
                });
        }

        this.printUsersList = function() {
            myAppDB.ref("users/").on("value", function(snapshot) {
                myAppView.printUser(snapshot.val());
            }, function(error) {
                console.log("Error: " + error.code);
            });
        }

        // this.updateUsersList = function() {
        //     myAppView.clearUserList();
        //     this.printUsersList();
        // }
    }

    function AppController() {
        let myAppModel = null,
            appContainer = null,
            form = null,
            addBtn = null;

        this.init = function(app, model) {
            myAppModel = model;
            appContainer = app;

            document.addEventListener('click', function(event) {
                form = appContainer.querySelector('#addNewUser');
                addBtn = appContainer.querySelector('#addBtn');

                if (event.target && event.target.id === 'loginBtn') {
                    event.preventDefault();
                    event.stopPropagation();
                    myAppModel.login(
                        appContainer.querySelector("#fieldEmail").value,
                        appContainer.querySelector("#fieldPassword").value,
                    );
                }

                if (event.target && event.target.id === 'logoutBtn') {
                    event.preventDefault();
                    event.stopPropagation();
                    myAppModel.logout();
                }

                if (event.target && event.target.id === 'addBtn') {
                    event.preventDefault();
                    event.stopPropagation();
                    myAppModel.addUser(
                        form.newUserName.value,
                        form.newUserEmail.value
                    );
                    form.newUserName.value = '';
                    form.newUserEmail.value = '';
                }
            });
        }
    }

    return {
        init: function() {
            let myAppView = new AppView(),
                myAppModel = new AppModel(),
                myAppController = new AppController();

            myAppView.init(document.getElementById('app'));
            myAppModel.init(myAppView);
            myAppController.init(document.getElementById('app'), myAppModel);
        }
    };
})();

myApp.init();