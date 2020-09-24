import React, {Component} from 'react';
import {
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    Form,
    Label,
    Input,
    NavLink,
    Alert
} from 'reactstrap';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {register} from '../redux/actions/authAction';
import {clearErrors} from '../redux/actions/errorAction';

class RegisterModal extends Component{
state = {
    modal: false,
    name: '',
    email:'',
    password:'',
    msg:null
}

static propTypes = {
    isAuthenticated:PropTypes.bool,
    error: PropTypes.object.isRequired,
    register: PropTypes.func.isRequired,
    clearErrors: PropTypes.func.isRequired
}

componentDidUpdate(prevProps){
    const {error, isAuthenticated} = this.props;
    if(error !== prevProps.error){
        if(error.id === 'REGISTER_FAIL'){
            this.setState({msg:error.msg.msg});
        }else{
            this.setState({msg:null})
        }
    }

    //Close Modal
    if(this.state.modal){
        if(isAuthenticated){
            this.toggle();
        }
    }
}

toggle = ()=>{
    this.props.clearErrors();
    this.setState({
        modal: !this.state.modal
    })
}

onChange = e =>{
    this.setState({[e.target.name]: e.target.value});
}

handleOnSubmit = e =>{
    e.preventDefault();
    const {name,email,password} = this.state;
    //Register
    const newUser={
        name,
        email,
        password
    }
    this.props.register(newUser);
    
    // //Close Modal
    // this.toggle();
}

render() {
    return(
        <div>
        <NavLink onClick={this.toggle} href="#">
            Register
        </NavLink>

        <Modal isOpen={this.state.modal} toggle={this.toggle}>
            <ModalHeader toggle={this.toggle}>Register</ModalHeader>
            <ModalBody>
                {this.state.msg? <Alert color="danger">{this.state.msg}</Alert>:null}
                <Form onSubmit={this.handleOnSubmit}>
                    <Label for="name"> Enter Name</Label>
                    <Input 
                    type="text"
                    name="name"
                    id="name"
                    placeholder="Name"
                    onChange={this.onChange}
                    />

                    <Label for="email">Enter Email</Label>
                    <Input 
                    type="email"
                    name="email"
                    id="email"
                    placeholder="Email"
                    onChange={this.onChange}
                    />

                    <Label for="name"> Enter Password</Label>
                    <Input 
                    type="password"
                    name="password"
                    id="password"
                    placeholder="Password"
                    onChange={this.onChange}
                    />

                    <Button
                    color="dark"
                    style={{marginTop:'2rem'}}
                    block

                     >
                        Register
                    </Button>
                </Form>
            </ModalBody>
        </Modal>
        </div>
    )
}
}

const mapStateToProps = (state)=>({
    isAuthenticated:state.auth.isAuthenticated,
    error:state.error
})

export default connect(mapStateToProps,{register,clearErrors})(RegisterModal);