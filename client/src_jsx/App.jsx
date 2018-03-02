import React from 'react';
import ReactDOM from 'react-dom';
import NavBar from './NavBar';
import SideBar from './SideBar/SideBar';
import TabContent from './TabContent';
import 'whatwg-fetch';

/*fetch('/api/3', {
      method: 'GET',
    }).then(response => {
      if (response.ok) {
        console.log("Response 3 ok");
        response.json().then(data => { 
        	console.log(data);
        });
      } else {
        console.log("Response not ok");
      }
    }).catch(err => {
      alert("Error in sending data to server: " + err.message);
    });*/
const symbols = [
  {symbol : "AAPL", company : "Apple"},
  {symbol : "AMX",  company : "Amx com"},
  {symbol : "AMX 2",  company : "Amx com2"},
  {symbol : "AMX 3",  company : "Amx com3"},
  {symbol : "AMX 4",  company : "Amx com3"},
  {symbol : "MSFT", company : "Microsoft"},
  {symbol : "CC",   company : "CC Company"},
  {symbol : "CC2",  company : "CC2 Company"},
  {symbol : "CSCO", company : "Cisco"},
  {symbol : "IBM",  company : "IBM"},
  {symbol : "IIS",  company : "IIS Company"}];

class App extends React.Component{
  render(){
    const user = {name : 'Account name', email : 'email@email.com', username : 'user_2016'};
    const activeItem = 'dashboard';

    symbols.sort((obj1, obj2) =>  obj1.symbol.localeCompare(obj2.symbol));

    let keyValArr =[];
    symbols.forEach((element) => {
      let init = element.symbol.charAt(0).toUpperCase();
      if (keyValArr[init] == undefined)
        keyValArr[init] = [element];
      else
        keyValArr[init].push(element);
    });

    return (
      <div>
        <NavBar />
        <SideBar name={user.name} symbols={keyValArr} activeItem={activeItem} />
        <TabContent symbols={keyValArr} user={user}/>
      </div>
    );
  }
}

const appContainerID = 'app';

ReactDOM.render(
  <App />,
  document.getElementById(appContainerID)
);