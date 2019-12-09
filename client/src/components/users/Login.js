import React from 'react'
import axios from '../../config/axios'

class Login extends React.Component{
    constructor(){
        super()
        this.state={
            email:'',
            password:''
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }
    handleChange(e){
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    // handleSubmit(e){
    //     e.preventDefault()
    //     const formData = {
    //         email: this.state.email,
    //         password:this.state.password
    //     }
    //     console.log(formData)
        
    // }
    handleSubmit(e){
        e.preventDefault()
        const formData = {
        
            email: this.state.email,
            password: this.state.password
        }
        console.log(formData)
        axios.post('/users/login',formData)
            .then(response=>{
                if(response.data.hasOwnProperty('errors')){
                    alert(response.data.message)
                }else{
                    const token=response.data.token
                    console.log(token)
                    localStorage.setItem('token',token)
                    this.props.history.push('/')
                    window.location.reload()
                }
            })
    }
    render(){
        return (
            <form onSubmit={this.handleSubmit}>
               <h2>Login</h2> <label>
                    Email <input type="text" value={this.state.email} onChange={this.handleChange} name="email" />
                </label> <br/>
                <label>
                    Password <input type="password" value={this.state.password} onChange={this.handleChange} name="password" />
                </label> <br/>
                <input type="submit"/>
            </form>
        )
    }
    
}

export default Login