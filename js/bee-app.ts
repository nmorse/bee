import {Component, View, bootstrap, EventEmitter} from 'angular2/angular2';


// graph editor aka bee's mind
@Component({
  //injector: [GraphService],
  events : ['newContent'],
  properties: ['content'],
  selector: 'bees-mind'
})
@View({
  template: '<h2>Bee\'s mind</h2>\
  <div id="graph_vis"></div>\
  <input #input1 (keyup)="onChange($event, input1.value)" [value]="content" />\
  <button (click)="newContentReady()">send content to be worked on</button>\
  '
})
class BeesMind {
  newContent: EventEmitter;
  content:string = 'local content';
  constructor () {
    //>>this.graph = gs.graphel;
    this.newContent = new EventEmitter();
  }
  newContentReady() {
    console.log("from the bottom");
    this.newContent.next({content: this.content});
  }
  onChange(e, new_value) {
    this.content = new_value;
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
