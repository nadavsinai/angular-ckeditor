import {Plugin} from '@ckeditor/ckeditor5-core';
import ButtonView from '@ckeditor/ckeditor5-ui/src/button/buttonview';
// import * as styles from './structured-field.plugin.css';
import {CKEditor5} from "@ckeditor/ckeditor5-angular";
import Editor = CKEditor5.Editor;

export default class StructuredFieldUI extends Plugin {
    static get pluginName() {
        return 'StructuredFieldUI';
    }
    constructor(protected editor:Editor) {
      super(editor);
    }

    init() {
        console.log('StructuredFieldUI got called');
        const t = this.editor.t;
        const editor = this.editor;
        // css
        // const styleElem = document.createElement('style');
        // styleElem.innerHTML = Styles;
        // document.head.append(styleElem);

        editor.ui.componentFactory.add('StructuredField', (local) => {
            const command = editor.commands.get('insertStructuredField');
            const buttonView = new ButtonView(local);

            buttonView.set({
                label: t('Structured Field'),
                withText: true,
                toolTip: true,
            });
            // Bind the state of the button to the command.
            buttonView.bind('isOn', 'isEnabled').to(command, 'value', 'isEnabled');

            // Execute the command when the button is clicked (executed).
            this.listenTo(buttonView, 'execute', () =>
                editor.execute('insertStructuredField')
            );

            return buttonView;
        });
    }

    listenTo(buttonView: any, arg1: string, arg2: () => any) {
        return super.listenTo(buttonView, arg1, arg2)
    }
}
