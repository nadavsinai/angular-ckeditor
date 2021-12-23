import {ClassicEditor} from "@ckeditor/ckeditor5-editor-classic";
import {Essentials} from "@ckeditor/ckeditor5-essentials";
import {Autoformat} from "@ckeditor/ckeditor5-autoformat";
import {Bold, Italic} from "@ckeditor/ckeditor5-basic-styles";
import {BlockQuote} from "@ckeditor/ckeditor5-block-quote";
import {EasyImage} from "@ckeditor/ckeditor5-easy-image";
import {Heading} from "@ckeditor/ckeditor5-heading";
import {Image, ImageCaption, ImageStyle, ImageToolbar, ImageUpload} from "@ckeditor/ckeditor5-image";
import {Link} from "@ckeditor/ckeditor5-link";
import {List} from "@ckeditor/ckeditor5-list";
import {Paragraph} from "@ckeditor/ckeditor5-paragraph";
import {CloudServices} from "@ckeditor/ckeditor5-cloud-services";
import StructuredFieldPlugin from "./structured-field.plugin";
import {CKEditor5} from "@ckeditor/ckeditor5-angular";

export default class ClassicEditorExt extends ClassicEditor implements CKEditor5.EditorConstructor {
    static builtinPlugins: any[];

    create(sourceElementOrData: HTMLElement | string, config?: CKEditor5.Config): Promise<CKEditor5.Editor> {
        return super.create(sourceElementOrData, config);
    }
}

ClassicEditorExt.builtinPlugins = [
    Essentials,
    Autoformat,
    Bold,
    Italic,
    BlockQuote,
    Heading,
    Image,
    ImageCaption,
    ImageStyle,
    ImageToolbar,
    EasyImage,
    ImageUpload,
    CloudServices,
    Link,
    List,
    Paragraph,
    StructuredFieldPlugin,
];


// ClassicEditor.defaultConfig = {
//   toolbar: {
//     items: [
//       "heading",
//       "|",
//       "bold",
//       "italic",
//       "link",
//       "bulletedList",
//       "numberedList",
//       "uploadImage",
//       "blockQuote",
//       "undo",
//       "redo",
//     ],
//   },
//   image: {
//     toolbar: [
//       "imageStyle:inline",
//       "imageStyle:block",
//       "imageStyle:side",
//       "|",
//       "toggleImageCaption",
//       "imageTextAlternative",
//     ],
//   },
//   language: "en",
// };
