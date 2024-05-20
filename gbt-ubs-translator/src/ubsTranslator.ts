import * as vscode from 'vscode';

export default class UbsTranslatorProvider implements vscode.CustomTextEditorProvider {
    async resolveCustomTextEditor(document: vscode.TextDocument, webviewPanel: vscode.WebviewPanel, token: vscode.CancellationToken): Promise<void> {
        
    }
}