# Changelog

All notable changes to the "CyberViewMD" project will be documented in this file.

## [0.1.0] - 2023-09-03
### Added
- Initialized the project repository, establishing a basic file hierarchy.
- Configured the project to be built as an Electron application.
- Integrated Bootstrap 5 for UI design and styling.
- Implemented functionality to render content from Markdown files.
- Introduced a dark theme as the default visual setting.
- Introduced a top bar menu with two custom actions:
  - "Open File": Opens a dialog to select a Markdown file for previewing.
  - "Close File": Clears the rendered Markdown content from the main window.
- Implemented keyboard shortcuts for enhanced usability:
  - "Open File": Key combination `CmdOrCtrl+O` triggers the file dialog for selecting a Markdown file.
  - "Close File": Key combination `CmdOrCtrl+W` clears the rendered Markdown content from the main window.
- Retained standard menu items ("File", "Edit", "View", "Window") alongside custom actions for a more comprehensive user interface.
- Implemented a feature to toggle the visibility of the main title `<h1 class="text-center">CyberViewMD: Markdown Previewer</h1>` based on the content state in the main window.
  - The title is hidden when a Markdown file is displayed.
  - The title reappears when the content in the main window is cleared.
- Created essential documentation files: README.md, CONTRIBUTING.md, and CHANGELOG.md.
- Included a representative screenshot of the application in `screenshot.png`.

### Changed
- Updated the core application files to support Markdown file previewing:
  - Modified `index.html` to include a dedicated section for rendered Markdown.
  - Revised `main.js` to handle file opening and reading Markdown files.
  - Updated `renderer.js` to convert Markdown content to HTML for display.
 to your `CHANGELOG.md` file.
- Enhanced `main.js` to parse and exclude Front-Matter from Markdown files. This ensures that only the actual content is rendered, improving the user experience.
- Code formatting improvement.
- Code rewritten to make it more efficient and maintainable
