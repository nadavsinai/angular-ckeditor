import {Plugin,Editor} from '@ckeditor/ckeditor5-core';
import {ButtonView} from '@ckeditor/ckeditor5-ui';
import './theme/structured-field.plugin.css';
import {EditorWithUI} from "@ckeditor/ckeditor5-core/src/editor/editorwithui";

export  class StructuredFieldMarkerUI extends Plugin {
    static get pluginName() {
        return 'StructuredFieldMarkerUI';
    }
    constructor(public editor:EditorWithUI) {
        super(editor);
    }

    init() {
        console.log('StructuredFieldMarkerUI got called');
        const t = this.editor.t;
        const editor = this.editor;


        editor.ui.componentFactory.add('StructuredFieldMarker', (local) => {
            const command = editor.commands.get('insertStructuredFieldMarker');
            const buttonView = new ButtonView(local);

            buttonView.set({
                label: t('Structured Field Marker'),
                withText: true,
                toolTip: true,
            });
            // Bind the state of the button to the command.
            buttonView.bind('isOn').to(command, 'value');
            buttonView.bind( 'isEnabled').to(command, 'isEnabled');

            // Execute the command when the button is clicked (executed).
            this.listenTo(buttonView, 'execute', () =>
                editor.execute('insertStructuredFieldMarker')
            );

            return buttonView;
        });
    }

}
