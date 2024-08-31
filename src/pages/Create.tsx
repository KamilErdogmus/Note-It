import Form from "../Components/Form";
import { NoteData, Tag } from "../types";

export type CreateProps = {
  createTag: (tag: Tag) => void;
  handleSubmit: (noteData: NoteData) => void;
  availableTags: Tag[];
} & Partial<NoteData>;

const Create = ({
  createTag,
  handleSubmit,
  availableTags,
}: CreateProps) => {
  return (
    <div className="container py-5">
      <h2>Create New Note</h2>

      <Form
        createTag={createTag}
        handleSubmit={handleSubmit}
        availableTags={availableTags}
      />
    </div>
  );
};

export default Create;
