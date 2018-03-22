import React from 'react';
import ReactDOM from 'react-dom';
import NavBar from './NavBar';
import SideBar from './SideBar/SideBar';
import TabContent from './TabContent';
import 'whatwg-fetch';
import LoadScript  from 'load-script';

/* Move to the login page and signup page */
const userConsistent = { 'x-auth' : '1233333'};
localStorage.setItem('user', userConsistent);
/* Move to the login page and signup page */

const appContainerID = 'app';

const nasdaqSymbol = 'IXIC'; // Indice de NASDAQ

class App extends React.Component{
  constructor(props) {
    super(props);

    this.handleChangeLocation = this.handleChangeLocation.bind(this);
    this.state = {activeItem : 'dashboard', selectedSymbol : nasdaqSymbol};
    this.handleChangeSymbol = this.handleChangeSymbol.bind(this);
    this.symbols = null;
    this.user = null;
    this.routes =  {
      symbols : '/api/company/symbols',
      userInfo : '/api/user/info'
    };

    this.fetchSymbols();
    this.fetchUser();
  }

  fetchSymbols()
  {
      fetch(this.routes.symbols, { method: 'GET' }).then(response => {
          if (response.ok) {
            response.json().then(data => {
              this.symbols = data.symbols;
              this.forceUpdate();
            });
          }else
            //window.location.href = '/';
            console.log(response);
        }).catch(err => {
            console.log("Error in sending data to server: " + err.message);
        });
  }

  fetchUser(){
    let userFromStorage = localStorage.getItem('user');
    if(userFromStorage)
      fetch(this.routes.userInfo, { method: 'GET' }).then(response => {
          if (response.ok) {
            response.json().then(data => {
              this.user = data.user;
              this.forceUpdate();
            });
          }
        }).catch(err => {
            console.log("Error in sending data to server: " + err.message);
        });
      
  }

  handleChangeSymbol(symbol)
  {
    if (symbol){
      this.setState({activeItem : this.state.activeItem, selectedSymbol : symbol});
    }
  }

  handleChangeLocation(newActiveItem){
    if (newActiveItem)
     this.setState({activeItem : newActiveItem, selectedSymbol : this.state.selectedSymbol});
  }

  dataIsComplete()
  {
    return (this.symbols != null && this.user != null);
  }

  render(){
    if (this.dataIsComplete() == false)
      return null;

    let keyValArr =[];

    this.symbols.sort((obj1, obj2) =>  obj1.symbol.localeCompare(obj2.symbol));
    this.symbols.forEach((element) => {
      let init = element.symbol.charAt(0).toUpperCase();

      if (keyValArr[init] == undefined)
          keyValArr[init] = [element];
      else
          keyValArr[init].push(element);
    });

    return (
      <div>
        <NavBar />
        <SideBar onChangeLocation={this.handleChangeLocation} name={this.user.name}
          symbols={keyValArr} activeItem={this.state.activeItem} onChangeSymbol={this.handleChangeSymbol} 
          selectedSymbol={this.state.selectedSymbol} />

        <TabContent symbols={keyValArr} user={this.user} activeItem={this.state.activeItem} 
          selectedSymbol={this.state.selectedSymbol}/>
      </div>
    );
  }
}

ReactDOM.render(
  <App />,
  document.getElementById(appContainerID)
);