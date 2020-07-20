import React from "react";
import MonacoEditor from "react-monaco-editor";

import { resolveMonacoLang, updateFileCode } from "../../../../../store/files";

import { ParsleyTokens } from "./parsley-tokens";
import { ParsleyTheme } from "./parsley-tokens";

/**
 * We memoize this component because we need to short circuit the redux->react->component update cycle
 * This is done for performance reasons. Constantly re-rendering slows down the editor typing experience.
 * But we still want to broadcast store updates `onChange`
 */
export const MemoizedEditor = React.memo(function MemoizedEditor(props) {
  return (
    <MonacoEditor
      theme="vs-dark"
      value={props.code || ""}
      language={resolveMonacoLang(props.fileName)}
      options={{
        selectOnLineNumbers: true,
        wordWrap: "on"
      }}
      onChange={newValue => {
        props.dispatch(updateFileCode(props.fileZUID, props.status, newValue));
      }}
      editorDidMount={(editor, monaco) => {
        // Line number linking feature
        if (Number(props.lineNumber)) {
          editor.revealLineInCenter(Number(props.lineNumber));
          editor.setSelection(
            new monaco.Selection(
              Number(props.lineNumber),
              0,
              Number(props.lineNumber),
              1000
            )
          );
        } else {
          editor.setSelection(new monaco.Selection(1, 0, 1, 0));
        }

        // Register Parsley syntax and theme
        monaco.languages.register({
          id: "parsley"
        });
        monaco.languages.setMonarchTokensProvider("parsley", {
          tokenizer: ParsleyTokens
        });

        /**
         * FIXME: This doesn't work with a single monaco instance
         * as it appends new properties everytime this code is hit
         * causing duplicate and incorrect model fields.
         */

        // // TODO Switch to parsley once tokens are completed
        // monaco.languages.registerCompletionItemProvider("handlebars", {
        //   triggerCharacters: ["."],
        //   provideCompletionItems: (model, position, token) => {
        //     return {
        //       suggestions: props.fields.map(field => {
        //         return {
        //           label: field.name,
        //           kind: monaco.languages.CompletionItemKind.Property,
        //           detail: field.label,
        //           insertText: field.name
        //         };
        //       })
        //     };
        //   }
        // });

        monaco.editor.defineTheme("parsleyDark", {
          base: "vs-dark", // can also be vs-dark or hc-black
          inherit: true, // can also be false to completely replace the builtin rules
          rules: ParsleyTheme
        });
        editor.updateOptions({
          theme: "parsleyDark"
        });
      }}
    />
  );
});