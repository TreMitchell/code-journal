const $form = document.querySelector('#entry-form') as HTMLFormElement;
const $urlPreview = document.querySelector('#url-preview') as HTMLImageElement;
const $photoUrlInput = document.querySelector('#photo-url') as HTMLInputElement;

if (!$form) throw new Error('$form query failed!');
if (!$urlPreview) throw new Error('$urlPreview query failed!');
if (!$photoUrlInput) throw new Error('$photoUrlInput query failed!');

$photoUrlInput.addEventListener('input', function (event: Event) {
  const target = event.target as HTMLInputElement;
  $urlPreview.src = target.value || 'images/placeholder-image-square.jpg';
});

$form.addEventListener('submit', function (event: Event) {
  event.preventDefault();

  const newEntry = {
    entryId: data.nextEntryId,
    title: ($form.elements.namedItem('title') as HTMLInputElement).value,
    photoUrl: $photoUrlInput.value,
    content: ($form.elements.namedItem('content') as HTMLTextAreaElement).value,
  };

  data.nextEntryId++;
  data.entries.unshift(newEntry);

  writeData();

  $form.reset();
  $urlPreview.src = 'images/placeholder-image-square.jpg';
});

function renderEntry(entry: JournalEntry): HTMLElement {
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

  return $li;
}

document.addEventListener('DOMContentLoaded', function () {
  const $ul = document.querySelector('ul');
  if (!$ul) throw new Error('$ul query has failed!');

  data.entries.forEach((entry) => {
    const entryElement = renderEntry(entry);
    $ul.appendChild(entryElement);
  });
});
