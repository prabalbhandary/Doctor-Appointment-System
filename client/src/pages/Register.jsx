import React from 'react'
import {Form, Input} from "antd"
import "../styles/Register.css"
import { Link } from 'react-router-dom'

const Register = () => {
    const onFinishHandler = (values) => {
        console.log(values)
    }
  return (
    <>
        <div className="form-container">
            <Form className='register-form' layout='vertical' onFinish={onFinishHandler}>
                <h3 className='text-center'>Register Form</h3>
                <Form.Item label="Name" name="name">
                    <Input type="text" required />
                </Form.Item>
                <Form.Item label="Email" name="email">
                    <Input type="email" required />
                </Form.Item>
                <Form.Item label="Password" name="password">
                    <Input type="password" required />
                </Form.Item>
                <Link to="/login" className='m-2'>Already registered? Login Here</Link>
                <button type="submit" className='btn btn-primary'>Register</button>
            </Form>
        </div>
    </>
  )
}

export default Register
// continue from 15:16 part 4