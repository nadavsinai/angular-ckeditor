import { ValueTransformer } from '@angular/compiler/src/util';
import {Command} from '@ckeditor/ckeditor5-core';
import {CKEditor5} from "@ckeditor/ckeditor5-angular";
import Editor = CKEditor5.Editor;

export  class InsertStructuredFieldInlineCommand extends Command {
  private isEnabled: boolean;
  private fieldID = 0;
  constructor(protected editor:Editor) {
    super(editor);
  }
  execute() {
    // this.editor.model.change((writer) => {
    //   // Insert <simpleBox>*</simpleBox> at the current selection position
    //   // in a way that will result in creating a valid model structure.
    //   this.editor.model.insertContent(createStructuredField(writer));
    // });
    const model = this.editor.model;
    const document = model.document;
    const selection = document.selection;
    const editor = this.editor;

    model.change( writer => {
      this.fieldID++;
      // const sfStart = writer.createElement('StructuredFieldInline-start', {
      //   name: "sf-inline-" + this.fieldID,
      //   class: "algotec-sf-inline-start"
      // });
      const sfContent = writer.createElement('StructuredFieldInline',  {
        name: "sf-inline-" + this.fieldID,
        class: "algotec-sf-inline"
      });
      //     , {
      //   name: "sf-inline-" + this.fieldID,
      //   class: "algotec-sf-inline-content"
      // });
       writer.insertText(' -sf- ', sfContent);
      //
      // const sfEnd = writer.createElement('StructuredFieldInline-end', {
      //   name: "sf-inline-" + this.fieldID,
      //   class: "algotec-sf-inline-end"
      // });

     // document.insertContent(sfStart);
      //editor.model
      editor.model.insertContent(sfContent);
      //document.insertContent(sfEnd);
      // writer.setSelection(sfContent, 'on');

    });
  }

  refresh() {
    const model = this.editor.model;
    const selection = model.document.selection;
    this.isEnabled = true;
  }
}

function createStructuredField(writer) {
  const structuredFieldInline = writer.createElement('StructuredFieldInline');
  //writer.insertText(" ", structuredFieldInline);
  return structuredFieldInline;
}
