import {Component} from '@angular/core';
import ClassicEditor from './ckeditor';
import ClassicEditorExt from "./ckeditor";

@Component({
    selector: 'app-root',
    template: `
        <ckeditor [editor]="editor" [config]="config" [data]="data"></ckeditor>`,
    styles: [`p {
        font-family: Lato;
    }
    `],
})
export class AppComponent {
    editor = ClassicEditorExt;
    data: any = `<p>Hello, <algotec-sf-start></algotec-sf-start><sf-start name="id-0" data='{"key": "value"}'></sf-start>world<sf-end name="id-0"></sf-end><algotec-sf-end></algotec-sf-end>!!1!</p>`;
    config = {
        toolbar: [
            'undo',
            'redo',
            '|',
            'heading',
            'fontFamily',
            'fontSize',
            '|',
            'bold',
            'italic',
            'underline',
            'fontColor',
            'fontBackgroundColor',
            'highlight',
            '|',
            'StructuredField',
            '|',
            'blockQuote',
            '|',
            'StructuredFieldInline',
            'findAndReplace',
            'StructuredFieldMarker'
        ],
        language: 'id',
        image: {
            toolbar: ['imageTextAlternative', 'imageStyle:full', 'imageStyle:side'],
        },
    };
}
