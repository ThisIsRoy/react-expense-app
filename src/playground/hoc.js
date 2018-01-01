// Goal of higher order component is to 
// reuse code
// render hijacking
// prop manipulation
// abstract state

import React from 'react';
import ReactDOM from 'react-dom';
import { STATUS_CODES } from 'http';

const Info = (props) => (
  <div>
    <h1>Info</h1>
    <p>The info is: {props.info}</p>
  </div>
);

const withAdminWarning = (WrappedComponent) => {
  return (props) => (
    <div>
      {props.isAdmin && <p>This is private info. Do not share</p>}
      <WrappedComponent {...props}/>
    </div>
  );
};

const requireAuthentication = (WrappedComponent) => {
  return (props) => (
    <div>
      {props.isAuthenticated 
        ? <WrappedComponent {...props} /> 
        : <p>Please log in</p>
      }
    </div>
  );
};

const AdminInfo = withAdminWarning(Info);
const AuthInfo = requireAuthentication(Info);

// ReactDOM.render(<AdminInfo isAdmin={true} info="details blah blah blah" />, document.getElementById('app'));
ReactDOM.render(<AuthInfo isAuthenticated={true} info="details blah blah blah" />, document.getElementById('app'));