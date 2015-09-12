var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") return Reflect.decorate(decorators, target, key, desc);
    switch (arguments.length) {
        case 2: return decorators.reduceRight(function(o, d) { return (d && d(o)) || o; }, target);
        case 3: return decorators.reduceRight(function(o, d) { return (d && d(target, key)), void 0; }, void 0);
        case 4: return decorators.reduceRight(function(o, d) { return (d && d(target, key, o)) || o; }, desc);
    }
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var angular2_1 = require('angular2/angular2');
var BeesMind = (function () {
    function BeesMind() {
        this.content = 'local content';
        this.newContent = new angular2_1.EventEmitter();
        this.initBeeEdit();
    }
    BeesMind.prototype.newContentReady = function () {
        console.log("from the bottom");
        this.newContent.next({ content: this.content });
    };
    BeesMind.prototype.onChange = function (e, new_value) {
        this.content = new_value;
    };
    BeesMind.prototype.initBeeEdit = function () {
        var args = document.location.search.slice(1).split('&');
        var params = {};
        $.each(args, function (i, o) {
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
                            "options": { "hidden": true }
                        },
                        "data": {
                            "type": "object"
                        },
                        "io": {
                            "type": "object",
                            "properties": {
                                "selector": { "type": "string" },
                                "valve": { "type": "integer" },
                                "as_type": { "type": "string" }
                            }
                        },
                        "process": {
                            "type": "array",
                            "items": { "type": "string" }
                        },
                        "fsa": {
                            "type": "object",
                            "properties": {
                                "states": {
                                    "type": "array",
                                    "items": {
                                        "type": "object",
                                        "properties": {
                                            "input": { "type": "string" },
                                            "node": { "type": "string" }
                                        }
                                    }
                                },
                                "description": { "type": "string" }
                            }
                        },
                        "fsa_state": {
                            "type": "object",
                            "properties": {
                                "accepting": {
                                    "type": "boolean"
                                }
                            }
                        },
                        "view": {
                            "type": "object",
                            "properties": {
                                "position": {
                                    "type": "object",
                                    "properties": { "x": { "type": "integer" }, "y": { "type": "integer" } }
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
            disable_array_add: false,
            disable_array_delete: false,
            disable_array_reorder: true,
            disable_edit_json: true,
            disable_properties: false
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
                            "enum": ["", "push", "pop", "enqueue", "dequeue"]
                        },
                        "alias": {
                            "type": "string"
                        }
                    },
                    "format": "grid"
                }
            },
            disable_array_add: true,
            disable_array_delete: true,
            disable_array_reorder: true,
            disable_edit_json: true,
            disable_properties: true
        });
        if (params.example) {
            $(document).trigger("load_hbg", [{ "graph": params.example, "view_index": 0 }, ["examples"]]);
        }
        else {
            $("#nav_load").trigger('click');
        }
    };
    BeesMind = __decorate([
        angular2_1.Component({
            events: ['newContent'],
            properties: ['content'],
            selector: 'bees-mind'
        }),
        angular2_1.View({
            templateUrl: 'templates/bee-editor.html'
        }), 
        __metadata('design:paramtypes', [])
    ], BeesMind);
    return BeesMind;
})();
var GraphService = (function () {
    function GraphService() {
        this.graphel = { graph: {}, nodes: [{ id: 'a' }, { id: 'b' }], edges: [{ from: 'a', to: 'b' }] };
    }
    return GraphService;
})();
var FlowerField = (function () {
    function FlowerField() {
        this.work = 'new flower';
    }
    FlowerField = __decorate([
        angular2_1.Component({
            properties: ['work'],
            selector: 'flower-field'
        }),
        angular2_1.View({
            template: '\
    <h2>flower field</h2>\
    <div>{{work}}</div>\
  '
        }), 
        __metadata('design:paramtypes', [])
    ], FlowerField);
    return FlowerField;
})();
var BeeApp = (function () {
    function BeeApp() {
        this.theWork = 'app level work for bee to do';
    }
    BeeApp.prototype.respondToNewContent = function (work) {
        console.log("to the top");
        console.log(work.content);
        this.theWork = work.content;
    };
    BeeApp = __decorate([
        angular2_1.Component({
            selector: 'bee-app'
        }),
        angular2_1.View({
            directives: [BeesMind, FlowerField],
            templateUrl: 'templates/bee-app.html'
        }), 
        __metadata('design:paramtypes', [])
    ], BeeApp);
    return BeeApp;
})();
angular2_1.bootstrap(BeeApp);
