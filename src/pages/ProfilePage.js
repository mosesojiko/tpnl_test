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

    const [phone_no, setPhone_no] = useState("")
    const [success, setSuccess] = useState(false)

    
    const fetchUser = async () => {
        setLoading(true)
        try {
            const { data } = await axios.get(`https://interviewtst.herokuapp.com/get-selected-user-details/${id} `)
            setLoading(false)
            setResult(data)
        } catch (error) {
            //console.log(error)
            setError(error.message)
        }
    }

    useEffect(() => {
        fetchUser()
    }, [])
    //console.log(result)

    const handlePhone = async (e) => {
        e.preventDefault()
        setLoading(true)
        try {
            await axios.put(`https://interviewtst.herokuapp.com/update-user-phone_no/${id}`,{phone_no});
            setLoading(false)
            setSuccess(true)
            setPhone_no("")
        } catch (error) {
            setError(error.message)
           // console.log(error)
        }
    }
    setTimeout(() => {
       setSuccess(false) 
    },2000)
//console.log(phone_no)
    return (
        <div className='userDetails'>
            <h1>Profile</h1>
            {
                loading && <p>Loading</p>
            }
            {
                error &&
                <p>{ error}</p>
            }
            {
                result.User_Details?.map((user) => (
                    <div key={user.user_id}>
                        <div style={{display:"flex"}}>
                        <p style={{marginRight:"5px"}}>Firstname: {user.firstname}</p>
                        <p>Lastname: {user.lastname }</p>
                        </div>
                        <div>
                            <p>Email: {user.email}</p>
                            <p>Job Area: {user.job_area}</p>
                            <p>Job Title: {user.job_title}</p>
                            <p>Phone no: {user.phone_no }</p>
                        </div>
                        
                    </div>

                    
                ))

                
            }
            {
                result.Related_Pictures_Count?.map((pic, index) => (
                    <div key={index}>
                        <p>Picture Count: {pic.picture_count }</p>
                    </div>
                ))
            }

            {
                result.Vehicles_Count?.map((pic, index) => (
                    <div key={index}>
                        <p>Picture Count: {pic.vehicle_counts }</p>
                    </div>
                ))
            }
            <h4>Vehicle Details</h4>
            
            {
                result.Vehicles_Details?.map((detail, index) => (
                    <div style={{marginBottom:"10px"}} key={index}>
                        <p style={{margin:"0px", padding:"0px"}}>Vehicle Make: <span style={{fontWeight:"bold"}}>{ detail.vehicle_make}</span></p>
                        
                        <p style={{margin:"0px", padding:"0px"}}>Vehicle Vin: <span style={{fontWeight:"bold"}}>{ detail.vehicle_vin}</span></p>
                       
                        <p style={{margin:"0px", padding:"0px"}}>Vehicle Fuel-Type: <span style={{fontWeight:"bold"}}>{ detail.fuel_type}</span></p>
                        
                    </div>
                ))
            }

            
                
                 <form onSubmit={handlePhone}>
                        <div>
                             <label htmlFor='phone'>Phone number: </label> 
                        <input type="text" placeholder='Enter phone number' required
                            value={phone_no}
                          onChange={(e) =>setPhone_no(e.target.value)}  
                        />
                       </div>
                      <button type="submit">Update Phone</button>  
                </form> 
                
            
            {
                success && <p>User's phone updated successfully.</p>
            }
            
        </div>
    )
}

export default ProfilePage