export type Tag = {
  label: string;
  value: string;
};

export type NoteData = {
  markdown: string;
  title: string;
  tags: Tag[];
};

export type Note = {
  id: string;
} & NoteData;
