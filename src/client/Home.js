import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'antd'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as CounterActions from '../actions';

import logo from './react.svg';
import './Home.css';

class Home extends React.Component {
  static async getInitialProps({ req, res, match}) {
    console.log('store ', match)
    return {  };
  }
  render() {
    return (
      <div className="Home">
        <div className="Home-header">
          <img src={logo} className="Home-logo" alt="logo" />
          <h2>Welcome to Razzle</h2>
        </div>
        <ul className="Home-resources">
          <li>
            <Link to={`/form`}>Form</Link>
          </li>
          <li>
            <Link to={`/about`}>About</Link>
          </li>
        </ul>
        <div>
          <Button onClick={ this.props.increment } type="primary">+</Button>
          { this.props.count }
          <Button onClick={ this.props.decrement } type="primary">-</Button>
        </div>
      </div>
    );
  }
}


const mapStateToProps = state => ({
  count: state.counter.count,
});

function mapDispatchToProps(dispatch) {
  return bindActionCreators(CounterActions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
