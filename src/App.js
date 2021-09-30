import './App.css';
import { Route, Switch } from "react-router-dom";
import Layout from "./Components/Layout/layout";
import Users from "./Components/Users/users-details";
import addUpdate from "./Components/Users/addUpdate";

function App()
{
  let routes = (
    <Switch>
      <Route path="/" exact component={Users} />
      <Route path="/user/:id" component={addUpdate} />
      <Route path="/user/" component={addUpdate} />


    </Switch>
  )
  return (
    <div >
      <Layout>
        {routes}
      </Layout>
    </div>
  );
}

export default App;
