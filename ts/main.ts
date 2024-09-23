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
    entryId: data.editing ? data.editing.entryId : data.nextEntryId,
    title: ($form.elements.namedItem('title') as HTMLInputElement).value,
    photoUrl: $photoUrlInput.value,
    content: ($form.elements.namedItem('content') as HTMLTextAreaElement).value,
  };

  if (data.editing === null) {
    const $newEntryElement = renderEntry(newEntry);
    const $entryList = document.getElementById('entry-list');

    if ($entryList && $newEntryElement) {
      $entryList.appendChild($newEntryElement);
    }
    data.nextEntryId++;
    data.entries.unshift(newEntry);
  } else {
    const index = data.entries.findIndex(
      (entry) => entry.entryId === newEntry.entryId,
    );
    if (index !== -1) {
      data.entries[index] = newEntry;

      const $originalLi = document.querySelector(
        `li[data-entry-id="${newEntry.entryId}"]`,
      );
      const $newEntryElement = renderEntry(newEntry);

      if ($originalLi && $newEntryElement) {
        $originalLi.replaceWith($newEntryElement);
      }
    }
    const $formTitle = document.querySelector('.new-entry') as HTMLElement;
    $formTitle.textContent = 'New Entry';
  }

  toggleNoEntries();
  writeData();

  $form.reset();
  $urlPreview.src = 'images/placeholder-image-square.jpg';
  data.editing = null;
});

function renderEntry(entry: JournalEntry): HTMLElement {
  const $li = document.createElement('li');
  $li.classList.add('row');

  $li.setAttribute('data-entry-id', entry.entryId.toString());

  const $imgWrapper = document.createElement('div');
  $imgWrapper.classList.add('column-half');

  const $img = document.createElement('img');
  $img.src = entry.photoUrl;
  $img.alt = `${entry.title}`;
  $img.classList.add('url-preview');

  const $div = document.createElement('div');
  $div.classList.add('column-half');

  const $h2 = document.createElement('h2');
  $h2.classList.add('entry-title');
  $h2.textContent = entry.title;

  const $pencilIcon = document.createElement('i');
  $pencilIcon.classList.add('fas', 'fa-pencil-alt');

  const $p = document.createElement('p');
  $p.textContent = entry.content;

  $li.appendChild($imgWrapper);
  $li.appendChild($div);
  $div.appendChild($h2);
  $div.appendChild($p);
  $imgWrapper.appendChild($img);
  $h2.appendChild($pencilIcon);

  return $li;
}

document.addEventListener('DOMContentLoaded', function () {
  const validViews = ['entries', 'entry-form'] as const;
  let initialView: 'entries' | 'entry-form';

  if (validViews.includes(data.view as any)) {
    initialView = data.view as 'entries' | 'entry-form';
  } else {
    initialView = 'entries';
  }

  viewSwap(initialView);

  const $ul = document.querySelector('ul') as HTMLUListElement;
  if (!$ul) throw new Error('$ul query has failed!');

  data.entries.forEach((entry) => {
    const entryElement = renderEntry(entry);
    $ul.appendChild(entryElement);
  });
  toggleNoEntries();

  $ul.addEventListener('click', function (event: Event) {
    const target = event.target as HTMLElement;

    if (target.classList.contains('fa-pencil-alt')) {
      const $li = target.closest('li') as HTMLLIElement;
      const entryId = $li.getAttribute('data-entry-id');
      if (entryId) {
        const entry = data.entries.find(
          (e) => e.entryId === parseInt(entryId, 10),
        );
        if (entry) {
          data.editing = entry;

          ($form.elements.namedItem('title') as HTMLInputElement).value =
            entry.title;
          $photoUrlInput.value = entry.photoUrl;
          $urlPreview.src =
            entry.photoUrl || 'images/placeholder-image-square.jpg';
          ($form.elements.namedItem('content') as HTMLTextAreaElement).value =
            entry.content;

          const $formTitle = document.querySelector(
            '.new-entry',
          ) as HTMLElement;
          if ($formTitle) {
            $formTitle.textContent = 'New Entry';
          } else {
            console.error('Form title element not found!');
          }

          viewSwap('entry-form');
        }
      }
    }
  });
});

function toggleNoEntries(): void {
  const $noEntries = document.querySelector(
    '.no-entries',
  ) as HTMLParagraphElement;

  if (!$noEntries) throw new Error('No entries!');

  if (data.entries.length === 0) {
    $noEntries.style.display = 'block';
  } else {
    $noEntries.style.display = 'none';
  }
}

function viewSwap(view: 'entries' | 'entry-form'): void {
  const $entriesView = document.querySelector(
    '[data-view="entries"]',
  ) as HTMLElement;
  const $entryFormView = document.querySelector(
    '[data-view="entry-form"]',
  ) as HTMLElement;

  if (!$entriesView || !$entryFormView)
    throw new Error('View elements not found!');

  if (view === 'entries') {
    $entriesView.classList.remove('hidden');
    $entryFormView.classList.add('hidden');
  } else if (view === 'entry-form') {
    $entryFormView.classList.remove('hidden');
    $entriesView.classList.add('hidden');
  }

  data.view = view;
}

const $entriesLink = document.getElementById(
  'entries-link',
) as HTMLAnchorElement;

if (!$entriesLink) throw new Error('$entriesLink query failed!');

$entriesLink.addEventListener('click', function (event: Event) {
  event.preventDefault();
  viewSwap('entries');
});

const $newEntryButton = document.getElementById(
  'new-entry-button',
) as HTMLAnchorElement;

if (!$newEntryButton) throw new Error('$newEntryButton query failed!');

$newEntryButton.addEventListener('click', function (event: Event) {
  event.preventDefault();
  viewSwap('entry-form');
});
