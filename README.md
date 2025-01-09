# Greasemonkey Script for Pull Request Confirmation

This project contains a Greasemonkey script that helps manage pull requests by asking for confirmation before merging. It checks if the current time is after 3 PM and prompts the user accordingly.

## Installation

1. Install the Greasemonkey extension for your browser.
2. Download the `no-bad-decisions.user.js` file from the `src` directory.
3. Open the Greasemonkey dashboard and click on "Install a new script."
4. Paste the contents of `no-bad-decisions.user.js` into the editor and save.

## Usage

Once the script is installed, it will automatically run on supported pages. When you attempt to merge a pull request after 3 PM, you will receive a confirmation prompt. If you choose not to proceed, the pull request will not be merged.

## Features

- Prompts for confirmation before merging pull requests.
- Checks if the current time is after 3 PM.
- Listens for DOM changes to attach event listeners to merge and squash buttons.

## License

This project is licensed under the MIT License.