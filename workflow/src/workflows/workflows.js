import React, { Component } from 'react';
import { Link } from 'react-router';
import './workflows.css';
const $ = window.$;
const moment = window.moment;

class Workflows extends Component {
  constructor (props) {
    super(props);
    this.state = {
      workflows: [],
      allChecked: false
    }
  }
  toggleChecks(param, event) {
    const val =  event.currentTarget.checked;
    this.setState(prev => {
      let isAllChecked = true;
      if (param !== 1) {
        let updatedWorkflows = prev.workflows.map(a => {
          if (a.workflowId === param.workflowId) {
            a.checked = val;
          }
          isAllChecked = isAllChecked && a.checked;
          return a;
        });
        return {
          workflows: updatedWorkflows,
          allChecked: isAllChecked
        }
      }
      return {
        workflows: prev.workflows.map(a => (a.checked = val, a)),
        allChecked: val
      }
    });
  }
  componentWillMount() {
    fetch("/api/workflows", {
      headers: {
        'Accept': 'application/json'
      },
      method: "GET"
    }).then(res => res.json())
      .then(json => {
        if (json.workflows.length) {
        this.setState(() => ({ 
          workflows: json.workflows.map(a => {
            if (typeof a === "string") {
              return JSON.parse(a);
            }
            return a;
          })
        }));
        
        }
      });
  }
  render() {
    return (
      !this.state.workflows.length ? null : (
        <table className="table workflow-table">
          <thead>
            <tr>
              <th><input type="checkbox" className="check" checked={this.state.allChecked} onChange={this.toggleChecks.bind(this, 1)} /></th>
              <th>Title</th>
              <th>Workflow Id</th>
              <th>Created by</th>
              <th>Last updated</th>
              <th>Status</th>
              <th>Show Details</th>
            </tr>
          </thead>
          <tbody>
          {
            this.state.workflows.map(workflow => (
              <tr key={workflow.workflowId}>
                <td><input type="checkbox" name={`workflow${workflow.workflowId}`} checked={workflow.checked} onChange={this.toggleChecks.bind(this, workflow)} className="check" /></td>
                <td><Link to={`/${workflow.title.replace(/\s/g, "").toLowerCase() + workflow.workflowId}`}>{workflow.title}</Link></td>
                <td>{workflow.workflowId}</td>
                <td>{workflow.creator}</td>
                <td>{moment(workflow.lastModified).fromNow()}</td>
                <td className="warning"><span className="oi oi-warning"></span> Start error</td>
                <td><span className="oi oi-warning"></span> <span className="oi oi-warning"></span> </td>
              </tr>
            ))
          }
          </tbody>
        </table>
      )
    )
  }
}

export default Workflows;
