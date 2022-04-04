import { ValueTransformer } from '@angular/compiler/src/util';
import {Command, Editor} from '@ckeditor/ckeditor5-core';
import {SfMarkerService} from "./sf-marker.service";
//import {Marker} from '@ckeditor/ckeditor5-engine/src/model/markercollection';

interface Marker{
  data: any;
}
export  class InsertStructuredFieldMarkerCommand extends Command {
  public isEnabled: boolean;
  private static fieldID = 10;//-1;
  constructor(public editor:Editor) {
    super(editor);
  }
  execute() {
    console.log('exceuting InsertStructuredFieldMarkerCommand ');
    const model = this.editor.model;
    const document = model.document;
    const selection = document.selection;
    const editor = this.editor;
    //InsertStructuredFieldMarkerCommand.fieldID = model.markers[Symbol.iterator].length;
    // if(selection.getFirstRange() == <empty>){
    //
    // }
    model.change( writer => {
      //if(writer.insertText("-SF-",selection.getFirstPosition(),0);
      const makerName = `sf:id-${++InsertStructuredFieldMarkerCommand.fieldID}`;
      const marker: any = writer.addMarker(makerName, {
        usingOperation: true,
        affectsData: true,
        range: editor.model.document.selection.getFirstRange()
      })
      marker.data= {'id': InsertStructuredFieldMarkerCommand.fieldID, "key": makerName,"isEmpty": false, "a2": "value2"};// Add singltone data entry store for that marker-sf {marker.name : {marker, isEmpty, type, options = [1,2]} }
      SfMarkerService.setMarkerData(makerName, marker.data);

      const sfStartTag = writer.createElement('StructuredFieldMarkerStart');
      const sfEndTag = writer.createElement('StructuredFieldMarkerEnd');
      this.editor.model.insertContent( sfStartTag, selection.getFirstRange().start,"after");
      this.editor.model.insertContent( sfEndTag, selection.getFirstRange().end);

      //   name: "sf-inline-" + this.fieldID,
      //   class: "algotec-sf-inline"
      // });
    });
    // console.log('** markers list - ');
    // for(let marker of editor.model.markers){
    //   console.log(`**** {${marker.name}, range(${marker.getStart().offset}, ${marker.getEnd().offset}) }`);
    // }
  }

  refresh() {
    this.isEnabled = true;
  }
}


