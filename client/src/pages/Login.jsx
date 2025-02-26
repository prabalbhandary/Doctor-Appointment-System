import { Form, Input } from 'antd'
import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import "../styles/Register.css"
import axios from 'axios'
import { toast } from 'react-toastify'

const Login = () => {
  const navigate = useNavigate();
  const onFinishHandler = async(values) => {
    try {
      const res = await axios.post("http://localhost:5000/api/v1/users/login?", values);
      if(res?.data?.success) {
          toast.success(res?.data?.message);
          navigate("/");
      }else{
          toast.error(res?.data?.message);
      }
  } catch (error) {
      if(error?.response?.data && error?.response?.data?.message) {
          console.log(error?.response?.data?.message)
          toast.error(error?.response?.data?.message);
      }
  }
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