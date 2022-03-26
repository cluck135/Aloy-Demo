import React, { useState } from "react";
import { Link } from 'react-router-dom';
import { useNavigate, useLocation } from 'react-router';
import { useMutation } from '@apollo/client';

import Auth from '../utils/auth';
import { ADD_USER } from '../utils/mutations';

const Signup = () => {
  const [addUser] = useMutation(ADD_USER);
  const [error, setError] = useState({})

  const navigate = useNavigate();
  const location = useLocation();

  const [errorMessages, setErrorMessages] = useState({});

  const renderErrorMessage = (name) =>
  name === errorMessages.name && (
    <div className="error">{errorMessages.message}</div>
  );

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    var { email , password } = document.forms[0];

    try {
      const { data } = await addUser({
        variables: { email: email.value, password: password.value },
      });
      Auth.login(data.addUser.token);
      navigate('/loyalty')
    } catch (e) {
      setErrorMessages({ message: "Make sure password is more than 5 characters and email is valid" });
      console.error(e);
    }
  }

  return ( 
    <div className='p-4 flex bg-MHgreen h-screen lg:justify-center'>
      <div className='m-4 h-fit bg-white rounded-lg shadow-lg lg:w-1/4'>
        <form className="flex flex-col p-5" onSubmit={handleFormSubmit}>
          <h1 className="pb-2 text-2xl">Signup for Minthouse Membership</h1>
          <div className="p-2 flex flex-col">
            <label for="email" className="pl-1">Email</label>
            <input name="email" className="m-1 border rounded border-DarkGreen"/>
          </div>
          <div className="p-2 flex flex-col">
            <label for="password" className="pl-1">Password</label>
            <input name="password" type="password" className="m-1 border rounded border-DarkGreen"/>
            <div className="text-red-500">{renderErrorMessage()}</div>
          </div>
          <div className="flex justify-center">
            <button type="submit" className="p-2 mt-1 bg-teal-300 text-xl rounded-md delay-100 duration-300 hover:shadow-lg hover:bg-teal-200">Submit</button>
          </div>
        </form>
        <div className="flex justify-center mt-5">
          <Link to="/login">
            <div className="p-2 m-4 w-fit rounded-md bg-sky-300 text-xs delay-100 duration-300 hover:shadow-lg hover:bg-sky-200">Login here</div>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Signup;