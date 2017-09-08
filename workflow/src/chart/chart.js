import React, { Component } from 'react';
import './chart.css';
const $ = window.$;

class Chart extends Component {
  componentWillMount() {
    $.getJSON("data/elements.json", (data) => { 

      $(data.elements).each((i, element) => {
        $('.draggable_operators_divs').append('<div class="draggable_operator ui-draggable ui-draggable-handle element ' + element.type + '" data-nb-inputs="' + (element.type === 'source' ? 0 : 1) + '" data-nb-outputs="' + (element.type === 'destination' ? 0 : 1) + '"><span class="oi oi-' + element.icon + '" title="' + element.label + '" aria-hidden="true"></span>' + element.label+ '</div>')
      });

      $('#controls').on('change', function(){
        var item = $(this).val();
        if(item === 'all') {
          $('.element').show();
        } else {
          $('.element').hide();
          $('.element.'+ item).show();
        }
      });
      if ($(document).data("elementsLoaded") === 0){
        this.initFlowchart();
      }
      $(document).data("elementsLoaded", true);
    });
    
    fetch("/api/workflow/" + this.props.workflowId,{
      headers: {
        'Accept': 'application/json'
      },
      method: "GET"
    }).then(res => {
      if (res.ok) return res.json();
      return {}
    }).then(data => {
      let json = null;
      if (data.data) {
        json = JSON.parse(data.data);
      }
      if ($(document).data("elementsLoaded")){
        this.initFlowchart(json);
      }
      else {
        $(document).data("elementsLoaded", 0);
        $(document).data("previewData", data["workflow-specs"]);
      }
    });
  }
  initFlowchart(data) {
    var $flowchart = $('#board');
    var $container = $flowchart.parent();
    
    var cx = $flowchart.width() / 2;
    var cy = $flowchart.height() / 2;
    
    
    // Panzoom initialization...
    $flowchart.panzoom();
    
    // Centering panzoom
    $flowchart.panzoom('pan', -cx + $container.width() / 2, -cy + $container.height() / 2);

    // Panzoom zoom handling...
    var possibleZooms = [0.5, 0.75, 1, 2, 3];
    var currentZoom = 2;
    $container.on('mousewheel.focal', function( e ) {
        e.preventDefault();
        var delta = (e.delta || e.originalEvent.wheelDelta) || e.originalEvent.detail;
        var zoomOut = delta ? delta < 0 : e.originalEvent.deltaY > 0;
        currentZoom = Math.max(0, Math.min(possibleZooms.length - 1, (currentZoom + (zoomOut * 2 - 1))));
        $flowchart.flowchart('setPositionRatio', possibleZooms[currentZoom]);
        $flowchart.panzoom('zoom', possibleZooms[currentZoom], {
            animate: false,
            focal: e
        });
    });
    
    // Apply the plugin on a standard, empty div...
    $flowchart.flowchart({
      data: data || {}
    });

    $flowchart.parent().siblings('.delete_selected_button').click(function() {
      $flowchart.flowchart('deleteSelected');
    });
    
    
    var $draggableOperators = $('.draggable_operator');
    
    function getOperatorData($element) {
      var nbInputs = parseInt($element.data('nb-inputs'));
      var nbOutputs = parseInt($element.data('nb-outputs'));
      var data = {
        properties: {
          title: '<span class="'+ $element.find('span').attr('class') + '" title="icon name" aria-hidden="true"></span>',
          inputs: {},
          outputs: {}
        } 
      };
      
      var i = 0;
      for (i = 0; i < nbInputs; i++) {
        data.properties.inputs['input_' + i] = {
          label: nbOutputs ? '' : $element.text()
        };
      }
      for (i = 0; i < nbOutputs; i++) {
        data.properties.outputs['output_' + i] = {
          label: $element.text()
        };
      }
      
      return data;
    }
    
    var operatorId = 0;
        
    $draggableOperators.draggable({
        cursor: "move",
        opacity: 0.7,
        
        helper: 'clone', 
        appendTo: 'body',
        zIndex: 1000,
        
        helper: function(e) {
          var $this = $(this);
          var data = getOperatorData($this);
          return $flowchart.flowchart('getOperatorElement', data);
        },
        stop: function(e, ui) {
            var $this = $(this);
            var elOffset = ui.offset;
            var containerOffset = $container.offset();
            if (elOffset.left > containerOffset.left &&
                elOffset.top > containerOffset.top && 
                elOffset.left < containerOffset.left + $container.width() &&
                elOffset.top < containerOffset.top + $container.height()) {

                var flowchartOffset = $flowchart.offset();

                var relativeLeft = elOffset.left - flowchartOffset.left;
                var relativeTop = elOffset.top - flowchartOffset.top;

                var positionRatio = $flowchart.flowchart('getPositionRatio');
                relativeLeft /= positionRatio;
                relativeTop /= positionRatio;
                
                var data = getOperatorData($this);
                data.left = relativeLeft;
                data.top = relativeTop;
                
                $flowchart.flowchart('addOperator', data);
            }
        }
    });
  }
  componentDidUpdate(prevProps){  
    if (this.props.saveWorkflow) {
      let data = $('#board').flowchart('getData');
      fetch("/api/workflow/" + this.props.workflowId, {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        method: "POST",
        body: JSON.stringify(data)
      }).then(res => res.json())
      .then(json => {
        if (json.success) {
          $(".message-toggle").popover({"content": "The workflow has been saved successfully"}).popover('show');
        }
      });
      this.props.afterSaveHandler(false);
    }
  }
  render() {
    return (
      <main>
        <section className="col col-sm-12">
          <article className="left">
            <div id="board"></div>
          </article>
          <article className="right">
          <form>
          <div className="form-group">
            <select className="form-control" id="controls" placeholder="Shapes">
              <option value="all">All Stages</option>
              <option value="source">Source</option>
              <option value="transformation">Transformation</option>
              <option value="destination">Destination</option>
            </select>
          </div>
          </form>
          <div className="draggable_operators elements">
            <div className="draggable_operators_divs">
              
            </div>
          </div>
          </article>
        </section>
      </main>
    );
  }
}

export default Chart;
