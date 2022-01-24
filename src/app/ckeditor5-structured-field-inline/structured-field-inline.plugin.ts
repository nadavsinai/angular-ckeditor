import { Plugin } from '@ckeditor/ckeditor5-core';
import {StructuredFieldInlineEditing} from './structured-field-inline-editing.plugin';
import {StructuredFieldInlineUI} from './structured-field-inline-ui.plugin';

export  class StructuredFieldInline extends Plugin {
  static get pluginName() {
    return 'StructuredFieldInline';
  }
  static get requires() {
    return [StructuredFieldInlineEditing, StructuredFieldInlineUI];
  }
  init() {
    console.log('SF-INLINE --- init()');
  }
}
