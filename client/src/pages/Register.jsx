import React from 'react'
import {Form, Input} from "antd"
import "../styles/Register.css"
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { toast } from 'react-toastify'
import {useDispatch} from "react-redux"
import { showLoading, hideLoading } from '../redux/features/alertSlice'

const Register = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const onFinishHandler = async(values) => {
        try {
            dispatch(showLoading());
            const res = await axios.post("http://localhost:5000/api/v1/users/register", values);
            dispatch(hideLoading());
            if(res?.data?.success) {
                toast.success(res?.data?.message);
                navigate("/login");
            }else{
                      toast.error(res?.data?.message);
                  }
        } catch (error) {
            dispatch(hideLoading());
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