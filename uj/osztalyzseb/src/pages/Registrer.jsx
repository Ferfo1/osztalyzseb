


function Registrer() {

  return (
    <>

    <div className="container">
        <h2>Regisztráció</h2>
        <label htmlFor="registerUsername">Felhasználónév:</label>
        <input type="text" id="registerUsername" required/>

        <label htmlFor="registerPassword">Jelszó:</label>
        <input type="password" id="registerPassword" required/>
        <label htmlFor="registerPassword2">Jelszó megint:</label>
        <input type="password" id="registerPassword2" required/>
        <a><button>Regisztráció</button></a>
        
    </div>





    </>
  )
}

export default Registrer