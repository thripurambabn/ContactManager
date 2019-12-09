import React from 'react'
import axios from '../../config/axios'
class UserRegister extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            name: props.customer?props.customer.name:'',
            mobile: props.customer?props.customer.mobile:'',
            email: props.customer?props.customer.email:''
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleChange(e) {
        //console.log(e.target.name, e.target.value)
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    // handleSubmit(e) {
    //     e.preventDefault() 
    //     const formData = {
    //         name: this.state.name,
    //         email: this.state.email,
    //         mobile: this.state.mobile
    //     }
    //     console.log(formData)
      
    // }
    handleSubmit(e) {
        e.preventDefault()
        const formData = {
            username: this.state.name,
            email: this.state.email,
            password: this.state.password
        }
       // console.log(formData)
        axios.post('users/register',formData)
        .then(response=>{
            if(response.data.hasOwnProperty('errors')){
                alert(response.data.message)
            }else{
                this.props.history.push('/users/login')
            }
        })
        
    }

    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <h2>register</h2>
                    <label>
                        Name <input type="text" value={this.state.name} onChange={this.handleChange} name="name"/>
                    </label> <br/>
                    <label>
                        Email <input type="text" value={this.state.email} onChange={this.handleChange} name="email" />
                    </label> <br/>
                    <label>
                    password<input type="password" value={this.state.password} onChange={this.handleChange} name="password" />
                </label> <br/>
                    <input type="submit" />

                </form>
            </div>
        )
    }
}

export default UserRegister