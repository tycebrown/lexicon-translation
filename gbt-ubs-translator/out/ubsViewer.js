"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const vscode = __importStar(require("vscode"));
class UbsViewerProvider {
    context;
    constructor(context) {
        this.context = context;
    }
    async resolveCustomTextEditor(document, webviewPanel, token) {
        const scripts = [
            webviewPanel.webview.asWebviewUri(vscode.Uri.joinPath(this.context.extensionUri, "src", "entryParser.js")),
            webviewPanel.webview.asWebviewUri(vscode.Uri.joinPath(this.context.extensionUri, "src", "ubsViewerScript.js")),
        ];
        webviewPanel.webview.options = { enableScripts: true };
        webviewPanel.webview.html = /*html*/ `
        <!DOCTYPE html>
        <html>
        <head>
          <script src="https://cdn.jsdelivr.net/npm/@squaresapp/rawjs/raw.min.js"></script>
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
exports.default = UbsViewerProvider;
//# sourceMappingURL=ubsViewer.js.map