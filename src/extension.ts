import * as vscode from "vscode";
import * as fs from "fs";
import * as path from "path";

function traverseFolderStructure(
  rootPath: string,
  indent: string = "",
  ignoredItems: string[] = []
): string {
  const items = fs.readdirSync(rootPath);

  let structureText = "";

  for (const item of items) {
    if (ignoredItems.includes(item)) {
      continue; // Skip ignored items
    }

    const fullPath = path.join(rootPath, item);
    const stats = fs.statSync(fullPath);

    structureText += indent + item + (stats.isDirectory() ? "/" : "") + "\n";

    if (stats.isDirectory()) {
      structureText += traverseFolderStructure(
        fullPath,
        indent + "  ",
        ignoredItems
      );
    }
  }

  return structureText;
}

function readIgnoreFile(rootPath: string): string[] {
  const ignoreFilePath = path.join(rootPath, ".structignore");
  try {
    const ignoreFileContents = fs.readFileSync(ignoreFilePath, "utf-8");
    return ignoreFileContents.split("\n").map((line) => line.trim());
  } catch (error) {
    return [];
  }
}

export function activate(context: vscode.ExtensionContext) {
  const statusBarItem = vscode.window.createStatusBarItem(
    vscode.StatusBarAlignment.Left,
    100
  );
  statusBarItem.text = "$(file-directory) Copy FS";
  statusBarItem.command = "structurize.copyFolders";
  statusBarItem.show();

  const disposable = vscode.commands.registerCommand(
    "structurize.copyFolders",
    async () => {
      const workspaceFolders = vscode.workspace.workspaceFolders;
      if (workspaceFolders && workspaceFolders.length > 0) {
        const rootPath = workspaceFolders[0].uri.fsPath;

        // Read ignore file and get ignored items
        const ignoredItems = readIgnoreFile(rootPath);

        // Generate the folder structure text while ignoring specified items
        const structureText = traverseFolderStructure(
          rootPath,
          "",
          ignoredItems
        );

        try {
          await vscode.env.clipboard.writeText(structureText);
          vscode.window.showInformationMessage(
            "Folder structure copied to clipboard."
          );

          // Open a new untitled text document with the folder structure text
          const doc = await vscode.workspace.openTextDocument({
            content: structureText,
          });
          await vscode.window.showTextDocument(doc);
        } catch (error: unknown) {
          if (error instanceof Error) {
            vscode.window.showErrorMessage(
              "Error copying folder structure to clipboard: " + error.message
            );
          } else if (error && typeof error === "object" && "message" in error) {
            const errorMessage = (error as { message: string }).message;
            vscode.window.showErrorMessage(
              "Error copying folder structure to clipboard: " + errorMessage
            );
          } else {
            vscode.window.showErrorMessage(
              "An unknown error occurred while copying folder structure."
            );
          }
        }
      } else {
        vscode.window.showErrorMessage("No workspace folder found.");
      }
    }
  );

  context.subscriptions.push(disposable);
}
