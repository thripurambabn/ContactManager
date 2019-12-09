import React from 'react'
import axios from './config/axios'

import {BrowserRouter,Route,Link, Switch} from 'react-router-dom'
import Register from './components/users/Register'
import Login from './components/users/Login'
import Home from './components/common/Home'
import ContactList from './components/contacts/List'
import ContactsShow from  './components/contacts/Show'
import ContactsNew from './components/contacts/New'
import ContactsEdit from './components/contacts/Edit'

export default function App(props){
    
    // return (
    //     <BrowserRouter>
    //     <div>
    //         <h2>Contact-Manager</h2>

    //         <ul>
    //             <li><Link to="/">Home</Link></li>
    //             <li><Link to="/users/register">Register</Link></li>
    //             <li><Link to="/users/login">login</Link></li>


    //             <Route path="/"component={Home} exact={true}/>
    //             <Route path="/users/register" component={Register}/>
    //             <Route path="/users/login" component={Login}/>
    //         </ul>
    //     </div>
    //     </BrowserRouter>
    // )
        console.log(props)
        function handleClick(){
            axios.delete('/users/logout',{
                headers:{
                    'x-auth':localStorage.getItem('token')
                }
            })
            .then(response =>{
                console.log(response)
                alert(response.data.notice)
                localStorage.removeItem('token')
                window.location.reload()
                window.location.href="/"
            })
        }
        return (
            <BrowserRouter>
            <div>
                <h2>Contact manager</h2> 
                <ul>
                <li><Link to="/">Home</Link> </li>
                {
                    localStorage.getItem('token') ?(
                        <div>
                            <li><Link to="/contacts">Contacts</Link> </li>
                            <li><Link to="#" onClick={handleClick}>Logout</Link> </li>
                            
                        </div>
                    ):(
                        <div>
                                        
                            <li><Link to="/register">Register</Link> </li>
                            <li><Link to="/login">Login</Link> </li>
                        </div>
                    )
                }
                <Switch>
    
                    <Route path="/" component={Home} exact={true}/>
                    <Route path="/register" component={Register} exact={true}/>                
                    <Route path="/login" component={Login} exact={true}/>
                    <Route path="/contacts" component={ContactList} exact={true}/>
                    <Route path="/contacts/new" component={ContactsNew} exact={true}/>
                    <Route path="/contacts/edit/:id" component={ContactsEdit} exact={true}/>
                    <Route path="/contacts/:id" component={ContactsShow} exact={true}/>
                    </Switch>
                </ul>
            </div>
            </BrowserRouter>
        );
    }
