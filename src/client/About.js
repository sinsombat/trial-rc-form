import React from 'react';
import { Link } from 'react-router-dom';


class About extends React.Component {
  render() {
    return (
      <div className="Home">
        <div className="Home-header">
          <h2>About</h2>
        </div>
        <ul className="Home-resources">
          <li>
            <Link to={`/`}>Home</Link>
          </li>
        </ul>
      </div>
    );
  }
}

export default About;
