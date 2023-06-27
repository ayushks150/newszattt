
import './App.css';

import React, { Component } from 'react'
import Navbar from './Component/Navbar';
import News from './Component/News';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  BrowserRouter
} from "react-router-dom";
import LoadingBar from 'react-top-loading-bar'


export default class App extends Component {

  pageSize = 12;


  state = {
    progress: 0,
    mode: 'light'
  }

  setProgress = (progress) => {
    this.setState({ progress: progress })
  }


  setMode = (mode)=>{
    this.setState({ mode: mode })
  }

  toggleMode = () => {
    const { mode } = this.state;

    if (mode === 'light') {
      this.setState({ mode: 'dark' });
      document.body.style.backgroundColor = 'currentcolor';
      document.title = 'TextHelp-Dark mode';
    } else {
      this.setState({ mode: 'light' });
      document.body.style.backgroundColor = 'white';
      document.title = 'TextHelp-Light mode';
    }
  };


  
  render() {
    //const { mode } = this.state;
    return (
      <div>
        <BrowserRouter>
          <Navbar mode={this.state.mode} toggleMode={this.toggleMode} />
          <LoadingBar
            height={3}
            color='#f11946'
            progress={this.state.progress}
          />
          <Routes>
            <Route exact path='/' element={<News setProgress={this.setProgress} mode={this.state.mode} key='general' pageSize={this.pageSize} country='in' category='general' />}></Route>
            <Route exact path='/business' element={<News setProgress={this.setProgress} mode={this.state.mode} key='business' pageSize={this.pageSize} country='in' category='business' />}></Route>
            <Route exact path='/entertainment' element={<News setProgress={this.setProgress} mode={this.state.mode} key='entertainment' pageSize={this.pageSize} country='in' category='entertainment' />}></Route>
            <Route exact path='/general' element={<News setProgress={this.setProgress} mode={this.state.mode} key='general' pageSize={this.pageSize} country='in' category='general' />}></Route>
            <Route exact path='/health' element={<News setProgress={this.setProgress} mode={this.state.mode} key='health' pageSize={this.pageSize} country='in' category='health' />}></Route>
            <Route exact path='/science' element={<News setProgress={this.setProgress} mode={this.state.mode} key='science' pageSize={this.pageSize} country='in' category='science' />}></Route>
            <Route exact path='/sports' element={<News setProgress={this.setProgress} mode={this.state.mode} key='sports' pageSize={this.pageSize} country='in' category='sports' />}></Route>
            <Route exact path='/technology' element={<News setProgress={this.setProgress} mode={this.state.mode} key='technology' pageSize={this.pageSize} country='in' category='technology' />}></Route>
          </Routes>
        </BrowserRouter>
      </div>
    )
  }
}
