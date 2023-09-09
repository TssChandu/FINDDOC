import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button, Form, Input, Checkbox } from 'antd'
import toast from 'react-hot-toast'
import axios from 'axios'
import { useDispatch } from 'react-redux';
import { showLoading, hideLoading } from '../../redux/alertSlice'
import { useContext } from "react";
import { RecoveryContext } from "../../App";

const Reset = () => {
   const dispatch = useDispatch();
   const navigate = useNavigate()
   const { email } = useContext(RecoveryContext);
   const [isChecked, setIschecked] = useState(false)
   console.log(email)

   const onFinish = async (values) => {
      values = { ...values, email }
      console.log(values)
      try {
         if (!isChecked) {
            alert("Please accept the Terms and Conditions")
         } else if (values.newPassword !== values.password) {
            alert("Passwords are not matched. Please enter the same passwords")
         } else {
            dispatch(showLoading());
            const response = await axios.post('api/user/reset-password', values);
            dispatch(hideLoading());
            if (response.data.success) {
               toast.success(response.data.message);
               navigate('/login')
            } else {
               toast.error(response.data.message);
            }
         }
      } catch (error) {
         dispatch(hideLoading());
         toast.error("Something went wrong");
      }
   }

   const onChangeCheckbox = (e) => {
      if (e.target.checked) {
         setIschecked(true)
      } else {
         setIschecked(false)
      }
   };

   return (
      <div className='authentication'>
         <div className='authentication-form card p-3'>
            <div className="d-flex justify-content-center">
               <h1 className='otp-card-title' style={{ color: "#fff" }}>Change Password</h1>
            </div>
            <Form layout='vertical' onFinish={onFinish}>
               <Form.Item label="New Password" name="newPassword" rules={[
                  {
                     required: true,
                     message: 'Required*',
                  },
               ]}>
                  <div className='auth-input'>
                     <Input.Password placeholder='***********' className='password-input auth-input' />
                  </div>
               </Form.Item>
               <Form.Item label="Confirm Password" name="password" rules={[
                  {
                     required: true,
                     message: 'Required*',
                  },
               ]}>
                  <div className='auth-input'>
                     <Input.Password placeholder='***********' type='password' className='password-input auth-input' />
                  </div>
               </Form.Item>
               <Checkbox onChange={onChangeCheckbox}>I accept the{" "}
                  <button
                     className="forgot-btn"
                     href="#"
                  >
                     Terms and Conditions
                  </button></Checkbox>
               <Button className='primary-button auth' htmlType='submit'>RESET PASSWORD
                  <div className='wave'></div>
               </Button>
            </Form>
         </div>
      </div>
   )
}

export default Reset