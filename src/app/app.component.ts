import {Component} from '@angular/core';
import ClassicEditor from './ckeditor';

@Component({
    selector: 'app-root',
    template: `
        <ckeditor [editor]="editor" [config]="config" [data]="data"></ckeditor>`,
    styles: [`p {
        font-family: Lato;
    }

    ::ng-deep .ck-editor__editable {
        min-height: 200px !important;
    }`],
})
export class AppComponent {
    editor = ClassicEditor;
    data: any = `<p>Hello, world!!1!</p>`;
    config = {
        toolbar: [
            'StructuredField',
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
            'StructuredField',
        ],
        language: 'id',
        image: {
            toolbar: ['imageTextAlternative', 'imageStyle:full', 'imageStyle:side'],
        },
    };
}
