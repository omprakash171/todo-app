import { useState } from "react"
import "../style/addtask.css"
import { Link, useNavigate } from "react-router-dom"
import { useEffect } from "react";

export default function Login() {
    const [userData, setUserData] = useState({})
    const navigate = useNavigate();

    useEffect(() => {
        if(localStorage.getItem("login")){
            navigate("/")
        }
    })

    const handleLogin = async () => {
        console.log(userData)
        let result = await fetch("http://localhost:3200/login", {
            method: "POST", 
            body: JSON.stringify(userData), 
            headers: {
                "Content-Type": "application/json"
            }
        })
        result = await result.json()
        if(result.success){
            // console.log(result)
            document.cookie = "token="+result.token;
            localStorage.setItem("login", userData.email);
            window.dispatchEvent(new Event('localStorage-change'))
            navigate("/");
        }else{
            alert("try after sometime")
        }
    }
    

    return (
        <div className="container">
            <h1>Login </h1>
            
                <label htmlFor="">Email</label>
                <input type="email" onChange={(event) => setUserData({...userData, email: event.target.value})} name="email" placeholder="Enter user email" />

                <label htmlFor="">Password</label>
                <input type="password" onChange={(event) => setUserData({...userData, password: event.target.value})} name="password" placeholder="Enter user password" />
                
                <button onClick={handleLogin} className="submit">Login</button>
            <Link className="link" to="/signup">Sign Up</Link>
        </div>
    )
}