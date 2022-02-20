import React, { useState } from 'react';
import { Row, Col, Form, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom';
import axios from 'axios'


export default function Register(props) {


    const [variables, setVariables] = useState({
        name: "",
        email: "",
        password: "",
        // confirimPassword: ""
    })

    const [errors, setErrors] = useState({});


    async function  submitRegisterForm () {
          const err=await axios.post("http://localhost:5000/users/signup", variables)
        
          if (err.data.message) {
            setErrors({email:err.data.message})

          }
          else{
            props.history.push('/login')

         }
    }
    const validator = (e) => {

        e.preventDefault()

        if (variables.password && variables.name && variables.email) {
            submitRegisterForm()
           
        }else{
            if (!variables.password) {
                setErrors(errors=>({...errors,password:"Password must be not empty"}))
            }
            if (!variables.email) {
                setErrors(errors=>({...errors,email:"Email must be not empty"}))
            }
            if (!variables.name) {
                setErrors(errors=>({...errors,name:"Name must be not empty"}))
            }
        } 
    }
    return (
        <Row className="bg-white py-5 justify-content-center">
            <Col sm={8} md={6} lg={4}>
                <h1 className="text-center"> Register</h1>
                <Form onSubmit={validator}>
                    <Form.Group>
                        <Form.Label className={errors.email && 'text-danger'}>
                            {errors.email ?? 'Email address'}
                        </Form.Label>
                        <Form.Control
                            type="email"
                            value={variables.email}
                            className={errors.email &&'is-invalid'}
                            onChange={e => { setVariables({ ...variables, email: e.target.value }) }} />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label className={errors.name && 'text-danger'}>
                            {errors.name ?? 'Username'}
                        </Form.Label>
                        <Form.Control
                            type="text"
                            value={variables.name}
                            className={errors.name && 'is-invalid'}
                            onChange={e => { setVariables({ ...variables, name: e.target.value }) }} />
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
                    {/* <Form.Group>
                        <Form.Label className={errors.confirimPassword && 'text-danger'}>
                            {errors.confirimPassword ?? 'Confirm Password'}
                        </Form.Label>
                        <Form.Control
                            type="password"
                            value={variables.confirimPassword}
                            className={errors.confirimPassword && 'is-invalid'}
                            onChange={e => { setVariables({ ...variables, confirimPassword: e.target.value }) }} />
                    </Form.Group> */}
                    <div className="text-center">
                        <Button variant="success" type="submit" >register</Button>

                    </div>

                    <br />
                    <small>Already have an account<Link to="/login">Login</Link></small>

                </Form>
            </Col>
        </Row>
    )
}
