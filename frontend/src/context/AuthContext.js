import axios from 'axios'
import {useState, createContext} from 'react'

export const AuthContext = createContext({})

const AuthProvider = ({children}) => {
    const apiUrl = process.env.REACT_APP_API_URL;
    const [user, setUser] = useState({
        name: "",
        email: "",
        password: "",
        role: "",
        google: false
    })
    
    const loginUser = async (obj) => {
        const response = await axios.post(`${apiUrl}/api/auth/login`, obj);
        console.log("loginUser response: ", response)
    }

    const googleLogin = async (obj) => {
        const response = await axios.post(`${apiUrl}/api/auth/googlelogin`, obj);
        console.log("googleLogin response: ", response)
        if (response.data) {
            localStorage.setItem("jwtposts", JSON.stringify(response.data));
        }
    }
    return (
        <AuthContext.Provider
            value={{
                user, 
                setUser,
                loginUser,
                googleLogin
            }}
        >
        {children}
        </AuthContext.Provider>
    )
}


export default AuthProvider;