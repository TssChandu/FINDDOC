import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Button, Form } from 'antd'
import toast from 'react-hot-toast'
import Input from 'antd/lib/input/Input'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { showLoading, hideLoading } from '../redux/alertSlice'
import { useContext } from "react";
import { RecoveryContext } from "../App";

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const { setEmail, setPage, email, setOTP } = useContext(RecoveryContext);

  const nagigateToOtp = async () => {
    try {
      if (email) {
        const OTP = Math.floor(Math.random() * 900000 + 100000);
        setOTP(OTP);

        const response = await axios.post("api/user/send_recovery_email", {
          OTP,
          recipient_email: email,
        })
        // console.log(response)

        if (response.data.success) {
          toast.success(response.data.message)
          setPage("otp")
          navigate('/otp')
        } else {
          toast.error(response.data.message);
        }
        return;
      }
      return alert("Please enter your email");
    } catch (error) {
      console.log(error)
    }
  }

  const onFinish = async (values) => {
    try {
      dispatch(showLoading());
      const response = await axios.post('api/user/login', values);
      dispatch(hideLoading());
      if (response.data.success) {
        toast.success(response.data.message);
        localStorage.setItem("token", response.data.data)
        navigate('/')
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      dispatch(hideLoading());
      toast.error("Something went wrong");
    }
  }

  return (
    <div className='authentication'>
      <div className='authentication-form card p-3'>
        <h1 className='card-title'>Welcome Back</h1>
        <Form layout='vertical' onFinish={onFinish}>
          <Form.Item label="Email" name="email" rules={[
            {
              required: true,
              message: 'Please input your email!',
            },
          ]}>
            <Input placeholder='Email' className='password-input' onChange={(e) => setEmail(e.target.value)} />
          </Form.Item>
          <Form.Item label="Password" name="password" rules={[
            {
              required: true,
              message: 'Please input your password!',
            },
          ]}>
            <Input placeholder='Password' type='password' className='password-input' />
          </Form.Item>
          <Button className='primary-button auth' htmlType='submit'>LOGIN</Button>
          <div className='d-flex justify-content-end mr-0'>
            <button onClick={() => nagigateToOtp()} className="forgot-btn" type="button">
              Forgot password?
            </button>
          </div>
          <Link to='/register' className='anchor'>CLICK HERE TO REGISTER</Link>
        </Form>
      </div>
    </div>
  )
}

export default Login