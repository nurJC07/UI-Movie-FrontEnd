import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import Header from './Component/Header';
import HomePage from './Component/HomePage';
import ManageMovie from './Component/ManageMovie';
import ManageCategory from './Component/ManageCategory';
import Connection from './Component/Connection';
import './App.css';


class App extends Component {
  render() {
    return (
      <div> 
        <Header  navBrand ={'Movie'} />
        <Route exact path ="/" component ={HomePage}/>
        <Route path="/ManageCategory" component={ManageCategory}/> 
        <Route path="/ManageMovie" component={ManageMovie}/>
        <Route path="/Connection" component={Connection}/> 
      </div>
    );
  }
}

export default App;

