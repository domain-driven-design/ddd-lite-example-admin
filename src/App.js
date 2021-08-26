import './App.css';
import "antd/dist/antd.css";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import Login from "./components/Login";
import BaseLayout from "./components/BaseLayout";
import UserManagement from "./components/UserManagement";

function App() {
    return (
        <Router>
            <Switch>
                <Route path="/login" component={Login}/>
                <BaseLayout>
                    <Switch>
                        <Route path="/users" component={UserManagement}/>
                        <Route path="/" component={UserManagement}/>
                    </Switch>
                </BaseLayout>
            </Switch>
        </Router>
    );
}

export default App;
