import React, { Component } from 'react';
import Router from 'react-router';
const { Route, DefaultRoute, RouteHandler, Link } = Router;

require('./index.css')

export default class App extends Component {
  render() {
    return (
        <RouteHandler/>
    );
  }
}
