import './App.css';
import "antd/dist/antd.css";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import Login from "./components/Login";
import Home from "./components/Home";
import BaseLayout from "./components/BaseLayout";

function App() {
    return (
        <Router>
            <Switch>
                <Route path="/login" component={Login}/>
                <BaseLayout>
                    <Route path="/" component={Home}/>
                </BaseLayout>
            </Switch>
        </Router>
    );
}

export default App;
