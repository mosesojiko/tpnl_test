import React from 'react';
import axios from "axios"
import { useEffect, useState } from "react";
import './Home.css'
import {Link} from 'react-router-dom'

function Home() {

    const [result, setResult] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)
  

  
  const fetchData = async () => {
    setLoading(true)
   try {
     const { data } = await axios.get("https://interviewtst.herokuapp.com/get-all-users")
     setLoading(false)
     setResult(data)
   } catch (error) {
    setError(error.message)
   }
  }

  useEffect(() => {
    fetchData()
  }, [])
  //console.log(result)
    
    
    return (
        <div className="container">
      <h1 style={{textAlign:"center"}}>Display names and emails</h1>
      <div className="userDetails">
        {
          loading &&
          <p>Loading, please wait a minute.</p>
        }
        {
          error && <p>{ error}</p>
        }
        {
          result.User_Details?.map((res) => (
            <div className="userResult" key={res.user_id}>
                  <Link to={`get-selected-user-details/${res.user_id}`} style={{marginRight:"5px"}}>{res.firstname}</Link>
              
              <p>{ res.email}</p>
            </div>
          ))
        }

      </div>
      </div>
    )

}
export default Home;