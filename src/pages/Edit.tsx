import { useOutletContext } from "react-router-dom";
import Form from "../Components/Form";
import { Note, NoteData, Tag } from "../types";
interface IProps {
  handleSubmit: (id: string, updatedData: NoteData) => void;
  createTag: (tag: Tag) => void;
  availableTags: Tag[];
}

const Edit = ({
  handleSubmit,
  createTag,
  availableTags,
}: IProps) => {
  const note: Note = useOutletContext();
  return (
    <div className="container py-5">
      <h2>Edit Note</h2>

      <Form
        handleSubmit={(updatedData) =>
          handleSubmit(note.id, updatedData)
        }
        createTag={createTag}
        availableTags={availableTags}
        markdown={note.markdown}
        title={note.title}
        tags={note.tags}
      />
    </div>
  );
};

export default Edit;
