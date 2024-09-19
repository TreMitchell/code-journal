interface JournalEntry {
  entryId: number;
  title: string;
  photoUrl: string;
  content: string;
}

const defaultData = {
  view: 'entry-form',
  entries: [] as JournalEntry[],
  editing: null,
  nextEntryId: 1,
};

function saveData(data: typeof defaultData): void {
  localStorage.setItem('journalData', JSON.stringify(data));
}

function loadData(): typeof defaultData {
  const jsonData = localStorage.getItem('journalData');
  return jsonData ? JSON.parse(jsonData) : defaultData;
}

const data: typeof defaultData = loadData();

function addNewEntry(entry: {
  title: string;
  photoUrl: string;
  content: string;
}): void {
  const newEntry: JournalEntry = {
    entryId: data.nextEntryId,
    title: entry.title,
    photoUrl: entry.photoUrl,
    content: entry.content,
  };
  data.nextEntryId++;
  data.entries.unshift(newEntry);
  saveData(data);
}

function changeView(newView: string): void {
  data.view = newView;
  saveData(data);
}
