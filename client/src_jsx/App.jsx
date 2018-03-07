import React from 'react';
import ReactDOM from 'react-dom';
import NavBar from './NavBar';
import SideBar from './SideBar/SideBar';
import TabContent from './TabContent';
import 'whatwg-fetch';
import LoadScript  from 'load-script';

/* Move to the login page */
localStorage.setItem('user');
const user = {name : 'Account name', email : 'email@email.com', username : 'user_2016'};
/* Move to the login page */


const appContainerID = 'app';
const nasdaqSymbol = 'IXIC'; // Indice de NASDAQ

class App extends React.Component{
  constructor(props) {
    super(props);
    this.handleChangeLocation = this.handleChangeLocation.bind(this);
    this.state = {activeItem : 'dashboard', selectedSymbol : nasdaqSymbol};
    this.handleChangeSymbol = this.handleChangeSymbol.bind(this);
    this.symbols = null;
    this.fetchSymbols();
    this.fetchUser();
  }

  fetchSymbols()
  {
      fetch('/api/symbols', { method: 'GET' }).then(response => {
          if (response.ok) {
            response.json().then(data => {
              console.log(`Data :`);
              console.log(data);
              this.symbols = data.symbols;
              this.forceUpdate();
            });
          }
        }).catch(err => {
          console.log("Error in sending data to server: " + err.message);
        });
  }

  fetchUser(){
    let user = localStorage.getItem('user');
    if(user)
      this.user = user;
  }

  handleChangeSymbol(symbol)
  {
    console.log("Hello from the App : "+symbol);
    if (symbol){
      this.setState({activeItem : this.state.activeItem, selectedSymbol : symbol});
      console.log("this.state.activeItem : "+this.state.activeItem);
      //this.handleChangeLocation(this.state.activeItem);
    }
    
  }

  handleChangeLocation(newActiveItem){
    console.log("Hello from the App 2 : "+newActiveItem);
    this.setState({activeItem : newActiveItem, selectedSymbol : this.state.selectedSymbol});
    
  }

  render(){
    if (this.symbols == null) return null;

    this.symbols.sort((obj1, obj2) =>  obj1.symbol.localeCompare(obj2.symbol));
    let keyValArr =[];
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
        <SideBar onChangeLocation={this.handleChangeLocation} name={user.name}
          symbols={keyValArr} activeItem={this.state.activeItem} onChangeSymbol={this.handleChangeSymbol} 
          selectedSymbol={this.state.selectedSymbol} />

        <TabContent symbols={keyValArr} user={user} activeItem={this.state.activeItem} 
          selectedSymbol={this.state.selectedSymbol}/>
      </div>
    );
  }
}

ReactDOM.render(
  <App />,
  document.getElementById(appContainerID)
);