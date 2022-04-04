import {Plugin, Editor} from '@ckeditor/ckeditor5-core';
import {InsertStructuredFieldMarkerCommand} from './structured-field-marker-insert.command';
import {InsertStructuredFieldCommand} from "../ckeditor5-structured-field/structured-field-insert.command";
import {SfMarkerService} from "./sf-marker.service";
export class StructuredFieldMarkerEditing extends Plugin {
  editor: Editor;

  static get pluginName() {
    return 'StructuredFieldMarkerEditing';
  }


  init() {
    console.log('StructuredFieldMarkerEditing got called');
    //this.editor.model.schema.extend( '$text', { allowAttributes: 'highlight', class: "algotec-sf-inline" } );

    this._defineSchema();

    //this.editor.conversion.attributeToElement( _buildDefinition() );
    this._defineConverters(); // ADD THIS


    this.editor.commands.add(
        'insertStructuredFieldMarker',
        new InsertStructuredFieldMarkerCommand(this.editor)
    );
  }

  _defineSchema() {
    const schema = this.editor.model.schema;

    schema.register('StructuredFieldMarkerData', {
      isObject: true,
      isContent: false,
      isInline: false,
      isLimit: true,
      allowWhere: '$root',
      //allowContentOf: '$text',
      //allowAttributesOf: '$text',
      //allowAttributes: ['name', 'class'],
      inheritAllFrom: "$block"
    });

    schema.register('StructuredFieldMarkerStart', {
      isObject: true,
      isContent: false,
      isInline: true,
      isLimit: true,
      allowWhere: '$text',
      allowAttributes: ['name', 'class'],
      inheritAllFrom: "$text"
    });

    schema.register('StructuredFieldMarkerEnd', {
      isObject: true,
      isInline: true,
      isLimit: true,
      allowWhere: '$text',
      allowAttributes: ['name', 'class'],
      inheritAllFrom: "$text"
    });

  }

  _defineConverters(){
    const { editor } = this;

    // Setup the marker highlighting conversion.
    editor.conversion.for( 'editingDowncast' ).markerToHighlight( {
      model: 'sf',
      // view: {classes: 'marker-sf'},
      // converterPriority: 'low'
      view: ( { markerName } ) => {
        const [ , id ] = markerName.split( ':' );

        // Marker removal from the view has a bug: https://github.com/ckeditor/ckeditor5/issues/7499
        // A minimal option is to return a new object for each converted marker...
        return {
          name: 'span',
          classes: [ 'sf-marker-highlight' ],
          // attributes: {
          //   // ...however, adding a unique attribute should be future-proof..
          //   'sf-marker-temp-id': `${id}:${Math.floor(Math.random() * 100)}`
          // }
        };
      }
    } );

    editor.conversion.for( 'dataDowncast' ).markerToData( {
      model: 'sf',
      view: markerName => ({
        group: 'sf', // sf:id0
        name: markerName.substr(3),
        data: (editor.model.markers.get(markerName) as any)?.data
      })
    });

    editor.conversion.for( 'upcast' ).dataToMarker( {
      view: 'sf',
      model: markerName => 'sf:' + markerName,


    });

    editor.conversion.for( 'dataDowncast' ).elementToElement( {
      model: 'sf',
      view:  (marker:any) => {
        data: SfMarkerService.getMarkerData(marker);
      }
    })

    editor.conversion.for( 'upcast' ).elementToElement( {
      model: 'sf',
      view:  (marker:any) => {
        data: SfMarkerService.getMarkerData(marker);
      }
    })

    // editor.conversion.for('upcast').elementToElement({
    //   model: (el, api) => {
    //
    //   },
    //   view: (element, writer) => {
    //
    //   }
    // })

    editor.conversion.elementToElement({
          model: 'StructuredFieldMarkerStart',
          view: {
            name: 'algotec-sf-start'
          }});

    editor.conversion.elementToElement({
      model: 'StructuredFieldMarkerEnd',
      view: {
        name: 'algotec-sf-end'
      }});
  }
}

// export class SfSerializer extends Plugin{
//   editor: Editor;
//   private static instance : SfSerializer;
//   // private constructor(editor: Editor) {
//   //   super(editor);
//   // }
//   public static getInstance(): SfSerializer {
//     if (!SfSerializer.instance) {
//       //SfSerializer.instance = new SfSerializer(Editor );
//       console.error('Not initialized - cannot be served as a singletone')
//     }
//     return SfSerializer.instance;
//   }
//
//   //**************
//   init() {
//     console.log('SfSerializer got called');
//     this._defineSchema();
//     this._defineConverters();
//
//     this.editor.commands.add(
//         'insertStructuredField',
//         new InsertStructuredFieldCommand(this.editor)
//     );
//   }
//
//   _defineSchema() {
//
//     const schema = this.editor.model.schema;
//     schema.register('StructuredField', {
//       isObject: true,
//       isInline: true,
//       isLimit: false,
//       allowWhere: '$block',
//     });
//   }
//
//   // -----------------
//
//   _defineConverters() {
//     const conversion = this.editor.conversion;
//
//     //  <StructuredField> converters
//     conversion.for('upcast').elementToElement({
//       model: 'StructuredField',
//       view: {
//         name: 'algotec-sf',
//         classes: ['structured-field']
//       },
//     });
//     conversion.for('dataDowncast').elementToElement({
//       model: 'StructuredField',
//       view: {
//         name: 'algotec-sf',
//         classes: 'structured-field',
//       },
//     });
//     conversion.for('editingDowncast').elementToElement({
//       model: 'StructuredField',
//       view: (modelElement, {writer: writer}) => {
//         const section = writer.createContainerElement('algotec-sf', {
//           class: 'structured-field'
//         });
//         writer.setAttribute( 'contenteditable', 'false', section );
//         writer.addClass( 'ck-widget', section );
//         writer.setCustomProperty( 'widget', true, section );
//
//         return section; //toWidget(section, viewWriter, {label: 'SF widget'})
//       },
//     });
//
//     // -----------------
//
//     // sf content
//     conversion.for('upcast').elementToElement({
//       model: 'StructuredFieldContent',
//       view: {
//         name: 'span',
//         classes: 'structured-field-content'
//       }
//     });
//     conversion.for('dataDowncast').elementToElement({
//       model: 'StructuredFieldContent',
//       view: {
//         name: 'span',
//         classes: 'structured-field-content'
//       }
//     });
//     conversion.for('editingDowncast').elementToElement({
//       model: 'StructuredFieldContent',
//       view: (modelElement, {writer: viewWriter}) => {
//         // Note: You use a more specialized createEditableElement() method here.
//         const span = viewWriter.createEditableElement('span', {class: 'structured-field-content'});
//         // Set initial contenteditable value.
//         viewWriter.setAttribute( 'contenteditable', viewWriter.document.isReadOnly ? 'false' : 'true', span );
//         viewWriter.addClass( [ 'ck-editor__editable', 'ck-editor__nested-editable' ], span );
//
//         span.on( 'change:isFocused', ( evt, property, is ) => {
//           if ( is ) {
//             viewWriter.addClass( 'ck-editor__nested-editable_focused', span );
//           } else {
//             viewWriter.removeClass( 'ck-editor__nested-editable_focused', span );
//           }
//         } );
//         return span // toWidgetEditable(div, viewWriter);
//       }
//     });
//     // -----------
//   }
//   //************
//
// }
