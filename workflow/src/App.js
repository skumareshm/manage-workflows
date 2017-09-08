import React, { Component } from 'react';
import { Link } from 'react-router';

import logo from './logo.png';
import { Chart } from './chart';
import { Workflows } from './workflows';
import { LeftMenu } from './left-menu';
import './App.css';

class App extends Component {
  constructor (props) {
    super(props);
    this.state = {
      isChartMode: false,
      isMenuCollapsed: true
    }
  }
  render() {
    return (
      <div className="container-fluid">
        <header className="row">
          <div className="primary-header">
            <Link to="/"><img alt="N4Mative" src={logo} title="N4Mative" /></Link>
          </div>
          <div className="secondary-header">
            <div className="breadcrumb-holder float-left"><span className="oi oi-menu hambuger"></span> &nbsp; Workflow <span className="hide workflowName"> { this.state.currentWorkflow && " / " + this.state.currentWorkflow } </span></div>
            <div className="button-controls float-right">
              <button type="button" className="btn btn-primary btn-sm">Play</button>
              <button type="button" className="btn btn-primary btn-sm">Stop</button>
              <button type="button" className="btn btn-primary btn-sm">Pause</button>
              <button type="button" className="btn btn-primary btn-sm">Preview</button>
            </div>
          </div>
        </header>
        <main className="row">
          {
            this.state.isMenuCollapsed &&  <LeftMenu router={this.props.router} />
          }
          <section className="col">
            <Workflows />
          </section>
        </main>
      </div>
    );
  }
}

export default App;
