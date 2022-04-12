import React from "react";
import {useMsal} from '@azure/msal-react';
import {loginRequest} from '../authConfig';
import {Button} from 'react-bootstrap';

export const SignInButton = () => {
  const {instance} = useMsal();

  const handleLogin = () => {
    instance.loginPopup(loginRequest).catch(e => {
      console.log('login error');
      console.error(e);
    });
  };

  return (
    <Button variant="secondary" className="ml-auto" onClick={() => handleLogin()}>SingIn</Button>
  );

}