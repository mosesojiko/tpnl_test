
import axios from "axios"
import { useEffect, useState } from "react";
import './App.css';


function App() {

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
  console.log(result)
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
              <p style={{ fontWeight: "bold", marginRight: "5px" }}>{res.firstname}{ ":"}</p>
              <p>{ res.email}</p>
            </div>
          ))
        }

      </div>
      </div>
      
        
  );
}

export default App;
