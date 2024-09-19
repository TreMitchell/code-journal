"use strict";
const defaultData = {
    view: 'entry-form',
    entries: [],
    editing: null,
    nextEntryId: 1,
};
function saveData(data) {
    localStorage.setItem('journalData', JSON.stringify(data));
}
function loadData() {
    const jsonData = localStorage.getItem('journalData');
    return jsonData ? JSON.parse(jsonData) : defaultData;
}
const data = loadData();
function addNewEntry(entry) {
    const newEntry = {
        entryId: data.nextEntryId,
        title: entry.title,
        photoUrl: entry.photoUrl,
        content: entry.content,
    };
    data.nextEntryId++;
    data.entries.unshift(newEntry);
    saveData(data);
}
function changeView(newView) {
    data.view = newView;
    saveData(data);
}
