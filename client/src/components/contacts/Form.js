import React from 'react'

class CustomerForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            name: props.contacts? props.contacts.name:'',
            mobile: props.contacts?props.contacts.mobile:'',
            email: props.contacts?props.contacts.email:''
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

    handleSubmit(e) {
        e.preventDefault() 
        const formData = {
            name: this.state.name,
            email: this.state.email,
            mobile: this.state.mobile
        }
        console.log(formData)
        this.props.handleSubmit(formData)
    }

    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <label>
                        Name <input type="text" value={this.state.name} onChange={this.handleChange} name="name"/>
                    </label> <br/>
                    <label>
                        Email <input type="text" value={this.state.email} onChange={this.handleChange} name="email" />
                    </label> <br/>
                    <label>
                        Mobile <input type="text" value={this.state.mobile} onChange={this.handleChange} name="mobile" />
                    </label> <br/>
                    <input type="submit" />

                </form>
            </div>
        )
    }
}

export default CustomerForm 