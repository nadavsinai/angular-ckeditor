import { Plugin } from '@ckeditor/ckeditor5-core';
import {StructuredFieldEditing} from './structured-field.editing.plugin';
import {StructuredFieldUI} from './structured-field-ui.plugin';

export  class StructuredField extends Plugin {
  static get pluginName() {
    return 'StructuredField';
  }
  static get requires() {
    return [StructuredFieldEditing, StructuredFieldUI];
  }
  init() {
    console.log('SF --- init()');
  }
}
