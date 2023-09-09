import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Button, Form, Input } from 'antd'
import toast from 'react-hot-toast'
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
        dispatch(showLoading())
        const response = await axios.post("api/user/send_recovery_email", {
          OTP,
          recipient_email: email,
        })
        // console.log(response)
        dispatch(hideLoading());

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
        <ul>
          <li>F</li>
          <li>I</li>
          <li>N</li>
          <li>D </li>
          <li>D</li>
          <li>O</li>
          <li>C</li>
        </ul>
        <Form layout='vertical' onFinish={onFinish}>
          <Form.Item label="Email" className='label' name="email" rules={[
            {
              required: true,
              message: 'Please input your email!',
            },
          ]}>
            <div className='auth-input'>
              <Input placeholder='Email' className='password-input' onChange={(e) => setEmail(e.target.value)} />
            </div>
          </Form.Item>
          <Form.Item label="Password" className='label' name="password" rules={[
            {
              required: true,
              message: 'Please input your password!',
            },
          ]}>
            <Input.Password placeholder='Password' type='password' className='password-input auth-input' />
          </Form.Item>
          <Button className='primary-button auth' htmlType='submit'>LOGIN
            <div className='wave'></div>
          </Button>
          <div className='d-flex justify-content-end mr-0'>
            <button onClick={() => {
              nagigateToOtp()
            }} className="forgot-btn" type="button">
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