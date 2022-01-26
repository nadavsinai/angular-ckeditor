import { ValueTransformer } from '@angular/compiler/src/util';
import {Command,Editor} from '@ckeditor/ckeditor5-core';

export class InsertStructuredFieldCommand extends Command {
  public isEnabled: boolean;
  constructor(public editor:Editor) {
    super(editor);
  }
  execute() {
    this.editor.model.change((writer) => {
      // Insert <simpleBox>*</simpleBox> at the current selection position
      // in a way that will result in creating a valid model structure.
      this.editor.model.insertContent(createStructuredField(writer));
    });
  }

  refresh() {
    const model = this.editor.model;
    const selection = model.document.selection;
    // const allowedIn = model.schema.findAllowedParent(
    //   selection.getFirstPosition(),
    //   'StructuredField'
    // );

    this.isEnabled = true; //allowedIn !== null;
  }
}

function createStructuredField(writer) {
  const structuredField = writer.createElement('StructuredField');
  const structuredFieldContent = writer.createElement('StructuredFieldContent');


  writer.append(structuredFieldContent, structuredField);

  // There must be at least one paragraph for the description to be editable.
  // See https://github.com/ckeditor/ckeditor5/issues/1464.
  writer.appendElement( 'paragraph', structuredFieldContent );
  // writer.insertText(" ", structuredFieldContent);
  //writer.setSelection(structuredField, 'on');
  return structuredField;
}
