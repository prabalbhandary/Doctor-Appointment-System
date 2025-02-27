import axios from 'axios';
import React, { useEffect } from 'react'
import { toast } from 'react-toastify'
import {useDispatch} from "react-redux"
import { showLoading, hideLoading } from '../redux/features/alertSlice'
import Layout from '../components/Layout';

const Home = () => {
  const dispatch = useDispatch();
  const getUserData = async() => {
    try {
      const res = await axios.post("http://localhost:5000/api/v1/users/getUserData", {}, {headers: {Authorization: `Bearer ${localStorage.getItem("token")}`}});
      if(res?.data?.success) {
        toast.success(res?.data?.message);
      }
    } catch (error) {
      if(error?.response?.data && error?.response?.data?.message) {
                console.log(error?.response?.data?.message)
                toast.error(error?.response?.data?.message);
            }
    }
  }
  useEffect(() => {
    getUserData()
  }, [])
  return (
    <Layout>
      <h1>Home</h1>
    </Layout>
  )
}

export default Home