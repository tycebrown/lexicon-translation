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
    webviewPanel.webview.options = { enableScripts: true };
    webviewPanel.webview.html = await this.buildHTML(webviewPanel);
    webviewPanel.webview.postMessage({
      messageType: "updateDocument",
      documentContent: document.getText(),
    });
  }

  private async buildHTML(webviewPanel: vscode.WebviewPanel): Promise<string> {
    const scriptUri = webviewPanel.webview.asWebviewUri(
      vscode.Uri.joinPath(
        this.context.extensionUri,
        "src",
        "ubsTranslatorScript.js"
      )
    );
    return /*html*/ `
        <!DOCTYPE html>
        <html>
        <head>
          <script defer src="${scriptUri}"></script>
        </head>
        <body>
          <div id="main"></div>
        </body>
        </html>`;
  }
}
