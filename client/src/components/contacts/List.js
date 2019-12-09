import React from 'react';
import axios from '../../config/axios';
import {Link} from 'react-router-dom';
class ContactsList  extends React.Component{
  
        constructor(){
            super()
            this.state={
                contacts:[]
            }
        }
        handleRemove=(id)=>{
                 const confirmRemove=window.confirm('are you sure?')
                 if(confirmRemove){
                    axios.delete(`contacts/${id}`,{
                        headers:{
                            'x-auth':localStorage.getItem('token')
                        }
                    })
                    .then(response=>{
                        this.setState(prevState=>({
                            contacts:prevState.contacts.filter(contacts=>
                                contacts._id!==response.data._id)
                        }))
                    })        
                }
        }
        componentDidMount(){
            axios.get('/contacts',{
                headers:{
                    'x-auth': localStorage.getItem('token')
                }
            })
            .then(response=>{
                console.log(response.data)
                const contacts=response.data
                this.setState({contacts})
            })
            .catch(err=>{
                console.log(err)
            })
        }
        render()
        {
        return(
            <div>
        
                <h2>Listing contacts-{this.state.contacts.length}</h2>
                <ul>
                    {this.state.contacts.map(contact=>{
                        return <li key={contact._id}> <Link to={`/contacts/${contact._id}`}>{contact.name}</Link>
                                <button onClick={()=>{
                                    this.handleRemove(contact._id)
                                }}>remove</button></li>
                    })}
                </ul>
                <Link to="/contacts/new">add contacts</Link>
            </div>
            
        )
    }
}
export default ContactsList