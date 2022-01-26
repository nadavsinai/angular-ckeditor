import {Plugin,Editor} from '@ckeditor/ckeditor5-core';
import {InsertStructuredFieldInlineCommand} from './structured-field-inline-insert.command';

import {toWidgetEditable, toWidget, viewToModelPositionOutsideModelElement} from '@ckeditor/ckeditor5-widget';
import {Widget} from '@ckeditor/ckeditor5-widget';
import Position from '@ckeditor/ckeditor5-engine/src/model/position';
//import {viewToModelPosition} from '@ckeditor/ckeditor5-list/src/converters.js';



export class StructuredFieldInlineEditing extends Plugin {
  editor: Editor;

  static get pluginName() {
    return 'StructuredFieldInlineEditing';
  }

  // static get requires() {
  //   return [Widget];
  // }

  init() {
    console.log('StructuredFieldInlineEditing got called');
    //this._defineSchema();
    //this._defineConverters();

    //this.editor.model.schema.extend( '$text', { allowAttributes: 'highlight', class: "algotec-sf-inline" } );
    this._defineSchema();
    //this.editor.conversion.attributeToElement( _buildDefinition() );

    this._defineConverters(); // ADD THIS

    // this.editor.editing.mapper.on(
    //     'viewToModelPosition',
    //     viewToModelPositionOutsideModelElement( this.editor.model, viewElement => viewElement.hasClass( 'inline-sf' ) ));

    // this.editor.editing.mapper.on(
    //     'viewToModelPosition',
    //     (evt, data) => {
    //       if (data.viewPosition && data.viewPosition.parent && data.viewPosition.parent.parent.name === 'algotec-sf-inline') {
    //         const elmBookmark = data.mapper.toModelElement(data.viewPosition.parent.parent);
    //         data.modelPosition = new Position(elmBookmark, [0]);
    //         data.modelPosition.offset = data.viewPosition.offset;
    //         evt.stop();
    //       }
    //     }
    // );

    this.editor.commands.add(
        'insertStructuredFieldInline',
        new InsertStructuredFieldInlineCommand(this.editor)
    );
  }

  _defineSchema() {
    const schema = this.editor.model.schema;

    schema.register('StructuredFieldInline', {
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

  _defineConverters() {
    const conversion = this.editor.conversion;

    // conversion.for('upcast').elementToElement({
    //   view: { // view attribute is used for the Data layer
    //     name: 'a', // match any a-element in the Data layer
    //     attributes: {
    //       name: true // but ONLY if the a-element have a name-attribute
    //     }
    //   },
    //   model: (viewElement, { writer: modelWriter }) => { // in upcast, the Model is target schema and therefore the writer passed by the CKEditor 5 framework will be a ModelWriter
    //     const name = viewElement.getAttribute('name'); // get the value of the name-attribute in the a-element
    //     var bookmark = modelWriter.createElement('StructuredFieldInline', { name });
    //     return bookmark;
    //   }
    // });

    conversion. elementToElement({
      model: 'StructuredFieldInline',
      view: {
        name: 'span',
        classes: ['inline-sf']
      },
    });
    // conversion.for('dataDowncast').elementToElement({
    //   model: 'StructuredFieldInline',
    //   view: {
    //     name: 'algotec-sf-inline',
    //     classes: 'inline-sf',
    //   },
    // });

    // conversion.for('editingDowncast').elementToElement({
    //   model: 'StructuredFieldInline',
    //   view: (modelItem, { writer: viewWriter }) => {
    //     const elmInlineSf = viewWriter.createContainerElement('algotec-sf-inline', {class: 'inline-sf'});
    //     var txtBookmark = viewWriter.createText('-SF-');
    //     viewWriter.insert(viewWriter.createPositionAt(elmInlineSf, 0), txtBookmark);
    //     viewWriter.setCustomProperty('sf-inline-name', true, elmInlineSf);
    //     return elmInlineSf;
    //   }
    // });
  }

}



// function _buildDefinition( ) {
//   const definition = {
//     model: {
//       key: 'StructuredFieldInline',
//       values: []
//     },
//     view: {}
//   };
//   const option = {
//     model: 'structuredFieldInline',
//     class: 'algotec-sf-inline',
//     title: 'INLINE SF',
//     type: 'inline-sf'
//   };
//   definition.model.values.push(option.model);
//   definition.view[option.model] = {
//     name: 'inline-sf',
//     classes: option.class
//   };
//
//   return definition;
// }
