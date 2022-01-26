import {Plugin, Editor} from '@ckeditor/ckeditor5-core';
import {InsertStructuredFieldMarkerCommand} from './structured-field-marker-insert.command';
export class StructuredFieldMarkerEditing extends Plugin {
  editor: Editor;

  static get pluginName() {
    return 'StructuredFieldMarkerEditing';
  }


  init() {
    console.log('StructuredFieldMarkerEditing got called');
    //this.editor.model.schema.extend( '$text', { allowAttributes: 'highlight', class: "algotec-sf-inline" } );

    //this._defineSchema();

    //this.editor.conversion.attributeToElement( _buildDefinition() );
    //this._defineConverters(); // ADD THIS


    this.editor.commands.add(
        'insertStructuredFieldMarker',
        new InsertStructuredFieldMarkerCommand(this.editor)
    );
  }

  _defineSchema() {
    const schema = this.editor.model.schema;

    schema.register('StructuredFieldMarker', {
      isObject: true,
      isInline: true,
      isLimit: true,
      allowWhere: '$text',
      //allowContentOf: '$text',
      //allowAttributesOf: '$text',
      allowAttributes: ['name', 'class'],
      inheritAllFrom: "$text"
    });
  }


}
