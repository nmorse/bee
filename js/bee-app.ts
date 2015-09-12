import {Component, View, bootstrap, EventEmitter} from 'angular2/angular2';


// graph editor aka bee's mind
@Component({
  //injector: [GraphService],
  events : ['newContent'],
  properties: ['content'],
  selector: 'bees-mind'
})
@View({
  templateUrl: 'templates/bee-editor.html'
})
class BeesMind {
  newContent: EventEmitter;
  content:string = 'local content';
  constructor () {
    //>>this.graph = gs.graphel;
    this.newContent = new EventEmitter();
    this.initBeeEdit();
  }
  newContentReady() {
    console.log("from the bottom");
    this.newContent.next({content: this.content});
  }
  onChange(e, new_value) {
    this.content = new_value;
  }

  initBeeEdit() {
    var args = document.location.search.slice(1).split('&');
    var params = {};
    $.each(args, function(i, o){
      var key_val_arr = o.split('=');
      if (key_val_arr.length === 2) {
        params[key_val_arr[0]] = decodeURIComponent(key_val_arr[1]);
      }
    });

    nodes_editor = new JSONEditor($('#node_editor')[0], {
        theme: 'bootstrap3',
        schema: {
        "type": "array",
        "title": "All Selected Nodes",
        "uniqueItems": true,
        "items": {
          "type": "object",
          "title": "Selected Node",
          "headerTemplate": "{{ self.id }} - {{ self.name }}",
          "properties": {
          "name": {
            "type": "string",
            "default": "Start",
            "required": true
          },
          "id": {
            "type": "string",
            "options": {"hidden": true}
          },
          "data": {
            "type": "object"
          },
          "io": {
            "type": "object",
            "properties": {
              "selector":{"type":"string"},
              "valve":{"type":"integer"},
              "as_type":{"type":"string"}
            }
          },
          "process": {
            "type": "array",
            "items": {"type":"string"}
          },
          "fsa": {
            "type": "object",
            "properties": {
              "states":{
                "type":"array",
                "items": {
                  "type": "object",
                  "properties": {
                    "input":{"type":"string"},
                    "node":{"type":"string"}
                  }
                }
              },
              "description":{"type":"string"}
            }
          },
          "fsa_state": {
            "type":"object",
            "properties": {
              "accepting": {
                "type": "boolean"
              }
            }
          },
          "view": {
            "type":"object",
            "properties": {
              "position": {
                "type": "object",
                "properties": {"x":{"type":"integer"}, "y":{"type":"integer"}}
              }
            }
          },
          "parent": {
            "type": "string"
          }
         },
         "format": "grid"
        }
      },
      disable_array_add:false,
      disable_array_delete:false,
      disable_array_reorder:true,
      disable_edit_json:true,
      disable_properties:false
      });
    edges_editor = new JSONEditor($('#edge_editor')[0], {
        theme: 'bootstrap3',
        schema: {
        "type": "array",
        "title": "Selected Edges",
        "items": {
          "type": "object",
          "title": "Selected Edge",
          "headerTemplate": "{{ self.source }} -> {{ self.target }} ({{ self.edge_type }}) {{ self.name }} ",
          "properties": {
            "name": {
              "type": "string",
              "required": true
            },
            "source": {
              "type": "string",
              "required": true
            },
            "target": {
              "type": "string",
              "required": true
            },
            "edge_type": {
              "type": "string",
              "enum": ["", "get", "set", "flo", "sub", "pub"],
              "required": true
            },
            "guard": {
              "type": "string",
              "required": true
            },
            "set_op": {
              "type": "string",
              "enum":["", "push", "pop", "enqueue", "dequeue"]
            },
            "alias": {
              "type": "string"
            }
          },
          "format": "grid"
        }
      },
      disable_array_add:true,
      disable_array_delete:true,
      disable_array_reorder:true,
      disable_edit_json:true,
      disable_properties:true
    });

    if (params.example) {
      $(document).trigger("load_hbg", [{"graph":params.example, "view_index":0}, ["examples"]]);
    }
    else {
      $("#nav_load").trigger('click');
    }
  }

}

// a service that provides graph storage and other helpfull fileing and sweeping.
class GraphService {
  graphel: Object;
  constructor() {
    this.graphel = {graph:{}, nodes:[{id:'a'}, {id:'b'}], edges:[{from:'a', to:'b'}]};
  }
}


// flowerfield
@Component({
  properties: ['work'],
  selector: 'flower-field'
})
@View({
  template: '\
    <h2>flower field</h2>\
    <div>{{work}}</div>\
  '
})
class FlowerField {
  work:string = 'new flower';
}

@Component({
  selector: 'bee-app'
})
@View({
  directives: [BeesMind, FlowerField],
  templateUrl: 'templates/bee-app.html'
})
class BeeApp {
  theWork: string = 'app level work for bee to do';
  respondToNewContent(work) {
    console.log("to the top");
    console.log(work.content);
    this.theWork = work.content;
  }
}


bootstrap(BeeApp);
