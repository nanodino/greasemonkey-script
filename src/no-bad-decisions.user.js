// ==UserScript==
// @name         No Bad Decisions
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Ask for confirmation before merging pull requests after 3 PM
// @author       Your Name
// @match        *://*/*  // Adjust this to match the specific site you want to run the script on
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    function askForConfirmation() {
        return confirm('Are you going to stick around to monitor these changes? It is after 3pm');
    }

    function mergePullRequest(event) {
        if (confirm('Are you sure you don\'t want to SQUASH and merge here?')) {
            if (isAfter3pm() && !askForConfirmation()) {
                event.preventDefault();
                console.log('Pull request not merged');
            } else {
                console.log('Pull request merged');
            }
        } else {
            event.preventDefault();
            console.log('Pull request not merged');
        }
    }

    function getPullRequestTime() {
        return new Date().getHours();
    }

    function isAfter3pm() {
        return getPullRequestTime() >= 15;
    }

    function main() {
        const mergeButton = document.querySelector('#partial-pull-merging > div.merge-pr.js-merge-pr.js-details-container.Details.is-merging.is-updating-via-merge > div > div > div > div > div.merge-message > div > div > button.merge-box-button.btn-group-merge.rounded-left-2.btn.btn-primary.BtnGroup-item.js-details-target.hx_create-pr-button');
        const squashButton = document.querySelector('#partial-pull-merging > div.merge-pr.js-merge-pr.js-details-container.Details.is-squashing.is-updating-via-merge > div.js-merge-message-container > div > div > div > div.merge-message > div > div > button.merge-box-button.btn-group-squash.rounded-left-2.btn.btn-primary.BtnGroup-item.js-details-target.hx_create-pr-button');

        if (mergeButton) {
            mergeButton.removeEventListener('click', mergePullRequest);
            mergeButton.addEventListener('click', mergePullRequest);
        }
        if (squashButton && isAfter3pm()) {
            squashButton.removeEventListener('click', mergePullRequest);
            squashButton.addEventListener('click', mergePullRequest);
        } else {
            console.log('Pull request not merged');
        }
    }

    const observer = new MutationObserver(function(mutationsList) {
        for (let mutation of mutationsList) {
            if (mutation.addedNodes.length) {
                main();
            }
        }
    });

    observer.observe(document.body, { childList: true, subtree: true });
})();