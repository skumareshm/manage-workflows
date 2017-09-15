import React, { Component } from 'react';
import "./operator.css";
const $ = window.$;
const moment = window.moment;

class Operator extends Component {
  constructor (props) {
    super(props);
    this.state = {
    }
  }
  render() {
    return (
      <div className="modal-content">
        <div className="modal-header">
          <h5 className="modal-title" id="propertiesModal">{ this.props.operatorId }</h5>
          <button type="button" className="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div className="modal-body row">
          <ul className="nav flex-column nav-tabs col-3 tabs-left" id="root" role="tablist">
            <li className="nav-item">
              <a className="nav-link" id="home-tab" data-toggle="tab" href="#a1" role="tab" aria-controls="home" aria-expanded="true">Info</a>
            </li>
            <li className="nav-item">
              <a className="nav-link active" id="profile-tab" data-toggle="tab" href="#a2" role="tab" aria-controls="profile">Configuration</a>
            </li>
            <li className="nav-item dropdown">
              <a className="nav-link" id="profile-tab" data-toggle="tab" href="#a3" role="tab" aria-controls="profile"> <i className="oi oi-info"></i> Raw Preview</a>
            </li>
          </ul>
          <div className="tab-content col" id="root">
            <div className="tab-pane fade" id="a1" role="tabpanel" aria-labelledby="dropdown1-tab">Work in Progress</div>
            <div className="tab-pane active" id="a2" role="tabpanel" aria-labelledby="dropdown1-tab">

              <ul className="nav nav-tabs" id="myTab" role="tablist">
                <li className="nav-item">
                  <a className="nav-link active" id="home-tab" data-toggle="tab" href="#general" role="tab" aria-controls="home" aria-expanded="true">General</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" id="profile-tab" data-toggle="tab" href="#files" role="tab" aria-controls="profile">Files</a>
                </li>
                <li className="nav-item dropdown">
                  <a className="nav-link" id="profile-tab" data-toggle="tab" href="#post" role="tab" aria-controls="profile">Post Processing</a>
                </li>
              </ul>
              <div className="tab-content" id="myTabContent">
                <div className="tab-pane active" id="general" role="tabpanel" aria-labelledby="profile-tab">
                  <form>
                    <div className="form-group row">
                      <label for="name" className="col-sm-3 col-form-label">Name</label>
                      <div className="col-sm-9">
                        <input type="text" className="form-control" id="name" value="" />
                      </div>
                    </div>
                    <div className="form-group row">
                      <label for="desc" className="col-sm-3 col-form-label">Description</label>
                      <div className="col-sm-9">
                        <input type="text" className="form-control" id="desc" value="" />
                      </div>
                    </div>
                    <div className="form-group row">
                      <label for="event" className="col-sm-3 col-form-label">Produce Events</label>
                      <div className="col-sm-9">
                      <div class="form-check form-check-inline">
                        <label class="form-check-label">
                          <input class="form-check-input" type="checkbox" id="inlineCheckbox1" value="option1" />
                        </label>
                      </div>
                      </div>
                    </div>
                    <div className="form-group row">
                      <label for="error" className="col-sm-3 col-form-label">On Record Error</label>
                      <div className="col-sm-9">
                        <select class="form-control">
                          <option>Send to Error</option>
                        </select>
                      </div>
                    </div>

                  </form>
                </div>
                <div className="tab-pane fade" id="files" role="tabpanel" aria-labelledby="dropdown1-tab">Work in Progress</div>
                <div className="tab-pane fade" id="post" role="tabpanel" aria-labelledby="dropdown2-tab">Work in Progress</div>
              </div>
            </div>
            <div className="tab-pane fade" id="a3" role="tabpanel" aria-labelledby="dropdown1-tab">Work in Progress</div>
            
          </div>
        </div>
        <div className="modal-footer">
          <button type="button" className="btn btn-secondary" data-dismiss="modal">Ok</button>
        </div>
      </div>      
    )
  }
}

export default Operator;
