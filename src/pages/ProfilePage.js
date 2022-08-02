import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from "react-router-dom"
import './Home.css';

function ProfilePage() {
    const { id } = useParams()
   // const id = props.match.params.id
    const [result, setResult] = useState({});
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)

    const [vehicleMake, setVehicleMake] = useState([])
    const fetchUser = async () => {
        setLoading(true)
        try {
            const { data } = await axios.get(`https://interviewtst.herokuapp.com/get-selected-user-details/${id} `)
            setLoading(false)
            setResult(data)
        } catch (error) {
            console.log(error)
            setError(error)
        }
    }

    useEffect(() => {
        fetchUser()
    }, [])
    console.log(result)
    return (
        <div className='userDetails'>
            <h1>Profile</h1>
            {
                result.User_Details?.map((user) => (
                    <div>
                        <div style={{display:"flex"}}>
                        <p style={{marginRight:"5px"}}>Firstname: {user.firstname}</p>
                        <p>Lastname: {user.lastname }</p>
                        </div>
                        <div>
                            <p>Email: {user.email}</p>
                            <p>Job Area: {user.job_area}</p>
                            <p>Job Title: {user.job_title}</p>
                            <p>Phone no: {user.phone_no? user.phone_no: "none" }</p>
                        </div>
                    </div>
                    
                ))

                
            }
            {
                result.Related_Pictures_Count?.map((pic) => (
                    <div>
                        <p>Picture Count: {pic.picture_count }</p>
                    </div>
                ))
            }

            {
                result.Vehicles_Count?.map((pic) => (
                    <div>
                        <p>Picture Count: {pic.vehicle_counts }</p>
                    </div>
                ))
            }
            <h4>Vehicle Details</h4>
            
            {
                result.Vehicles_Details?.map((detail) => (
                    <div style={{marginBottom:"10px"}}>
                        <p style={{margin:"0px", padding:"0px"}}>Vehicle Make: <span style={{fontWeight:"bold"}}>{ detail.vehicle_make}</span></p>
                        
                        <p style={{margin:"0px", padding:"0px"}}>Vehicle Vin: <span style={{fontWeight:"bold"}}>{ detail.vehicle_vin}</span></p>
                       
                        <p style={{margin:"0px", padding:"0px"}}>Vehicle Fuel-Type: <span style={{fontWeight:"bold"}}>{ detail.fuel_type}</span></p>
                        
                    </div>
                ))
            }
        </div>
    )
}

export default ProfilePage