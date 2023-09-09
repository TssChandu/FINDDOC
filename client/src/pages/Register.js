import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Button, Form, Input } from 'antd'
import axios from "axios";
import toast from 'react-hot-toast'
import { useDispatch } from 'react-redux';
import { hideLoading, showLoading } from '../redux/alertSlice';

function Register() {
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const onFinish = async (values) => {
    try {
      dispatch(showLoading())
      const response = await axios.post('api/user/register', values);
      dispatch(hideLoading())
      if (response.data.success) {
        toast.success(response.data.message);
        navigate('/login')
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      dispatch(hideLoading())
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
          <li>D</li>
          <li>D</li>
          <li>O</li>
          <li>C</li>
        </ul>
        <Form layout='vertical' onFinish={onFinish}>
          <Form.Item label="Name" name="name" rules={[
            {
              required: true,
              message: 'Please input your username!',
            },
          ]}><div className='auth-input'>
              <Input placeholder='Name' className='password-input' />
            </div>
          </Form.Item>
          <Form.Item label="Email" name="email" rules={[
            {
              required: true,
              message: 'Please input your email!',
            },
          ]}>
            <div className='auth-input'>
              <Input placeholder='Email' className='password-input' />
            </div>
          </Form.Item>
          <Form.Item label="Password" name="password" rules={[
            {
              required: true,
              message: 'Please input your password!',
            },
          ]}>
            <Input.Password placeholder='Password' type='password' className='password-input auth-input' />
          </Form.Item>
          <Button className='primary-button auth' htmlType='submit'>REGISTER
            <div className='wave'></div>
          </Button>
          <Link to='/login' className='anchor'>CLICK HERE TO LOGIN</Link>
        </Form>
      </div>
    </div>
  )
}

export default Register