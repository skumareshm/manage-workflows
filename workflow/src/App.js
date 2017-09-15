import React, { Component } from 'react';
import { Link } from 'react-router';

import logo from './logo.png';
import { Workflows } from './workflows';
import { LeftMenu } from './left-menu';
import './App.css';
const $ = window.$;

class App extends Component {
  constructor (props) {
    super(props);
    this.state = {
      isChartMode: false,
      isMenuCollapsed: true,
      deleteWorkflow: false
    }
  }
  initDeleteWorkflows() {
    if (!$('.workflow-table input:checked').length) return;
    $("#deleteWorflowModal").modal("show");
  }
  deleteWorkflows(flag) {
    this.setState(prev => ({deleteWorkflow: flag !== false}));
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
              <button type="button" className="btn btn-primary btn-sm">Pause</button><button type="button" className="btn btn-primary btn-sm">Preview</button>
              <button type="button" className="btn btn-primary btn-sm message-toggle" data-container="body"  data-toggle="popover" data-placement="top" data-trigger="focus" data-html="true" onClick={this.initDeleteWorkflows.bind(this)}>Delete</button>
            </div>
          </div>
        </header>
        <main className="row">
          {
            this.state.isMenuCollapsed &&  <LeftMenu router={this.props.router} />
          }
          <section className="col">
            <Workflows 
              deleteWorkflow={ this.state.deleteWorkflow }
              afterDeleteHandler={ this.deleteWorkflows.bind(this) } />
          </section>
        </main>

        <div className="modal fade" id="deleteWorflowModal" role="dialog" aria-labelledby="deleteWorflowModal" aria-hidden="true">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="deleteWorflowModal">Delete Workflows</h5>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <p>Are you sure you want to delete the selected workflow(s)?</p>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-dismiss="modal">Cancel</button>
                <button type="button" className="btn btn-primary" onClick={this.deleteWorkflows.bind(this)}>Delete workflow(s)</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
