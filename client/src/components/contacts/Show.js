import React from 'react';
import axios from '../../config/axios';
import {Link} from 'react-router-dom'
class ContactsShow extends React.Component{
    constructor(){
        super()
        this.state={
            contact:{}
        }
    }
    handleRemove=()=>{
        const id=this.props.match.params.id
        const confirmRemove=window.confirm('are you sure?')
        if(confirmRemove){
        axios.delete(`/contacts/${id}`,{
            headers:{
            'x-auth':localStorage.getItem('token')
                } 
           }).then (response=> {
              this.props.history.push('/contacts')
               
           })
        }
    }
    componentDidMount(){
        const id=this.props.match.params.id
        axios.get(`/contacts/${id}`,{
            headers:{
            'x-auth':localStorage.getItem('token')
                } 
           }).then (response=> {
               const contact=response.data
               this.setState({contact})
           })
           .catch(err =>{
               console.log(err)
           })
    }
    render(){
        return(
            this.state.contact ? 
            (<div>
                <h2>contact show page</h2>
                <p>
                    {this.state.contact.name},
                    {this.state.contact.mobile},
                    {this.state.contact.email}
                </p>
                <Link to={`/contacts/edit/${this.state.contact._id}`}>Edit</Link>
                <button onClick={this.handleRemove}>delete</button>
                <Link to="/contacts">Back</Link>
                
            </div>):
            (<div><p>contact is not present</p></div>)
        )
    }
  
}
export default ContactsShow