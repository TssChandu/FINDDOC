import React, { useEffect, useState } from 'react'
import Layout from '../../components/layout/Layout'
import { useDispatch } from 'react-redux'
import axios from 'axios'
import { showLoading, hideLoading } from '../../redux/alertSlice'
import { Table } from 'antd'
import { toast } from 'react-hot-toast'
import moment from 'moment'

const DoctorAppointments = () => {
   const [appointments, setAppointments] = useState([]);
   const dispatch = useDispatch();

   const getAppointmentsData = async () => {
      try {
         dispatch(showLoading())
         const response = await axios.get('/api/doctor/get-appointments-by-doctor-id', {
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

   const changeAppointmentStatus = async (record, status) => {
      try {
         dispatch(showLoading())
         const response = await axios.post('/api/doctor/change-appointment-status', {
            appointmentId: record._id, status: status,
         }, {
            headers: {
               Authorization: `Bearer ${localStorage.getItem("token")}`
            },
         })
         dispatch(hideLoading());
         if (response.data.success) {
            toast.success(response.data.message);
            getAppointmentsData();
         }
      } catch (error) {
         toast.error("Error changing doctor account status");
         dispatch(hideLoading());
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
         title: "Patient",
         dataIndex: 'name',
         render: (text, record) => <span>
            {record.userInfo.name}
         </span>
      },
      {
         title: "Date & Time",
         dataIndex: 'createdAt',
         render: (text, record) => <span>
            {moment(record.date).format("DD-MM-YYYY")} & {moment(record.time).format("HH:mm")}
         </span>
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
      },
      {
         title: "Actions",
         dataIndex: "actions",
         render: (text, record) => (
            <div className='d-flex'>
               {record.status === "pending" &&
                  <div className='d-flex'>
                     <h1 className="anchor margin-right"
                        onClick={() => changeAppointmentStatus(record, "approved")}>
                        Approve
                     </h1>
                     <h1 className="anchor"
                        onClick={() => changeAppointmentStatus(record, "rejected")}>
                        Reject
                     </h1>
                  </div>
               }
            </div>
         ),
      },
   ]

   return (
      <Layout>
         <h1 className="page-header">Appointments</h1>
         <Table columns={columns} dataSource={appointments} />
      </Layout>
   )
}

export default DoctorAppointments