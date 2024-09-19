const dataModel = {
  entries: [] as Array<{
    entryId: number;
    title: string;
    photoUrl: string;
    content: string;
  }>,
  nextEntryId: 1,
};

const $form = document.querySelector('#journal-entry-form') as HTMLFormElement;
const $urlPreview = document.querySelector(
  '#photo-preview',
) as HTMLImageElement;
const $photoUrlInput = document.querySelector('#photo-url') as HTMLInputElement;

$photoUrlInput.addEventListener('input', function (event: Event) {
  const target = event.target as HTMLInputElement;
  $urlPreview.src = target.value || 'images/placeholder-image-square.jpg';
});

$form.addEventListener('submit', function (event: Event) {
  event.preventDefault();

  const newEntry = {
    entryId: dataModel.nextEntryId,
    title: ($form.elements.namedItem('title') as HTMLInputElement).value,
    photoUrl: ($form.elements.namedItem('photo-url') as HTMLInputElement).value,
    content: ($form.elements.namedItem('content') as HTMLTextAreaElement).value,
  };

  dataModel.nextEntryId++;
  dataModel.entries.unshift(newEntry);

  saveData(data);

  $form.reset();
  $urlPreview.src = 'images/placeholder-image-square.jpg';

  console.log('New entry added:', newEntry);
});
