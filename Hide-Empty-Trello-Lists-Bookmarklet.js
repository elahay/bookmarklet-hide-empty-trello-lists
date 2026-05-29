// After making changes, run `./updateDoc.js` to update the documentation (docs/index.html)
// with this script minified.
//
// Important Notes:
//   1. Do not use double-quotes anywhere within this script
//   2. // comments will be removed
//   3. /* */ comments will also be removed
//   4. End all statements with ;

/* Source: https://baincd.github.io/bookmarklet-hide-empty-trello-lists */

const whitelistedColumns = [
    'In For Testing',
    'Ready for Testing',
    'Testing In Progress',
    'Waiting on PRs or Deploys to Staging',
    'In Progress',
    'This Week',
];
function hasVisibleCards(list) {
    let listCards = list.querySelectorAll('li[data-testid=list-card]');
    for (let i = 0; i < listCards.length; i++) {
        if (!listCards[i].attributes['hidden']) {
            return true;
        }
    }
    return false;
}

function isResizeElement(el) {
    return (el && el.classList && el.classList.contains('resize-element'));
}

function getListName(listElement) {
    if (listElement) {
        const titleElement = listElement.querySelector('h2[data-testid=list-name]');
        return titleElement.textContent || '';
    } else {
        return '';
    }
}

function displayEmptyLists(displayEmptyListsEnabled) {
    let lists = document.getElementById('board').querySelectorAll('li[data-list-id]');

    for (let i = 0; i < lists.length; i++) {
        const list = lists[i];
        const listName = getListName(list);
        if (whitelistedColumns.some(colName => listName.includes(colName))) {
            continue;
        }
        const listSibling = list.nextSibling;
        const displayValue = (displayEmptyListsEnabled || hasVisibleCards(lists[i]) ? 'inline-block' : 'none');

        list.style.display = displayValue;

        // Resize Element may be added by Trello Super Powers browser extension
        if (isResizeElement(listSibling)) {
            listSibling.style.display = displayValue;
        }
    }
}

if (window.HIDE_EMPTY_TRELLO_LISTS_BOOKMARKLET_INTERVAL === undefined) {
    displayEmptyLists(false);
    window.HIDE_EMPTY_TRELLO_LISTS_BOOKMARKLET_INTERVAL = setInterval(displayEmptyLists, 500);
} else {
    clearInterval(window.HIDE_EMPTY_TRELLO_LISTS_BOOKMARKLET_INTERVAL);
    window.HIDE_EMPTY_TRELLO_LISTS_BOOKMARKLET_INTERVAL = undefined;
    displayEmptyLists(true);
}
