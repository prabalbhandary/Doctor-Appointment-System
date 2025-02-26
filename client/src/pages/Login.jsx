import { Form, Input } from 'antd'
import React from 'react'
import { Link } from 'react-router-dom'
import "../styles/Register.css"

const Login = () => {
  const onFinishHandler = (values) => {
    console.log(values)
  }
  return (
    <>
        <div className="form-container">
            <Form className='register-form' layout='vertical' onFinish={onFinishHandler}>
                <h3 className='text-center'>Login Form</h3>
                <Form.Item label="Email" name="email">
                    <Input type="email" required />
                </Form.Item>
                <Form.Item label="Password" name="password">
                    <Input type="password" required />
                </Form.Item>
                <Link to="/register" className='m-2'>Not a user? Register Here</Link>
                <button type="submit" className='btn btn-primary'>Login</button>
            </Form>
        </div>
    </>
  )
}

export default Login