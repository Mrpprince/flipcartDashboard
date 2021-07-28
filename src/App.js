import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Home from './Containers/Home';
import Signin from './Containers/Signin';
import Signup from './Containers/Signup';
import PrivateRoute from './Components/HOC/PrivateRoute'
import { useEffect } from 'react'
import { isUserLoggedIn } from './actions/auth.actions';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import Products from './Containers/Products';
import Orders from './Containers/Orders';
import Category from './Containers/Category';
import { getAllCategory } from './actions/category.actions';
import { getInitialData } from './actions';
function App() {
  const auth = useSelector(state => state.auth)
  const dispatch = useDispatch();
  useEffect(() => {
    if (!auth.authenticate) {
      dispatch(isUserLoggedIn())
      dispatch(getInitialData())
    }

  }, [])

  return (
    <div className="App">

      <Switch>
        <PrivateRoute exact path="/" component={Home} />
        <PrivateRoute  path="/category" component={Category} />
        <PrivateRoute  path="/products" component={Products} />
        <PrivateRoute  path="/orders" component={Orders} />
        <Route path='/signin' component={Signin} />
        <Route path="/signup" component={Signup} />
      </Switch>


    </div>
  );
}

export default App;
