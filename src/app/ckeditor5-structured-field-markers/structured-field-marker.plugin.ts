import { Plugin } from '@ckeditor/ckeditor5-core';
import {StructuredFieldMarkerEditing} from './structured-field-marker-editing.plugin';
import {StructuredFieldMarkerUI} from './structured-field-marker-ui.plugin';

export  class StructuredFieldMarker extends Plugin {
  static get pluginName() {
    return 'StructuredFieldMarker';
  }
  static get requires() {
    return [StructuredFieldMarkerEditing, StructuredFieldMarkerUI];
  }
  init() {
    console.log('SF-MARKER --- init()');
  }
}
