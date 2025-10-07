import { useState, useEffect } from "react"
import "../style/addtask.css"
import { Link, useNavigate } from "react-router-dom"

export default function SignUp() {
    const [userData, setUserData] = useState({})
    const navigate = useNavigate();

    useEffect(() => {
        if (localStorage.getItem("login")) {
            navigate("/")
        }
    })

    const handleSignUp = async () => {
        console.log(userData)
        let result = await fetch("http://localhost:3200/signup", {
            method: "POST",
            body: JSON.stringify(userData),
            headers: {
                "Content-Type": "application/json"
            }
        })
        result = await result.json()
        if (result.success) {
            console.log(result)
            document.cookie = "token=" + result.token
            localStorage.setItem("login", userData.email);
            navigate("/");
        } else {
            alert("try after sometime")
        }
    }

    return (
        <div className="container">
            <h1>Sign Up</h1>

            <label htmlFor="">Name</label>
            <input type="text" onChange={(event) => setUserData({ ...userData, name: event.target.value })} name="name" placeholder="Enter user name" />

            <label htmlFor="">Email</label>
            <input type="email" onChange={(event) => setUserData({ ...userData, email: event.target.value })} name="email" placeholder="Enter user email" />

            <label htmlFor="">Password</label>
            <input type="password" onChange={(event) => setUserData({ ...userData, password: event.target.value })} name="password" placeholder="Enter user password" />

            <button onClick={handleSignUp} className="submit">Sign Up</button>
            <Link className="link" to="/login">Login</Link>
        </div>
    )
}