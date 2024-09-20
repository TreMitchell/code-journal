"use strict";
const $form = document.querySelector('#entry-form');
const $urlPreview = document.querySelector('#url-preview');
const $photoUrlInput = document.querySelector('#photo-url');
if (!$form)
    throw new Error('$form query failed!');
if (!$urlPreview)
    throw new Error('$urlPreview query failed!');
if (!$photoUrlInput)
    throw new Error('$photoUrlInput query failed!');
$photoUrlInput.addEventListener('input', function (event) {
    const target = event.target;
    $urlPreview.src = target.value || 'images/placeholder-image-square.jpg';
});
$form.addEventListener('submit', function (event) {
    event.preventDefault();
    const newEntry = {
        entryId: data.nextEntryId,
        title: $form.elements.namedItem('title').value,
        photoUrl: $photoUrlInput.value,
        content: $form.elements.namedItem('content').value,
    };
    data.nextEntryId++;
    data.entries.unshift(newEntry);
    writeData();
    $form.reset();
    $urlPreview.src = 'images/placeholder-image-square.jpg';
});
function renderEntry(entry) {
    const $li = document.createElement('li');
    $li.classList.add('row');
    const $imgWrapper = document.createElement('img');
    $imgWrapper.classList.add('column-half');
    const $img = document.createElement('img');
    $img.src = entry.photoUrl;
    $img.alt = `${entry.title}`;
    $img.classList.add('url-preview');
    const $div = document.createElement('div');
    $div.classList.add('column-half');
    const $h2 = document.createElement('h2');
    $h2.textContent = entry.title;
    const $p = document.createElement('p');
    $p.textContent = entry.content;
    $li.appendChild($imgWrapper);
    $li.appendChild($div);
    $div.appendChild($h2);
    $div.appendChild($p);
}
