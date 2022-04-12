import React from "react";
import { useMsal } from "@azure/msal-react";
import { Button } from "react-bootstrap";

export const SignOutButton = () => {

  const {instance} = useMsal();

  const handleLogOut = () => {
    instance.logoutPopup().catch(e => {
      console.error('Error in log out');

      console.error(e);
    });
  }

  return (
    <Button variant="primary" className="ml-auto" onClick={() => handleLogOut()}>Sign Out</Button>
  );


}