import React from 'react'
import { Button, Form, Input, Col, Row, TimePicker } from 'antd';
import '../index.css'
import moment from 'moment';

const DoctorForm = (props) => {
   const { onFinish, initialValues } = props
   // console.log(initialValues)
   return (
      <Form layout="vertical" onFinish={onFinish} initialValues={{
         ...initialValues, ...(initialValues && {
            timings: [
               moment(initialValues?.timings[0], "HH:mm"),
               moment(initialValues?.timings[1], "HH:mm")
            ]
         })
      }}>
         <h1 className="card-title">Personal Information</h1>
         <Row gutter={20}>
            <Col span={8} xs={24} sm={24} lg={8}>
               <Form.Item label="First Name" name="firstName" rules={[{ required: true },]}>
                  <div className='auth-input'>
                     <Input placeholder="First Name" className='password-input' />
                  </div>
               </Form.Item>
            </Col>
            <Col span={8} xs={24} sm={24} lg={8}>
               <Form.Item label="Last Name" name="lastName" rules={[{ required: true },]}>
                  <div className='auth-input'>
                     <Input placeholder="Last Name" className='password-input' />
                  </div>
               </Form.Item>
            </Col>
            <Col span={8} xs={24} sm={24} lg={8}>
               <Form.Item label="Phone Number" name="phoneNumber" rules={[{ required: true },]}>
                  <div className='auth-input'>
                     <Input placeholder="Phone Number" type='number' className='password-input' />
                  </div>
               </Form.Item>
            </Col>
            <Col span={8} xs={24} sm={24} lg={8}>
               <Form.Item label="Address" name="address" rules={[{ required: true },]}>
                  <div className='auth-input'>
                     <Input placeholder="Address" className='password-input' />
                  </div>
               </Form.Item>
            </Col>
            <Col span={8} xs={24} sm={24} lg={8}>
               <Form.Item label="Website" name="website" >
                  <div className='auth-input'>
                     <Input placeholder="Website" className='password-input' />
                  </div>
               </Form.Item>
            </Col>
         </Row>
         <hr />
         <h1 className="card-title">Professional Information</h1>
         <Row gutter={20}>
            <Col span={8} xs={24} sm={24} lg={8}>
               <Form.Item label="Specialization" name="specialization" rules={[{ required: true },]}>
                  <div className='auth-input'>
                     <Input placeholder="Specialization" className='password-input' />
                  </div>
               </Form.Item>
            </Col>
            <Col span={8} xs={24} sm={24} lg={8}>
               <Form.Item label="Experience" name="experience" rules={[{ required: true },]}>
                  <div className='auth-input'>
                     <Input placeholder="Experience" type='number' className='password-input' />
                  </div>
               </Form.Item>
            </Col>
            <Col span={8} xs={24} sm={24} lg={8}>
               <Form.Item label="Fee Per Consultation" name="feePerConsultation" rules={[{ required: true },]}>
                  <div className='auth-input'>
                     <Input placeholder="Fee Per Consultation" type='number' className='password-input' />
                  </div>
               </Form.Item>
            </Col>
            <Col span={8} xs={24} sm={24} lg={8}>
               <Form.Item label="Timings" name="timings" rules={[{ required: true },]}>
                  <TimePicker.RangePicker format="HH:mm" />
               </Form.Item>
            </Col>
         </Row>
         <div className="d-flex justify-content-end">
            <Button className='primary-button' htmlType="submit">Submit
               <div className='wave'></div>
            </Button>
         </div>
      </Form>
   )
}

export default DoctorForm