import React, {Component} from 'react';
import './App.css';
// import Login from './components/login/login';
import {
    BrowserRouter as Router,
    Route,
    Link,
    Switch,
    withRouter,
} from 'react-router-dom'

import routers from './router'

class App extends Component {
    render() {
        document.documentElement.style.fontSize = 16 / 375 * document.documentElement.clientWidth + 'px';
        window.addEventListener('resize', function () {
            document.documentElement.style.fontSize = 16 / 375 * document.documentElement.clientWidth + 'px';
        }, false)
        return (
            <div className="App">
                <Router>
                    <main>
                        <Switch>
                            {
                                routers.map((route, index) => {
                                    return (
                                        <Route
                                            key={index}
                                            path={route.path}
                                            exact={route.exact}
                                            component={route.component}/>
                                    )
                                })
                            }
                        </Switch>
                    </main>
                </Router>
            </div>
        );
    }
}

export default App;
