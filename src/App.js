import logo from './logo.svg';
import './App.css';
import {PageLayout} from './components/pageLayout'
import {AuthenticatedTemplate, UnauthenticatedTemplate} from '@azure/msal-react';
import {TeamsList} from './components/teamsList';

function App() {
  return (
    <div className="App">
      <PageLayout>
        <AuthenticatedTemplate>
          <TeamsList />
        </AuthenticatedTemplate>
        <UnauthenticatedTemplate>
          You are not signed in. Please sign in!
        </UnauthenticatedTemplate>
      </PageLayout>
    </div>
  );
}

export default App;
