import React, { useEffect } from "react";
import { useState } from "react";
import { useMsal } from "@azure/msal-react";
import { Button, Table } from "react-bootstrap";
import {loginRequest, silentRequest, tokenRequest, apiConfig} from '../authConfig';


export const TeamsList = () => {

  const {instance, accounts, inProgress } = useMsal();
  const [accessToken, setAccessToken] = useState(null);
  const [teams, setTeams] = useState([]);
  const [channels, setChannels] = useState([]);


  // useEffect(() => {

  //   const request = {
  //     ...loginRequest,
  //     account: accounts[0]
  //   };

  //   // Silently acquires an access token which is then attached to a request for Microsoft Graph data
  //   instance.acquireTokenSilent(request).then((response) => {
  //     console.log('silently acquired token');
  //     // loadTeams(response.accessToken);      
  //     setAccessToken(response.accessToken);    
  //     console.log('tocken received', response.accessToken);
  //   }).catch((e) => {
  //       instance.acquireTokenPopup(request).then((response) => {
  //         loadTeams(response.accessToken);
  //         // console.log('token acquired with popup.');
  //         setAccessToken(response.accessToken);
  //         console.log('tocken received', response.accessToken);
  //   });
  //   });
  // });

  const loadTeams = (accessToken) => {
    

    fetch(apiConfig.teamsList, {
      method: 'GET',
      headers: {
          "Authorization": `Bearer ${accessToken}`,
          "Content-Type": 'application/json'
      }
    })
    .then(response => {
      if(response && response.status === 200){
        return response.json();
      }
    })
    .then(res => {
      setTeams(res);
    });
  }

  const loadChannels = (teamId) => {

    const url = `${apiConfig.channelList}${teamId}`;
    
    fetch(url, {
      method: 'GET',
      headers: {
          "Authorization": `Bearer ${accessToken}`,
          "Content-Type": 'application/json'
      }
    })
    .then(response => {
      if(response && response.status === 200){
        return response.json();
      }
    })
    .then(res => {
      setChannels(res);
    });
  }

  function acquireToken(){

    silentRequest.account = accounts[0];
    tokenRequest.account = accounts[0];
    

    // Silently acquires an access token which is then attached to a request for Microsoft Graph data
    instance.acquireTokenSilent(silentRequest).then((response) => {
      console.log('silently acquired token');
      console.log('tocken received', response.accessToken);
      // loadTeams(response.accessToken);      
      setAccessToken(response.accessToken);    
      loadTeams(response.accessToken);
    })
    .catch((e) => {
        instance.acquireTokenPopup(tokenRequest).then((response) => {
          loadTeams(response.accessToken);
          console.log('tocken received', response.accessToken);
          // console.log('token acquired with popup.');
          setAccessToken(response.accessToken);
          loadTeams(response.accessToken);
      });
    });
  };
  
  return (
    <div className="container">
      {
        !accessToken && <Button variant="secondary" onClick={() => acquireToken()}>Load Teams</Button>
      }

      {accessToken && <h3>Teams</h3>}

      <Table striped bordered hover>
        <thead>
          <tr>
            <th></th>
            <th>Name</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          {
            teams && teams.length > 0 && teams.map(t => <tr><td><Button variant="secondary" onClick={() => loadChannels(t.id)}>View Channels</Button></td> <td>{t.displayName}</td> <td>{t.description}</td></tr>)
          }
      </tbody>  
    </Table>

    {channels && channels.length > 0 && <h3 className="mt-5">Channels</h3>}

    {channels && channels.length > 0 && <Table striped bordered hover>
      
      <thead>
          <tr>
            <th>Id</th>
            <th>Name</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          {
            channels && channels.length > 0 && channels.map(t => <tr><td>{t.id}</td> <td>{t.displayName}</td> <td>{t.description}</td></tr>)
          }
      </tbody>  
      </Table>}
    </div>
  );

}