// import React, { Component } from 'react';
// import {BrowserRouter, Route, Link, Switch} from "react-router-dom"
// import createBrowserHistory from "history/createBrowserHistory"
// import Banlist from "./components/Banlist"
// import NotFound from "./components/NotFound"
// import List from "./components/List"
// import Genre from "./components/Genre"
//
// const history = createBrowserHistory();
//
// const Admin = () => (
//     <div>
//         <h2>Admin</h2>
//     </div>
// )
//
// const Home = () => (
//     <div>
//         <h2>Home</h2>
//     </div>
// )
//
// const About = () => (
//     <div>
//         <h2>About</h2>
//     </div>
// )
//
// const Contacts = () => (
//     <div>
//         <h2>Contacts</h2>
//     </div>
// )
//
// class Navigation extends Component {
//     render() {
//         return (
//             <BrowserRouter history={history}>
//                 <div>
//                     <ul>
//                         <li><Link to="/">Home</Link></li>
//                         <li><Link to="/admin">Admin</Link></li>
//                         <li><Link to="/about">About</Link></li>
//                         <li><Link to="/contacts">Contacts</Link></li>
//                         <li><Link to="/list">List</Link></li>
//                         <li><Link to="/banlist">Banlist</Link></li>
//                     </ul>
//
//                     <hr/>
//                     <Switch>
//                         <Route exact path="/" component={Home}/>
//                         <Route path="/admin" component={Admin}/>
//                         <Route path="/about" component={About}/>
//                         <Route path="/contacts" component={Contacts}/>
//                         <Route path="/banlist" component={Banlist}/>
//                         <Route path="/list" component={List}/>
//                         <Route path='/genre/:genre' component={Genre} />
//                         <Route path="*" component={NotFound}/>
//                     </Switch>
//                 </div>
//
//
//
//             </BrowserRouter>
//         )
//     }
// }
//
// export default Navigation;