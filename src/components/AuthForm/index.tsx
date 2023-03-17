import React from 'react'

import { useSelector, useDispatch } from 'react-redux';
import { selectRouting } from '../../redux/routing/selectors';
import { openAuth, changePage } from '../../redux/routing/slice';

import { isMobile } from 'react-device-detect';
import { useNavigate } from 'react-router-dom';

import './authform.scss'
import { removeItem } from '../../img';

import db from '../../firebase/config/firebase.config';
import { app } from '../../firebase/config/firebase.config';
import { addDoc, doc, collection, getDoc} from "firebase/firestore";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";



type AuthFormProps = {
    
    setSignedUpUser: (isSigned: boolean) => void;
    userID: string;
    setUserID: (userID: string) => void;

}

export const AuthForm: React.FC<AuthFormProps> = ({setSignedUpUser, userID, setUserID}) => {

    const dispatch = useDispatch();
    const auth = getAuth(app);
    const navigate = useNavigate();

    const {isAuthOpened} = useSelector(selectRouting);
    const changeMode = () => setIsSignUp(!isSignUp)
    const closeForm = () =>  dispatch(openAuth())
    const [isSignUp, setIsSignUp] = React.useState(true);
    const [isSignUpConfirmAllowed, setIsSignUpConfirmAllowed] = React.useState(false);
  
    const [userEmail, setUserEmail] = React.useState("");
    const [userPass, setUserPass] = React.useState("");
    const [confirmPass, setConfirmPass] = React.useState("");
    
    const overlay = React.useRef<HTMLDivElement>(null)
    const passInput = React.useRef<HTMLInputElement>(null)

    const [days, setDays] = React.useState<number[]>([]);
    const [years, setYears] = React.useState<number[]>([]);
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

React.useEffect(() => {
        const createDays = () => {
            for (let i = 1; i <= 30; i++) {
                 setDays(prev => [...prev, i])
         }}
    
         const createYear = () => {
            for (let i = new Date().getFullYear(); i >= 1980; i--) {
                setYears(prev => [...prev, i]);
            }
         }
         createDays();
         createYear();  
    }, [])

React.useEffect(() => {

userEmail.length > 4 && userPass.length >= 6 ? setIsSignUpConfirmAllowed(true) : setIsSignUpConfirmAllowed(false);
    
}, [userEmail, userPass])

React.useEffect(() => {
    if (overlay && overlay.current) {
        overlay.current.addEventListener("click", () => {closeForm();})
    }
   
 }, [isSignUp])
    

const onConfirmLogin = async (e: React.MouseEvent<HTMLButtonElement>) => {
   
    e.preventDefault();

    
    try {
        signInWithEmailAndPassword(auth, userEmail, userPass)
        dispatch(changePage())
        navigate("/orders")
        closeForm();
    }
    catch(e) {
        console.error(e)
        alert("Incorrect password, try again.")
    }
        
    


}

const onCofirmSignUp = async (e: React.MouseEvent<HTMLButtonElement>) => {
    try {
        e.preventDefault();
dispatch(openAuth());
console.log(userEmail);
console.log(userPass);

createUserWithEmailAndPassword(auth, userEmail, userPass)
  .then((userCredential) => {
    const user = userCredential.user;
    setSignedUpUser(true)
    const signUpUser = async () => {
        const uID = await user.uid;
        setUserID(uID);
    
        const userDocRef = doc(db, "users", user.uid)
        const userRef = collection(userDocRef, "userID")
        await addDoc(userRef, {ID: userID, password: userPass});
    }
   
    signUpUser();
   
  })
  .catch((error) => {
   console.error(error);
  });
     
    }

    catch(e) {
        console.error(e)
    }

}

// Handlers
const handleEmail = (e: React.ChangeEvent) => {

    const target = e.target as HTMLInputElement;
    let email = document.getElementById("auth__email");

    if (email) {
        if(!validateEmail(e.target as HTMLElement)) {
            email.classList.add("invalid");
            email.classList.remove("valid");
        }
    
        else {
            email.classList.remove("invalid");
            email.classList.add("valid");
        }
    }
    setUserEmail(target.value);

}

const handlePass = (e: React.ChangeEvent) => {
    const target = e.target as HTMLInputElement;

    let pass = document.getElementById("auth__pass");
    if (pass) {
        if(!validatePassword(target.value)) {
            pass.classList.add("invalid");
            pass.classList.remove("valid");
        }

        else {
            pass.classList.remove("invalid");
            pass.classList.add("valid");
        }

    }
    setUserPass(target.value);
}

const handleConfirmPass = (e: React.ChangeEvent) => {
    const target = e.target as HTMLInputElement;
    setConfirmPass(target.value);
    validateConfirmPassword();
}

// Validation 
const validatePassword = (e: any) => {
return /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/.test(userPass)
}

const validateConfirmPassword = () => {
    let confirm = (document.getElementById("auth__confirm-pass") as HTMLInputElement);
    if (confirm.value === userPass) {
        confirm.classList.add("valid");
        confirm.classList.remove("invalid");
    }

    else {
        confirm.classList.add("invalid");
        confirm.classList.remove("valid");
    }
}

const validateEmail = (e: any) => {
    return /\S+@\S+\.\S+/.test(userEmail)
}

// Render
const renderDays = () => {
return days.map((day) => (
<option>{day}</option>
))}

const renderMonths = () => {
    return months.map((month) => (
        <option>{month}</option>
    ))
}

const renderYears = () => {
    return years.map((year) => (
        <option>{year}</option>
    ))
}

return (
    
<>
        {isSignUp ? (
            <div className="modal-wrapper">
        <div className={isAuthOpened ? "auth-wrapper" : "auth-wrapper-hidden"}>
        <div className={isAuthOpened ? "auth-form-overlay" : "auth-overlay-hidden"} id="auth-overlay" ref={overlay}></div>
        <div className={isAuthOpened ? "auth" : "auth-form-hidden"} id="sign-up-form">
                      <div className="auth__title-wrapper">
                      <span>Sign up</span>
                      <span>Already signed up?</span>
                      <span onClick={changeMode}>Login</span>
                      {isMobile ? <button className="modal-cart__close-cart-btn" onClick={closeForm}><img src={removeItem} width="14" height="14" /></button> : null}
                      </div>
                      <form className="auth__form">
                    
                          <label htmlFor="name">Name and surname</label>
                          <input type="text" id="name" />
                          <div className="auth-form__birthday-wrapper birthday-wrapper">
                              <select id="auth-form__day">
                                  <option>Day</option>
                                  {renderDays()}
                                  
                              </select>
                              <select id="auth-form__month">
                                  <option>Month</option>
                                  {renderMonths()}
                              </select>
                              <select id="auth-form__year">
                                  <option>Year</option>
                                  {renderYears()}
                              </select>
                          </div>
                          <label htmlFor="auth__email">E-mail</label>
                          <input type="email" id="auth__email" value={userEmail} onChange={handleEmail} />
                          <label htmlFor="auth__phone">Phone number</label>
                          <input type="phone" id="auth__phone" />
                          <label htmlFor="auth__city">City</label>
                          <input type="text" id="auth__city" />
                          {isMobile ? <div className="auth-form__password-wrapper password-wrapper">
                            <label htmlFor="auth__pass">Password</label>
                            <input type="text" id="auth__pass" value={userPass} onChange={handlePass} />
                            <label htmlFor="auth__confirm-pass">Confirm password</label>
                            <input type="text" id="auth__confirm-pass" />
                          </div> 
                          :
                           <>
                           <div className="auth-form__password-wrapper password-wrapper">
                                <label htmlFor="auth__pass">Password</label>
                                <label htmlFor="auth__confirm-pass">Confirm password</label>
                            </div>
                            <div className="auth-form__password-wrapper">
                                <input type="text" id="auth__pass" value={userPass} onChange={handlePass} />
                                <input type="text" id="auth__confirm-pass" value={confirmPass} onChange={handleConfirmPass}/>
                            </div>
                                    </> }
                         
                          <button data-testid="confirm-btn" 
                          onClick={(e: React.MouseEvent<HTMLButtonElement>) => onCofirmSignUp(e)} 
                          className={` auth-form__confirm-btn ${isSignUpConfirmAllowed ? "auth-form__confirm-btn--active" : ""}`} 
                          disabled = {isSignUpConfirmAllowed ? false : true}>
                            Confirm sign up
                          </button>
                      </form>
                      
        </div>
        </div>
            </div>
      
        
        
        ) 

    
    :
    
     ( <div className="modal-wrapper">
     <div className={isAuthOpened ? "auth-wrapper" : "auth-wrapper-hidden"}> </div>
     <div className={isAuthOpened ? "auth-form-overlay" : "auth-overlay-hidden"} id="auth-overlay"></div>
     <div className={isAuthOpened ? "auth" : "auth-form-hidden"} id="sign-up-form">

     <div className="auth__title-wrapper">
        <span>Log in</span>
        <span>No account?</span>
        <span onClick={changeMode}>Sign up</span>
    </div>

    <form className="auth__form">
        <label htmlFor="user-email/phone">Email/Phone number</label>
        <input type="text" id="user-email/phone" />
        <label htmlFor="user-pass">Password</label>
        <input type="password" id="user-pass" ref={passInput}/>
    <div className="auth-form__password-wrapper">
        <button onClick={(e: React.MouseEvent<HTMLButtonElement>) => onConfirmLogin(e)} className="auth-form__confirm-btn auth-form__confirm-btn--active">Login</button>
        <span className="forgot-password">Forgot password?</span>
    </div>
    

    </form>

     </div>
     </div>)
    }
    </>
)

}

