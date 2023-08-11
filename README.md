# Structurize - Visual Studio Code Extension

![Structurize Logo](images/logo.png)

## Overview

Structurize is a powerful Visual Studio Code extension that simplifies your workflow by enabling you to quickly copy folder structures as plain text. Whether you're sharing project structures, creating documentation, or communicating with colleagues, Structurize makes it effortless to extract and share directory hierarchies.

## Features

- Copy the entire folder structure of your project to the clipboard with just a single click.
- Exclude specific files and folders from the copied structure using a `.structignore` file.
- Open a new untitled text document with the copied folder structure text in a new tab.
- Easy-to-use status bar icon for instant access.

## Use Cases

Structurize streamlines various scenarios in your development journey:

- **Documentation**: Generate well-organized folder structure diagrams for project documentation.
- **Collaboration**: Share your project's folder hierarchy with team members quickly.
- **Code Review**: Discuss and review project structures with colleagues or mentors.
- **Chat Conversations**: Easily paste the directory layout into chats and discussions.
- **Technical Support**: Provide clearer visual context when seeking help or support.

## Getting Started

1. Install the Structurize extension from the Visual Studio Code Marketplace.
2. Open your project in Visual Studio Code.
3. Use the status bar icon or the keyboard shortcut to copy the folder structure to the clipboard.
4. Paste the copied text wherever you need it: chats, documents, or notes.
5. For advanced usage, create a `.structignore` file in your project's root to exclude specific items from the copied structure.

## Keyboard Shortcut

By default, Structurize does not bind to a keyboard shortcut. To set a custom keyboard shortcut for copying the folder structure, follow these steps:

1. Go to `File` > `Preferences` > `Keyboard Shortcuts`.
2. Search for `structurize.copyFolders` command.
3. Click on the pencil icon and enter your desired keyboard shortcut.

## .structignore File

Create a `.structignore` file in your project's root directory and list files or folders you want to exclude from the copied structure. Each entry should be on a new line.

Example `.structignore` file:

```
node_modules
dist
.vscode
```

## Feedback and Support

We welcome your feedback and suggestions. If you encounter any issues, please feel free to report them on the [GitHub repository](https://github.com/igormuba/structurize-vscode-extension).

## License

This project is licensed under the [MIT License](LICENSE).
