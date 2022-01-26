import { ValueTransformer } from '@angular/compiler/src/util';
import {Command, Editor} from '@ckeditor/ckeditor5-core';

export  class InsertStructuredFieldMarkerCommand extends Command {
  public isEnabled: boolean;
  private fieldID = 0;
  constructor(public editor:Editor) {
    super(editor);
  }
  execute() {
    console.log('exceuting InsertStructuredFieldMarkerCommand ');
    const model = this.editor.model;
    const document = model.document;
    const selection = document.selection;
    const editor = this.editor;

    model.change( writer => {
      const marker = writer.addMarker(`sf:${this.fieldID++}`, {
        usingOperation: true,
        affectsData: true,
        range: editor.model.document.selection.getFirstRange()
      })
    });
    console.log('** markers list - ');
    for(let marker of editor.model.markers){
      console.log(`**** {${marker.name}, range(${marker.getStart().offset}, ${marker.getEnd().offset}) }`);
    }
  }

  refresh() {
    this.isEnabled = true;
  }
}


