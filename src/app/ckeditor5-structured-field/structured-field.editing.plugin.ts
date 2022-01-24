import {Plugin} from '@ckeditor/ckeditor5-core';
import {InsertStructuredFieldCommand} from './structured-field-insert.command';

import {toWidgetEditable, toWidget} from '@ckeditor/ckeditor5-widget';
import {Widget} from '@ckeditor/ckeditor5-widget';
import {CKEditor5} from "@ckeditor/ckeditor5-angular";
import Editor = CKEditor5.Editor;

export class StructuredFieldEditing extends Plugin {
  editor:Editor;
  static get pluginName() {
    return 'StructuredFieldEditing';
  }
  // static get requires() {
  //   return [Widget];
  // }

  init() {
    console.log('StructuredFieldEditing got called');
    this._defineSchema();
    this._defineConverters();

    this.editor.commands.add(
      'insertStructuredField',
      new InsertStructuredFieldCommand(this.editor)
    );
  }

  _defineSchema() {

    const schema = this.editor.model.schema;
    schema.register('StructuredField', {
      isObject: true,
      isInline: true,
      isLimit: false,
      allowWhere: '$text',
      //allowContentOf: '$text',
      //allowAttributesOf: '$text',
      allowAttributes: [ 'name' ]
    });
    schema.register('StructuredFieldContent', {
      // Cannot be split or left by the caret.
      isLimit: false,
      isInline: true,
      allowIn: 'StructuredField',
      // Allow content which is allowed in the root (e.g. paragraphs).
      allowContentOf: '$root',
    });
  }

  // -----------------

  _defineConverters() {
    const conversion = this.editor.conversion;

    //  <StructuredField> converters
    conversion.for('upcast').elementToElement({
      model: 'StructuredField',
      view: {
        name: 'algotec-sf',
        classes: ['structured-field']
      },
    });
    conversion.for('dataDowncast').elementToElement({
      model: 'StructuredField',
      view: {
        name: 'algotec-sf',
        classes: 'structured-field',
      },
    });
    conversion.for('editingDowncast').elementToElement({
      model: 'StructuredField',
      view: (modelElement, {writer: viewWriter}) => {
        const section = viewWriter.createContainerElement('algotec-sf', {
          class: 'structured-field'
        });
        return toWidget(section, viewWriter, {label: 'SF widget'})
      },
    });

    // -----------------

    // sf content
    conversion.for('upcast').elementToElement({
      model: 'StructuredFieldContent',
      view: {
        name: 'span',
        classes: 'structured-field-content'
      }
    });
    conversion.for('dataDowncast').elementToElement({
      model: 'StructuredFieldContent',
      view: {
        name: 'span',
        classes: 'structured-field-content'
      }
    });
    conversion.for('editingDowncast').elementToElement({
      model: 'StructuredFieldContent',
      view: (modelElement, {writer: viewWriter}) => {
        // Note: You use a more specialized createEditableElement() method here.
        const div = viewWriter.createEditableElement('span', {class: 'structured-field-content'});

        return toWidgetEditable(div, viewWriter);
      }
    });
    // -----------
  }
}
