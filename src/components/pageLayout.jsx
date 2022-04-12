import React from "react";
import { Navbar } from "react-bootstrap";
import {useIsAuthenticated} from '@azure/msal-react'
import {SignInButton} from './signInButton'
import {SignOutButton} from './signOutButton';

export const PageLayout = (props) => {
  const isAuthenticated = useIsAuthenticated();

  return (
    <>
      <Navbar bg="primary" variant="dark">
                <a className="navbar-brand" href="/">MSAL React Tutorial</a>
                { isAuthenticated ? <SignOutButton /> : <SignInButton /> }
      </Navbar>
      <h5><center>React .NET Core sample</center></h5>
      <br />
      <br />
      {props.children}
    </>
  )
}