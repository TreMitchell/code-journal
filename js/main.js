'use strict';
const dataModel = {
  entries: [],
  nextEntryId: 1,
};
const $form = document.querySelector('#entry-form');
const $urlPreview = document.querySelector('#url-preview');
const $photoUrlInput = document.querySelector('#photo-url');
if (!$form) throw new Error('$form query failed!');
if (!$urlPreview) throw new Error('$urlPreview query failed!');
if (!$photoUrlInput) throw new Error('$photoUrlInput query failed!');
$photoUrlInput.addEventListener('input', function (event) {
  const target = event.target;
  $urlPreview.src = target.value || 'images/placeholder-image-square.jpg';
});
$form.addEventListener('submit', function (event) {
  event.preventDefault();
  const newEntry = {
    entryId: dataModel.nextEntryId,
    title: $form.elements.namedItem('title').value,
    photoUrl: $photoUrlInput.value,
    content: $form.elements.namedItem('content').value,
  };
  dataModel.nextEntryId++;
  dataModel.entries.unshift(newEntry);
  saveData(data);
  $form.reset();
  $urlPreview.src = 'images/placeholder-image-square.jpg';
});
