'use strict';
const dataModel = {
  entries: [],
  nextEntryId: 1,
};
const $form = document.querySelector('#journal-entry-form');
const $urlPreview = document.querySelector('#photo-preview');
const $photoUrlInput = document.querySelector('#photo-url');
$photoUrlInput.addEventListener('input', function (event) {
  const target = event.target;
  $urlPreview.src = target.value || 'images/placeholder-image-square.jpg';
});
$form.addEventListener('submit', function (event) {
  event.preventDefault();
  const newEntry = {
    entryId: dataModel.nextEntryId,
    title: $form.elements.namedItem('title').value,
    photoUrl: $form.elements.namedItem('photo-url').value,
    content: $form.elements.namedItem('content').value,
  };
  dataModel.nextEntryId++;
  dataModel.entries.unshift(newEntry);
  $form.reset();
  $urlPreview.src = 'images/placeholder-image-square.jpg';
  console.log('New entry added:', newEntry);
});
