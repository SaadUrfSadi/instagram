import React, {useState, useEffect, useRef} from 'react';
import './Login.css';
import iphone  from "../../images/iphone.png";
import previewImage1  from "../../images/prew1.png";
import previewImage2  from "../../images/prew2.png";
import previewImage3  from "../../images/prew3.png";
import previewImage4  from "../../images/prew4.png";
import Help from '../../Components/Help/Help';
import Signup from '../Signup/Signup';
// import InstaLoader from '../../Components/Loader/InstaLoader';
// import firebase from 'firebase/compat/app';
import { useFirebase } from '../../Firebase';


function Login() {

  const previewImages = [previewImage1, previewImage2, previewImage3, previewImage4];
  // useState
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [signup, setSignup] = useState(false);
  const [email, setEmail] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  // ref
  const usernameRef = useRef();
  const passwordRef = useRef();

  const firebase = useFirebase();
  // ===========================================
  const signupPageActive = () => {
    setSignup((prev)=> !prev)
  };
 
     const userName = (e)=> {
       const text = e.target.value;
       if(text.length > 0){
          usernameRef.current.classList.add('active')
       }else{
        usernameRef.current.classList.remove('active');
       }
       };
       const userPassword = (e)=> {
        const text = e.target.value;
        if(text.length > 0){
           passwordRef.current.classList.add('active')
        }else{
         passwordRef.current.classList.remove('active');
        }
        }



  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) =>
        prevIndex === previewImages.length - 1 ? 0 : prevIndex + 1
      );
    }, 4000); 

    return () => clearInterval(interval); 
  }, [previewImages.length]);

  const login = async (e) => {
      firebase.setLoginErr("")
      e.preventDefault();
      await firebase.loginWithEmailAndPassword(email, password);
  };

  const loginWithUsername = async () => {
      firebase.setLoginErr("")
      await firebase.loginWithUsernameAndPassword(username, password);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (username) {
      loginWithUsername();
    } else {
      login();
    }
  };

  useEffect(() => {
    setEmail("");
    setMobileNumber("");
    setUsername("");
    setPassword("");
  }, []);


  const forget = async (e) => {
   firebase.setSendEmail("")
    e.preventDefault();
    await firebase.forgetPassword(email)
  };

  return (
    <>
    <section>
    { signup ?  <Signup/> : 
    <div className="main-login-container">
     <div className="login-container">
       <div className="mobile-preview">
        <img src={iphone} alt="Mobile Frame" className="mobile-frame" />
        <div className="preview-images">
        <img 
            src={previewImages[currentImageIndex]} 
            alt={`Preview ${currentImageIndex + 1}`} 
            className="preview-img" 
          />
        </div>
      </div>
      
       <div className="login-form">
            <div className="box">
              
                <div className="insta-logo">
                  <h1><i>Instagram</i></h1>
                </div>
                <div className="form" onSubmit={handleSubmit}>
                  <form action="">
                    <div className="inputs" ref={usernameRef}>
                    <label htmlFor="">Username or email adress</label>
                    <input type="text"  
                    onChange={(e)=> userName(e) || setEmail(e.target.value) || setMobileNumber(e.target.value) || setUsername(e.target.value)}
                    value={email || mobileNumber || username }
                    />
                    </div>
                    <div className="inputs sec-input" ref={passwordRef}>
                    <label htmlFor="" className='label-password'>Password</label>
                    <input type="password" 
                    onChange={(e)=> userPassword(e) || setPassword(e.target.value)} 
                    value={password}
                    />
                    </div>
                    <div className="login-btn">
                    <button>Login</button>
                    </div>
                  </form>
                  <div className="lines">
                     <div className="line">

                     </div>
                     <p>OR</p>
                     <div className="line">

                     </div>
                  </div>
                   <div className="other-login">
                   <i class="fa-brands fa-google"></i> <span>Log in with Goggle</span>
                   </div>
                   <div className="error-check">
                    <p>{firebase.loginErr}</p>
                   </div>
                   <div className="forget-password">
                    <p onClick={forget}>Forgotten your password?</p>
                      <h6>{firebase.sendEmail}</h6>
                   </div>
                </div>
          </div>
          <div className="box-second">
            <p>Don't have an account? <span onClick={signupPageActive}>Sign up</span></p>
          </div>
          <div className="microsoft-playstore">
            <p>Get the App</p>
             <div className="imgs">
              <img src="https://static.cdninstagram.com/rsrc.php/v3/yz/r/c5Rp7Ym-Klz.png" alt="" />
              <img src="https://static.cdninstagram.com/rsrc.php/v3/yu/r/EHY6QnZYdNX.png" alt="" />
             </div>
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

export default Login