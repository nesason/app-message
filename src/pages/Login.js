import React, { useState } from 'react';
import { Row, Col, Form, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom';
import axios from 'axios'
import { useAuthDispatch } from '../context/auth'



export default function Login(props) {


    const [variables, setVariables] = useState({
        email: "",
        password: ""
    })

    const [errors, setErrors] = useState({});
    const dispatch=useAuthDispatch()
 
    async function submitLoginForm ()  {
        const resp=await axios.post("http://localhost:5000/users/login", variables)
          dispatch({type:'LOGIN',payload:resp.data})
          props.history.push('/');

    }

    const validator = (e) => {

        e.preventDefault()

        if (variables.password && variables.email ) {
            submitLoginForm()
           
        }else{
            if (!variables.password) {
                setErrors(errors=>({...errors,password:"Password must be not empty"}))
            }
            
            if (!variables.email) {
                setErrors(errors=>({...errors,email:"Email must be not empty"}))
            }
        } 
    }

    return (
        <Row className="bg-white py-5 justify-content-center">
            <Col sm={8} md={6} lg={4}>
                <h1 className="text-center"> Login</h1>
                <Form onSubmit={validator}>

                    <Form.Group>
                        <Form.Label className={errors.email && 'text-danger'}>
                            {errors.email ?? 'Email'}
                        </Form.Label>
                        <Form.Control
                            type="text"
                            value={variables.email}
                            className={errors.email && 'is-invalid'}
                            onChange={e => { setVariables({ ...variables, email: e.target.value }) }} />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label className={errors.password && 'text-danger'}>
                            {errors.password ?? 'Password'}
                        </Form.Label>
                        <Form.Control
                            type="password"
                            value={variables.password}
                            className={errors.password && 'is-invalid'}
                            onChange={e => { setVariables({ ...variables, password: e.target.value }) }} />
                    </Form.Group>

                    <div className="text-center">
                        <Button variant="success" type="submit" >Login</Button>

                    </div>
                    <br />
                    <small>don't have an account<Link to="/register">Register</Link></small>


                </Form>
            </Col>
        </Row>
    )
}
