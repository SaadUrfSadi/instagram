import React, { useState , useEffect, useRef} from 'react';
import './Signup.css';
import Login from '../Login/Login';
import Help from '../../Components/Help/Help';
import { useFirebase } from '../../Firebase';

function Signup() {
    // useState
    const [ login, setLogin] = useState(false);
    const [email, setEmail] = useState("");
    const [mobileNumber, setMobileNumber] = useState("");
    const [password, setPassword] = useState("");
    const [fullname, setFullname] = useState("");
    const [username, setUsername] = useState("");
// ==================================================== 
    // ref
    const emailRef = useRef();
    const passwordRef = useRef();
    const fullNameRef = useRef();
    const usernameRef = useRef();
    // firebase
    const firebase = useFirebase();
// ======================================================
    const loginPageActive = () => {
        setLogin((prev) => !prev)
    };

    const emailReff = (e)=> {
        const text = e.target.value;
        if(text.length > 0){
            emailRef.current.classList.add('active')
        }else{
            emailRef.current.classList.remove('active');
        }
        };

        const passwordReff = (e)=> {
         const text = e.target.value;
         if(text.length > 0){
            passwordRef.current.classList.add('active')
         }else{
          passwordRef.current.classList.remove('active');
         }
         };

         const fullNameReff = (e)=> {
            const text = e.target.value;
            if(text.length > 0){
                fullNameRef.current.classList.add('active')
            }else{
                fullNameRef.current.classList.remove('active');
            }
            };
            
            const userNameReff = (e)=> {
             const text = e.target.value;
             if(text.length > 0){
                usernameRef.current.classList.add('active')
             }else{
                usernameRef.current.classList.remove('active');
             }
             };
      //  ====================================================

        const register = async (e) => {
           firebase.setSignupErr("")
            e.preventDefault();
            try {
             await firebase.signupUserWithEmail(email, password, fullname, username, bio)
            } catch (error) {
                console.log(`Error${error}`)
            }
        };

        const googleRegister = async (e) => {
             e.preventDefault();
          await firebase.siginWithGoogle()
        };

        

  return (
    <>
    <section>
      {
      login ? <Login/> :
    <div className="login-container signup-container">
    <div className="login-form">
            <div className="box">
                <div className="insta-logo">
                  <h1><i>Instagram</i></h1>
                </div>
                  <div className="login-context">
                    <h4>Sign up to see photos and videos from your friends.</h4>
                  </div>
                  <div className="login-btn google">
                    <button onClick={googleRegister}><i class="fa-brands fa-google"></i> <span>Log in with Goggle</span></button>
                  </div>
                  <div className="lines">
                     <div className="line">

                     </div>
                     <p>OR</p>
                     <div className="line">

                     </div>
                  </div>
                <div className="form" onSubmit={register}>
                  <form action="">
                    <div className="inputs first-input" ref={emailRef}>
                    <label htmlFor="">Email adress</label>
                    <input type="text"
                     onChange={(e)=> emailReff(e) || setEmail(e.target.value) || setMobileNumber(e.target.value)}
                     value={email || mobileNumber}
                      />
                    </div>
                    <div className="inputs sec-input"ref={passwordRef}>
                    <label htmlFor="" className='label-password'>Password</label>
                    <input type="password"
                    onChange={(e)=> passwordReff(e) || setPassword(e.target.value)}
                    value={password}
                      />
                    </div>
                    <div className="inputs third-input" ref={fullNameRef}>
                    <label htmlFor="" className='label-password'>Full Name</label>
                    <input type="text"
                     onChange={(e)=> fullNameReff(e) || setFullname(e.target.value)} 
                     value={fullname}
                     />
                    </div>
                    <div className="inputs fourth-input" ref={usernameRef}>
                    <label htmlFor="" className='label-password'>Username</label>
                    <input type="text"  
                    onChange={(e)=> userNameReff(e) || setUsername(e.target.value)} 
                    value={username}
                    />
                    </div>
                    <div className="text">
                    <h5>{firebase.signupErr}</h5>
                    <p>By signing up, you agree to our <span>Terms, Privacy Policy and Cookies Policy.</span></p>
                    </div>
                    <div className="login-btn">
                    <button>Sign up</button>
                    </div>
                  </form>
                  
                </div>
          </div>
          <div className="box-second">
            <p>Have an account? <span onClick={loginPageActive}>Login</span></p>
          </div>
          <div className="microsoft-playstore">
            <p>Get the App</p>
             <div className="imgs">
              <img src="https://static.cdninstagram.com/rsrc.php/v3/yz/r/c5Rp7Ym-Klz.png" alt="" />
              <img src="https://static.cdninstagram.com/rsrc.php/v3/yu/r/EHY6QnZYdNX.png" alt="" />
             </div>
          </div>       
      </div>
      <Help/>
          
    </div>
}
</section>
    </>
  )
}

export default Signup