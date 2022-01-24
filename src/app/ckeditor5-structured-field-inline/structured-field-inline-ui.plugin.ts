import {Plugin} from '@ckeditor/ckeditor5-core';
import {ButtonView} from '@ckeditor/ckeditor5-ui';
import './theme/structured-field.plugin.css';
import {CKEditor5} from "@ckeditor/ckeditor5-angular";
import Editor = CKEditor5.Editor;

export  class StructuredFieldInlineUI extends Plugin {
    static get pluginName() {
        return 'StructuredFieldInlineUI';
    }
    constructor(protected editor:Editor) {
      super(editor);
    }

    init() {
        console.log('StructuredFieldInlineUI got called');
        const t = this.editor.t;
        const editor = this.editor;


        editor.ui.componentFactory.add('StructuredFieldInline', (local) => {
            const command = editor.commands.get('insertStructuredFieldInline');
            const buttonView = new ButtonView(local);

            buttonView.set({
                label: t('Structured Field Inline'),
                withText: true,
                toolTip: true,
            });
            // Bind the state of the button to the command.
            buttonView.bind('isOn', 'isEnabled').to(command, 'value', 'isEnabled');

            // Execute the command when the button is clicked (executed).
            this.listenTo(buttonView, 'execute', () =>
                editor.execute('insertStructuredFieldInline')
            );

            return buttonView;
        });
    }

    listenTo(buttonView: any, arg1: string, arg2: () => any) {
        return super.listenTo(buttonView, arg1, arg2)
    }
}
