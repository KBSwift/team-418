import React from 'react';
import { Link } from 'react-router-dom';

function Navigation() {

return (
  <div>
  <h2>Navigation Page</h2>
  <Link to="/login">Go to Login</Link>
</div>
  );
}

export default Navigation