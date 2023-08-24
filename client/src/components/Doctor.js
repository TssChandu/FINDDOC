import React from 'react'
import { useNavigate } from 'react-router-dom'

const Doctor = ({ doctor }) => {
   const navigate = useNavigate();
   return (
      <div className='card p-2' onClick={() => navigate(`/book-appointment/${doctor._id}`)}>
         <h1 className="card-title">{doctor.firstName} {doctor.lastName}</h1>
         <hr />
         <p className="doctor-card"><b>Phone Number: </b>{doctor.phoneNumber}</p>
         <p className="doctor-card"><b>Specialization: </b>{doctor.specialization}</p>
         <p className="doctor-card"><b>Experience: </b>{doctor.experience}</p>
         <p className="doctor-card"><b>Location: </b>{doctor.address}</p>
         <p className="doctor-card"><b>Fee Per Visit: </b>{doctor.feePerConsultation}</p>
      </div>
   )
}

export default Doctor