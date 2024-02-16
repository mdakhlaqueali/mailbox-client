import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useState, useRef } from 'react';
import axios from 'axios';
import { useNavigate} from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { authActions } from '../store/authReducer';
const AuthForm = () => {
  const navigate = useNavigate();
  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const confirmPasswordInputRef = useRef();
  const dispatch = useDispatch();
  const isLogin = useSelector((state) => state.auth.isLogin);
  const [isLoading, setIsLoading] = useState(false);
  const switchAuthModeHandler = () => {
    dispatch(authActions.toggle());
  };
  const submitHandler = (event) => {
    event.preventDefault();
    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;
    const confirmPassword = confirmPasswordInputRef.current.value;

    setIsLoading(true);

    let url;
    if (isLogin) {
      url =
        'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBEweN2_ncidElUj-IHX-U2zvRI7kfeIlM';
    } else {
      url =
        'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBEweN2_ncidElUj-IHX-U2zvRI7kfeIlM';
    }
    
    if (enteredPassword === confirmPassword) {
    axios
      .post(url, {
        email: enteredEmail,
        password: enteredPassword,
        returnSecureToken: true,
      })
      .then((response) => {
        setIsLoading(false);
        const token = response.data.idToken;
        if(token){
          dispatch(authActions.login({ email: enteredEmail, token: token }));
          localStorage.setItem("token", token);
          localStorage.setItem("email", enteredEmail);
          console.log('login/signup success');
          navigate("/mails/inbox");
        }else{
          console.log("Invalid token", token);
        }
        
      })
      .catch((error) => {
        setIsLoading(false);
        alert(error.response.data.error.message);
      });
    }else{
      setIsLoading(false);
      alert("Password and Confirm Password doesn't match")
    }
  };
  return (
    <section className="d-flex flex-column align-items-center">
      <h1 className="mb-4">{isLogin ? 'Login' : 'Sign Up'}</h1>
      <Form onSubmit={submitHandler} className='border rounded p-4 border-primary'>
        <Form.Group className="mb-3">
          <Form.Label>Your Email</Form.Label>
          <Form.Control type='email' placeholder='Enter Email' required ref={emailInputRef} />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label htmlFor='password'>Enter Password</Form.Label>
          <Form.Control
            placeholder='Enter Password'
            type='password'
            id='password'
            required
            ref={passwordInputRef}
          />
          <Form.Label htmlFor='password'>Confirm Password</Form.Label>
          <Form.Control
            placeholder='Confirm Password' 
            type="password"
            required  
            ref={confirmPasswordInputRef}/>
        </Form.Group>
        <Form.Group className="d-flex justify-content-center">
        {!isLoading && (
            <Button type='submit' variant='primary'>{isLogin ? 'Login' : 'Create Account'}</Button>
          )}
          {isLoading && <p>Sending request...</p>}
        </Form.Group>
        <Form.Group className="d-flex justify-content-center">
          <Button
            variant='secondary'
            type='button'
            onClick={switchAuthModeHandler}
          >
            {isLogin ? 'Create new account' : 'Login with existing account'}
          </Button>
        </Form.Group>
      </Form>
      </section>
    
  );
};
export default AuthForm;