import {Plugin} from '@ckeditor/ckeditor5-core';
import {ButtonView} from '@ckeditor/ckeditor5-ui';
import './theme/structured-field.plugin.css';
import {EditorWithUI} from "@ckeditor/ckeditor5-core/src/editor/editorwithui";

export  class StructuredFieldUI extends Plugin {
    static get pluginName() {
        return 'StructuredFieldUI';
    }
    constructor(public editor:EditorWithUI) {
      super(editor);
    }

    init() {
        console.log('StructuredFieldUI got called');
        const t = this.editor.t;
        const editor = this.editor;


        editor.ui.componentFactory.add('StructuredField', (local) => {
            const command = editor.commands.get('insertStructuredField');
            const buttonView = new ButtonView(local);

            buttonView.set({
                label: t('Structured Field'),
                withText: true,
                toolTip: true,
            });
            // Bind the state of the button to the command.
            buttonView.bind('isOn').to(command, 'value');
            buttonView.bind( 'isEnabled').to(command, 'isEnabled');

            // Execute the command when the button is clicked (executed).
            this.listenTo(buttonView, 'execute', () =>
                editor.execute('insertStructuredField')
            );

            return buttonView;
        });
    }

}
