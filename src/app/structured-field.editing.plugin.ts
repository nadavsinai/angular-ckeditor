import {Plugin} from '@ckeditor/ckeditor5-core';
import InsertStructuredFieldCommand from './structured-field-insert.command';

import {toWidgetEditable,} from '@ckeditor/ckeditor5-widget/src/utils';
import Widget from '@ckeditor/ckeditor5-widget/src/widget';
import {CKEditor5} from "@ckeditor/ckeditor5-angular";
import Editor = CKEditor5.Editor;

export default class StructuredFieldEditing extends Plugin {
  editor:Editor;
  static get pluginName() {
    return 'StructuredFieldEditing';
  }
  static get requires() {
    return [Widget];
  }

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
      isObject: false,
      isInline: true,
      allowWhere: '$text',
      allowAttributesOf: '$text',
    });
    // schema.register('StructuredFieldContent', {
    //   // Cannot be split or left by the caret.
    //   isLimit: false,
    //   isInline: true,
    //   allowIn: 'StructuredField',

    //   // Allow content which is allowed in the root (e.g. paragraphs).
    //   allowContentOf: '$root',
    // });

    //   schema.addChildCheck( ( context, childDefinition ) => {
    //     if ( context.endsWith( 'StructuredField' ) && childDefinition.name == 'StructuredField' ) {
    //         return false;
    //     }
    // } );
  }

  // -----------------

  _defineConverters() {
    const conversion = this.editor.conversion;

    // <StructuredField> converters
    conversion.for('upcast').elementToElement({
      model: 'StructuredField',
      view: {
        name: 'algotec-sf',
        classes: 'structured-field',
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
      view: (modelElement, { writer: viewWriter }) => {
        const section = viewWriter.createEditableElement('algotec-sf', {
          class: 'structured-field',
        });

        return toWidgetEditable(section, viewWriter, {
          label: 'structured field widget',
        });
      },
    });

    // -----------------
  }
}
