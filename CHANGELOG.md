# Changelog

All notable changes to the "CyberViewMD" project will be documented in this file.

## [0.1.0] - 2023-09-03
### Added
- Initialized the project repository, establishing a basic file hierarchy.
- Configured the project to be built as an Electron application.
- Integrated Bootstrap 5 for UI design and styling.
- Implemented functionality to render content from Markdown files.
- Introduced a dark theme as the default visual setting.
- Created essential documentation files: README.md, CONTRIBUTING.md, and CHANGELOG.md.
- Included a representative screenshot of the application in `screenshot.png`.

### Changed
- Updated the core application files to support Markdown file previewing:
  - Modified `index.html` to include a dedicated section for rendered Markdown.
  - Revised `main.js` to handle file opening and reading Markdown files.
  - Updated `renderer.js` to convert Markdown content to HTML for display.
 to your `CHANGELOG.md` file.
- Enhanced `main.js` to parse and exclude Front-Matter from Markdown files. This ensures that only the actual content is rendered, improving the user experience.
