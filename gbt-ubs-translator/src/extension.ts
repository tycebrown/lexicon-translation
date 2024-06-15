// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from "vscode";

import UbsTranslatorProvider from "./ubsTranslator";
import UbsViewerProvider from "./ubsViewer";

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
  const ubsTranslatorRegistration = vscode.window.registerCustomEditorProvider(
    "gbt.ubsTranslator",
    new UbsTranslatorProvider(context)
  );
  context.subscriptions.push(ubsTranslatorRegistration);

  const ubsViewerRegistration = vscode.window.registerCustomEditorProvider(
    "gbt.ubsViewer",
    new UbsViewerProvider(context)
  );
  context.subscriptions.push(ubsViewerRegistration);
}

// This method is called when your extension is deactivated
export function deactivate() {}
