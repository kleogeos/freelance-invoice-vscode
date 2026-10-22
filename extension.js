"use strict";

const vscode = require("vscode");
const path = require("path");
const fs = require("fs");
const { render } = require("./render");

function renderActiveJson() {
  const editor = vscode.window.activeTextEditor;
  if (!editor) {
    vscode.window.showErrorMessage("Open a JSON invoice file first.");
    return null;
  }
  let data;
  try {
    data = JSON.parse(editor.document.getText());
  } catch (e) {
    vscode.window.showErrorMessage(`Invalid JSON: ${e.message}`);
    return null;
  }
  if (!Array.isArray(data.items)) {
    vscode.window.showErrorMessage(
      'Expected an "items" array, e.g. [{"description":"...","qty":1,"rate":100}]'
    );
    return null;
  }
  try {
    return { html: render(data), document: editor.document };
  } catch (e) {
    vscode.window.showErrorMessage(`Could not render invoice: ${e.message}`);
    return null;
  }
}

function activate(context) {
  context.subscriptions.push(
    vscode.commands.registerCommand("freelanceInvoicePreview.preview", () => {
      const result = renderActiveJson();
      if (!result) return;
      const panel = vscode.window.createWebviewPanel(
        "freelanceInvoicePreview",
        "Invoice Preview",
        vscode.ViewColumn.Beside,
        { enableScripts: false }
      );
      panel.webview.html = result.html;
    }),

    vscode.commands.registerCommand("freelanceInvoicePreview.exportHtml", async () => {
      const result = renderActiveJson();
      if (!result) return;
      const dir = path.dirname(result.document.uri.fsPath);
      const base = path.basename(result.document.uri.fsPath, path.extname(result.document.uri.fsPath));
      const outPath = path.join(dir, `${base}.html`);
      fs.writeFileSync(outPath, result.html, "utf8");
      const choice = await vscode.window.showInformationMessage(
        `Invoice exported to ${path.basename(outPath)}`,
        "Open"
      );
      if (choice === "Open") {
        vscode.env.openExternal(vscode.Uri.file(outPath));
      }
    })
  );
}

function deactivate() {}

module.exports = { activate, deactivate };
