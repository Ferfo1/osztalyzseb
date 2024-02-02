import {Link} from 'react-router-dom';
import { useLoginMutation } from '../features/usersApiSlice';
import { useState } from 'react';



function Login() {
    const [ loginTrigger ] = useLoginMutation();
    const [ username, setUsername ] = useState("");

    function abcdefgh() {
        console.log(username)
        loginTrigger({
            email: "tesz@teszt",
            pasword: "wAVCodN8c5fT"
        })
        .then((res) => {
            console.log(res)
        })
    }

    return (
        <div id="loginForm">
            <h2>Bejelentkezés</h2>
            <label htmlFor="username">Felhasználónév:</label>
            <input type="text" id="username" value={username} onChange={(e) => setUsername(e.target.value)} />

            <label htmlFor="password">Jelszó:</label>
            <input type="password" id="password " />

            <button onClick={abcdefgh}>Bejelentkezés</button>
            <Link to={'/Register'} >
                <button>Regisztrálok Most!</button>
            </Link>
        </div>
      
    )
}
  
export default Login