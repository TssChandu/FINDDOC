import React, { useEffect, useState } from 'react'
import Layout from '../components/layout/Layout'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { showLoading, hideLoading } from '../redux/alertSlice';
import dayjs from 'dayjs';
import moment from 'moment';
import toast from 'react-hot-toast'
import axios from 'axios';
import { Button, Col, DatePicker, Row, TimePicker } from 'antd';

const BookAppointment = () => {
   const [isAvailable, setIsAvailable] = useState(false);
   const navigate = useNavigate();
   const [date, setDate] = useState();
   const [time, setTime] = useState();
   const { user } = useSelector((state) => state.user);
   const [doctor, setDoctor] = useState(null);
   const params = useParams()
   const dispatch = useDispatch()

   const getDoctorData = async () => {
      try {
         dispatch(showLoading())
         const response = await axios.post(
            "/api/doctor/get-doctor-info-by-id",
            {
               doctorId: params.doctorId
            },
            {
               headers: {
                  Authorization: `Bearer ${localStorage.getItem("token")}`,
               },
            }
         );
         dispatch(hideLoading())
         if (response.data.success) {
            setDoctor(response.data.data)
         }
      } catch (error) {
         dispatch(hideLoading())
         console.log(error)
      }
   }

   const checkAvailability = async () => {
      try {
         dispatch(showLoading());
         const response = await axios.post(
            "/api/user/check-booking-availability",
            {
               doctorId: params.doctorId,
               time: time,
               date: date,
            },
            {
               headers: {
                  Authorization: `Bearer ${localStorage.getItem("token")}`,
               },
            }
         );
         dispatch(hideLoading())
         if (response.data.success) {
            toast.success(response.data.message);
            setIsAvailable(true)
         } else {
            toast.error(response.data.message)
         }
      } catch (error) {
         toast.error("Error Booking Appointment");
         dispatch(hideLoading())
         console.log(error)
      }
   }

   const bookNow = async () => {
      setIsAvailable(false)
      try {
         dispatch(showLoading());
         const response = await axios.post(
            "/api/user/book-appointment",
            {
               doctorId: params.doctorId,
               userId: user._id,
               doctorInfo: doctor,
               userInfo: user,
               time: time,
               date: date,
            },
            {
               headers: {
                  Authorization: `Bearer ${localStorage.getItem("token")}`,
               },
            }
         );
         dispatch(hideLoading())
         if (response.data.success) {
            toast.success(response.data.message);
            navigate('/appointments')
         }
      } catch (error) {
         toast.error("Error Booking Appointment");
         dispatch(hideLoading())
         console.log(error)
      }
   }

   useEffect(() => {
      getDoctorData();
   }, []);

   const disabledDate = (current) => {
      // Can not select days before today and today
      return current && current < dayjs().endOf('day');
   };

   const range = (start, end) => {
      const result = [];
      for (let i = start; i < end; i++) {
         result.push(i);
      }
      return result;
   };

   const disabledDateTime = () => {
      const [startTimingHour, startTimingMins] = doctor.timings[0].split(":")
      const [endTimingHour, endTimingMins] = doctor.timings[1].split(":")
      const hourArray = range(0, parseInt(startTimingHour))
      for (let t = parseInt(endTimingHour); t < 24; t++) {
         hourArray.push(t)
      }
      return {
         disabledHours: () => hourArray,
         disabledMinutes: (selectedHour) => {
            let minutes = [];
            if (selectedHour === parseInt(startTimingHour)) {
               for (let i = 0; i < parseInt(startTimingMins); i += 1) minutes.push(i);
            } else if (selectedHour === parseInt(endTimingHour) - 1) {
               for (let i = parseInt(endTimingMins) + 1; i < 60; i += 1) minutes.push(i);
            } else if (selectedHour === -1) {
               minutes = range(0, 60)
            }

            return minutes;
         }
      }
   };


   return (
      <Layout>
         {doctor && (
            <div>
               <h1 className="page-title">{doctor.firstName} {doctor.lastName}</h1>
               <hr />
               <Row gutter={20} align='middle' className='mt-5'>
                  <Col span={8} sm={24} xs={24} lg={8} >
                     <img src="https://cdn-icons-png.flaticon.com/512/2534/2534679.png" alt="booknow" width='100%' height="300" />
                  </Col>
                  <Col span={8} sm={24} xs={24} lg={8}>
                     <h1 className="normal-text"><b>Timings: </b>
                        {doctor.timings[0]} - {doctor.timings[1]}
                     </h1>
                     <p className="doctor-card"><b>Phone Number: </b>{doctor.phoneNumber}</p>
                     <p className="doctor-card"><b>Specialization: </b>{doctor.specialization}</p>
                     <p className="doctor-card"><b>Experience: </b>{doctor.experience}</p>
                     <p className="doctor-card"><b>Location: </b>{doctor.address}</p>
                     <p className="doctor-card"><b>Fee Per Visit: </b>{doctor.feePerConsultation}</p>
                     <div className='d-flex flex-column'>
                        <DatePicker format='DD-MM-YYYY' disabledDate={disabledDate} className='mt-3 date-time-border'
                           onChange={(value) => { setDate(moment(value).format("DD-MM-YYYY")); setIsAvailable(false) }} />
                        <TimePicker format='HH:mm' className='mt-3' disabledTime={disabledDateTime}
                           onChange={(value) => {
                              setTime(
                                 moment(value).format("HH-mm")
                              );
                              setIsAvailable(false)
                           }} />
                        {!isAvailable && (<Button className='primary-button full-width-button' onClick={checkAvailability}>Check Availabilty</Button>)}
                        {isAvailable && (<Button className='primary-button full-width-button' onClick={bookNow}>Book Now</Button>)}
                     </div>
                  </Col>
               </Row>
            </div>
         )}
      </Layout>
   )
}

export default BookAppointment