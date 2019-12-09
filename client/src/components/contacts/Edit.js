import React from 'react';
import axios from '../../config/axios'
import ContactsForm from './Form'

class ContactsEdit extends React.Component{
    constructor(){
        super()
        this.state ={
            contacts:{}
        }
        this.handleSubmit = this.handleSubmit.bind(this)
    }
    componentDidMount(){
        const id=this.props.match.params.id
        axios.get(`contacts/${id}`,{
            headers : {
                'x-auth' : localStorage.getItem('token')
            }
        })
        .then(response =>{
            const contacts =response.data
            this.setState({contacts})
        })
    }
    handleSubmit(formData){
        console.log('formadata',formData)
        const id =this.props.match.params.id
        axios.put(`/contacts/${id}`,
        formData,{
            headers: {
                'x-auth' :localStorage.getItem('token')
            }
        })
        .then(response => {
            if(response.data.hasOwnProperty('errors')) {
                alert(response.data.message)
            }else{
                console.log(response.data)
                this.props.history.push(`/contacts/${id}`)
                
            }
        })
    }
    render(){
        return(
            <div>
                <h2>Edit contacts</h2>
                { Object.keys(this.state.contacts).length !== 0 && <ContactsForm  contacts={this.state.contacts}
                handleSubmit={this.handleSubmit}  />}
                            
            </div>
        )
    }
}
export default ContactsEdit