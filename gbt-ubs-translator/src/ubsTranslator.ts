import * as vscode from "vscode";

export default class UbsTranslatorProvider
  implements vscode.CustomTextEditorProvider
{
  constructor(private readonly context: vscode.ExtensionContext) {}
  public async resolveCustomTextEditor(
    document: vscode.TextDocument,
    webviewPanel: vscode.WebviewPanel,
    token: vscode.CancellationToken
  ): Promise<void> {
    const scripts = [
      webviewPanel.webview.asWebviewUri(
        vscode.Uri.joinPath(
          this.context.extensionUri,
          "src",
          "ubsTranslatorScript.js"
        )
      ),
      webviewPanel.webview.asWebviewUri(
        vscode.Uri.joinPath(this.context.extensionUri, "src", "entryParser.js")
      ),
    ];

    webviewPanel.webview.options = { enableScripts: true };
    webviewPanel.webview.html = /*html*/ `
        <!DOCTYPE html>
        <html>
        <head>
          ${scripts
            .map((uri) => /*html*/ `<script defer src="${uri}"></script>`)
            .join("\n")}
        </head>
        <body>
          <div id="main"></div>
        </body>
        </html>`;

    webviewPanel.webview.postMessage({
      messageType: "updateDocument",
      documentContent: document.getText(),
    });
  }
}
