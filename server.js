const express = require("express");
const json = require('express-json');
const bodyParser = require('body-parser');
const fs = require("fs");
const mkdirp = require('mkdirp');
const getDirName = require('path').dirname;
const uuid = require('uuid/v1');
const { lstatSync, readdirSync } = require('fs')
const { join } = require('path');
const rimraf = require('rimraf');

const app = express();

app.set("port", process.env.PORT || 3001);

// Express only serves static assets in production
if (process.env.NODE_ENV === "production") {
  app.use(express.static("workflow/build"));
}
app.use(bodyParser.json());
app.use(json()); 

app.get("/api/workflows", (req, res) => {
  const isDirectory = source => lstatSync(source).isDirectory();
  const getDirectories = source =>
    readdirSync(source).map(name => join(source, name)).filter(isDirectory);
  const root = __dirname + "/workflow/data/workflows/";
  if (!fs.existsSync(root)) {
    res.json({ error: null, workflows: []});
  }
  const workflowsDirs = getDirectories(root);
  var workflows = [];
  workflowsDirs.forEach(function(workflow) {
    workflows.push(fs.readFileSync(workflow + "/info.json", 'utf-8'));
  });
  res.json({workflows : workflows, error: null});
});

app.get("/api/workflow/:workflowid", (req, res) => {
  const workflowid = req.params.workflowid;
  const filepath = __dirname + "/workflow/data/workflows/" + workflowid + "/workflow.json";
  if (!fs.existsSync(filepath)) {
    res.json({ data: null});
    return;
  }
  fs.readFile(filepath, 'utf8', function (err, data) {
    if (err) {
      res.json({ data: null});
      return;
    }
    try {
      var obj = JSON.parse(data);
      res.json({data: data})
    } catch(e) { res.json({ data: null}); }
  });
});

app.post("/api/workflow", (req, res) => {
  let data = req.body;
  const workflowId = uuid();
  data = JSON.parse(JSON.stringify(data));
  data.workflowId = workflowId;
  data.uuid = uuid();
  const path = __dirname + "/workflow/data/workflows/" + data.title + data.workflowId + "/info.json";

  mkdirp(getDirName(path), function (err) {
    if (err) res.json({ error: "Cannot create path " + path});

    fs.writeFile(path, JSON.stringify(data), function(err) {
      if(err) {
        es.json({ error: "Cannot write file to path" + path});
      }

      res.json({ error: false, success: "File created successfully under " + path, path: data.title + data.workflowId});
    }); 
  });
});

app.post("/api/workflow/:workflowId", (req, res) => {
  let data = req.body;
  const path = __dirname + "/workflow/data/workflows/" + req.params.workflowId + "/workflow.json";

  mkdirp(getDirName(path), function (err) {
    if (err) res.json({ error: "Cannot create path " + path});

    fs.writeFile(path, JSON.stringify(data), function(err) {
      if(err) {
        es.json({ error: "Cannot write file to path" + path});
      }

      res.json({ error: false, success: "File created successfully under " + path, path:req.params.workflowId });
    }); 
  });
});

app.post("/api/workflows/delete", (req, res) => {
  let data = req.body,
    status = {
      workflows: []
    }
    count = 0;
  const root = __dirname + "/workflow/data/workflows/";
  var workflows = data.map(a => root + a);
  workflows.forEach(function(workflow) {
    rimraf(workflow, (err, success) => {
      status.workflows.push({ [workflow]: !err });
      !err && count++;
      if (status.workflows.length === workflows.length) {
        status.deleted = count === workflows.length;
        res.json(status);
      }
    });
  });
});

app.listen(app.get("port"), () => {
  console.log(`Find the server at: http://localhost:${app.get("port")}/`); // eslint-disable-line no-console
});
