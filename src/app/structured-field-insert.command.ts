import { ValueTransformer } from '@angular/compiler/src/util';
import Command from '@ckeditor/ckeditor5-core/src/command';
import {CKEditor5} from "@ckeditor/ckeditor5-angular";
import Editor = CKEditor5.Editor;

export default class InsertStructuredFieldCommand extends Command {
  private isEnabled: boolean;
  constructor(protected editor:Editor) {
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
    const allowedIn = model.schema.findAllowedParent(
      selection.getFirstPosition(),
      'StructuredField'
    );

    this.isEnabled = true; //allowedIn !== null;
  }
}

function createStructuredField(writer) {
  const structuredField = writer.createElement('StructuredField');
  // const structuredFieldContent = writer.createElement('StructuredFieldContent');
  // const simpleBoxDescription = writer.createElement( 'simpleBoxDescription' );

  //writer.append(structuredFieldContent, structuredField);
  // writer.append( simpleBoxDescription, simpleBox );

  // There must be at least one paragraph for the description to be editable.
  // See https://github.com/ckeditor/ckeditor5/issues/1464.
  // writer.appendElement( 'paragraph', simpleBoxDescription );
  writer.setSelection(structuredField, 'on');
  return structuredField;
}
