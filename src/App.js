import React,{Component} from 'react';
import Login from './Component/Login';
import Home from './Component/Home';
import User from './Component/User';
import Context from './Component/context';
import {BrowserRouter,Route , Switch} from 'react-router-dom';
import Si from './Component/Si';
import Failed from './Component/Failed';
import Succes from './Component/Succes';

class App extends Component{
render() {
  return (

  
    <BrowserRouter>
        <Context.Provider value={{
            value: this.state,
            action: {
            }}} >
    <Route exact path ='/' component={Login } />

  
    {/* <Switch> */}
    <Route path ='/Home' component={Home} />
    <Route path ='/User' component={User} />
    <Route path ='/Si' component={Si} />
    <Route path ='/Failed' component={Failed} />
    <Route path ='/Succes' component={Succes} />
    {/* </Switch>  */}
  
   
    </Context.Provider>
    </BrowserRouter>
  );
}
}
export default App;
