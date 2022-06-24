import axios from 'axios'
import React from 'react'
import { useState, useEffect } from 'react'

function Home() {
  const [UserData, setUserData] = useState([])

  const getData = async () => {
    const { data } = await axios.get(`http://localhost:8080/getapi/users/`);
    setUserData(data);
  };

  useEffect( () => {
    getData();
  }, [])

  return (
    <div>
    {UserData.map((value)=>{
      return (
        <p>value</p>
        )
    })}
    </div>
  )
}

export default Home