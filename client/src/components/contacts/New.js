import React from 'react';
import axios from '../../config/axios';
import ContactsForm from './Form.js';
class ContactsNew extends React.Component{
    constructor(){
        super()
        this.handleSubmit=this.handleSubmit.bind(this)
    }
    handleSubmit(formData){
        axios.post('/contacts', formData,{
            headers :{
                'x-auth': localStorage.getItem('token')
            }
        })
        .then(response=>{
              if(response.data.hasOwnProperty('errors')){
                 alert(response.data.message)
              }else{
                  this.props.history.push('/contacts')
                  window.location.reload()
              }
        })
        .catch(err => {
            console.log(err)
        })

    }
    render(){
        return(
            <div>
                <h2>Add contact</h2>
                <ContactsForm handleSubmit={this.handleSubmit}/>
            </div>
        )
    }
}
export default ContactsNew