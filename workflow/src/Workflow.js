import React, { Component } from 'react';
import { Link } from 'react-router';

import logo from './logo.png';
import { Chart } from './chart';
import './App.css';

class Workflow extends Component {
  constructor (props) {
    super(props);
    this.state = {
      saveWorkflow: false
    }
  }
  saveWorkflow(flag) {
    this.setState(prev => ({saveWorkflow: flag !== false}));
  }
  render() {
    return (
      <div className="container-fluid">
        <header className="row">
          <div className="primary-header">
            <Link to="/"><img alt="N4Mative" src={logo} title="N4Mative" /></Link>
          </div>
          <div className="secondary-header">
            <div className="breadcrumb-holder float-left"><span className="oi oi-menu hambuger"></span> &nbsp; Workflow <span className="hide workflowName"> { this.props.params && this.props.params.workflowId && " / " + this.props.params.workflowId } </span></div>
            <div className="button-controls float-right">
              <button type="button" className="btn btn-primary btn-sm">Play</button>
              <button type="button" className="btn btn-primary btn-sm">Stop</button>
              <button type="button" className="btn btn-primary btn-sm">Pause</button>
              <button type="button" className="btn btn-primary btn-sm">Preview</button>
              <button data-container="body" data-toggle="popover" data-placement="top" data-trigger="focus" data-html="true" type="button" className="btn btn-primary btn-sm message-toggle" onClick={this.saveWorkflow.bind(this)}>Save</button>
            </div>
          </div>
        </header>
        <main className="row">
          <Chart 
            workflowId={ (this.props.params && this.props.params.workflowId) || null} 
            saveWorkflow={ this.state.saveWorkflow }
            afterSaveHandler={ this.saveWorkflow.bind(this) }
          />
        </main>
      </div>
    );
  }
}

export default Workflow;
