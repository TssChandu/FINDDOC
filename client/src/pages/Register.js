import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Button, Form } from 'antd'
import Input from 'antd/lib/input/Input'
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
        <h1 className='card-title'>Nice to Meet U</h1>
        <Form layout='vertical' onFinish={onFinish}>
          <Form.Item label="Name" name="name" rules={[
            {
              required: true,
              message: 'Please input your username!',
            },
          ]}>
            <Input placeholder='Name' />
          </Form.Item>
          <Form.Item label="Email" name="email" rules={[
            {
              required: true,
              message: 'Please input your email!',
            },
          ]}>
            <Input placeholder='Email' />
          </Form.Item>
          <Form.Item label="Password" name="password" rules={[
            {
              required: true,
              message: 'Please input your password!',
            },
          ]}>
            <Input placeholder='Password' type='password' />
          </Form.Item>
          <Button className='primary-button auth' htmlType='submit'>REGISTER</Button>
          <Link to='/login' className='anchor'>CLICK HERE TO LOGIN</Link>
        </Form>
      </div>
    </div>
  )
}

export default Register