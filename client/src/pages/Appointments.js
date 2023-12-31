import React, { useEffect, useState } from 'react'
import Layout from '../components/layout/Layout'
import { useDispatch } from 'react-redux'
import axios from 'axios'
import { showLoading, hideLoading } from '../redux/alertSlice'
import { Table } from 'antd'
import moment from 'moment'

const Appointments = () => {
   const [appointments, setAppointments] = useState([]);
   const dispatch = useDispatch();

   const getAppointmentsData = async () => {
      try {
         dispatch(showLoading())
         const response = await axios.get('/api/user/get-appointments-by-user-id', {
            headers: {
               Authorization: `Bearer ${localStorage.getItem("token")}`
            },
         })
         dispatch(hideLoading());
         if (response.data.success) {
            setAppointments(response.data.data)
         }
      } catch (error) {
         dispatch(hideLoading())
         console.log(error)
      }
   }

   useEffect(() => {
      getAppointmentsData()
   }, [])

   const columns = [
      {
         title: "Id",
         dataIndex: "_id",
      },
      {
         title: "Doctor",
         dataIndex: 'name',
         render: (text, record) => <span>
            {record.doctorInfo.firstName} {record.doctorInfo.lastName}
         </span>
      },
      {
         title: "Date & Time",
         dataIndex: 'createdAt',
         render: (text, record) => {
            const timeArray = record.time.split("T")
            console.log(timeArray)
            const time = timeArray[1].slice(0, 5)
            return (<span>
               {moment(record.date).format("DD-MM-YYYY")} & {time}
            </span>)
         }
      },
      {
         title: "Phone",
         dataIndex: 'phoneNumber',
         render: (text, record) => <span>
            {record.doctorInfo.phoneNumber}
         </span>
      },
      {
         title: "Status",
         dataIndex: 'status',
      }
   ]

   return (
      <Layout>
         <h1 className="page-title">Appointments</h1>
         <hr />
         <Table rowKey='_id' columns={columns} dataSource={appointments} pagination={{ defaultPageSize: 5, showSizeChanger: true, pageSizeOptions: ['5', '10', '15'] }} />
      </Layout>
   )
}

export default Appointments