/* eslint-disable href-no-hash */
import React, { Component } from 'react';
import './left-menu.css';
const $ = window.$;

class LeftMenu extends Component {
  constructor (props) {
    super(props);
    this.state = {
      title: "",
      description: ""
    }
  }
  opendialog() {
    $("#createWorkflowModal").modal("show");
  }
  createWorkflow() {
    let { router } = this.props;
    fetch("/api/workflow", {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: "POST",
      body: JSON.stringify({
        "title" : this.state.title,
        "description" : this.state.description,
        "created" : (new Date()).getTime() / 1000,
        "lastModified" : (new Date()).getTime() / 1000,
        "creator" : "admin",
        "lastModifier" : "admin",
        "lastRev" : "0",
        "uuid" : 1
      })
    }).then(res => res.json())
    .then(json => {
      if (json.success) {
        $("#createWorkflowModal").modal("hide");
        router.push(json.path);
      }
    })
  }
  changeHandler(event) {
    const { name, value} = event.target;
    this.setState({ [name]: value })
  }
  render() {
    return (
      <nav className="col col-sm-3 left-menu">
        <div className="dropdown create-workflow">
          <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            Create a workflow
          </button>
          <div className="dropdown-menu" aria-labelledby="dropdownMenuButton" onClick={this.opendialog}>
            <button className="dropdown-item" href="#">Action</button>
            <button className="dropdown-item" href="#">Another action</button>
            <button className="dropdown-item" href="#">Something else here</button>
          </div>
        </div>
        <ul className="list-group row nav-list">
          <li className="list-group-item">All Workflows</li>
          <li className="list-group-item">Running Workflows</li>
          <li className="list-group-item">Non running Workflows</li>
          <li className="list-group-item">Failed Workflows</li>
          <li className="list-group-item">Invalid Workflows</li>
          <li className="list-group-item">Shared with me</li>
        </ul>
        <div className="modal fade" id="createWorkflowModal" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">New Workflow</h5>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <form>
                  <div className="form-group">
                    <label className="form-control-label">Title:</label>
                    <input type="text" className="form-control" value={this.state.title} name="title" onChange={ this.changeHandler.bind(this)} />
                  </div>
                  <div className="form-group">
                    <label className="form-control-label">Description:</label>
                    <textarea name="description" className="form-control" value={this.state.description} onChange={ this.changeHandler.bind(this)}></textarea>
                  </div>
                </form>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-dismiss="modal">Cancel</button>
                <button type="button" className="btn btn-primary" onClick={this.createWorkflow.bind(this)}>Create workflow</button>
              </div>
            </div>
          </div>
        </div>
      </nav>
    )
  }
}

export default LeftMenu;
