import { BrowserRouter, Route, Routes } from "react-router-dom";
import Undefined from "./pages/Undefined";
import Home from "./pages/Home";
import Create from "./pages/Create";
import Detail from "./pages/Detail";
import Edit from "./pages/Edit";
import { useLocalStorage } from "@uidotdev/usehooks";
import { Tag, Note, NoteData } from "./types";
import { v4 } from "uuid";
import Layout from "./Components/Layout";
import { toast } from "react-toastify";

const App = () => {
  const [notes, setNotes] = useLocalStorage<Note[]>("notes", []);
  const [tags, setTags] = useLocalStorage<Tag[]>("tags", []);

  //? Tag Oluşturma
  const createTag = (tag: Tag): void => {
    setTags([...tags, tag]);
  };

  const createNote = (noteData: NoteData): void => {
    //*Formdan gelen veriye id ekle
    try {
      const newNote: Note = { id: v4(), ...noteData };

      setNotes([...notes, newNote]);

      toast.success("Note succesfully added!", {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
      });
    } catch (error) {
      toast.error("Something went wrong", {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
      });
      console.log(error);
    }
  };

  const deleteNote = (id: string): void => {
    try {
      setNotes(notes.filter((i) => i.id !== id));
      toast.warning("Note deleted!", {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
      });
    } catch (error) {
      toast.error("Something went wrong", {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
      });
      console.log(error);
    }
  };
  const updateData = (
    id: string,
    updatedData: NoteData
  ): void => {
    try {
      const updatedArray = notes.map((note) =>
        note.id === id ? { ...updatedData, id } : note
      );

      setNotes(updatedArray);

      toast.success("Note succesfully updated!", {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
      });
    } catch (error) {
      toast.error("Something went wrong", {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
      });
      console.log(error);
    }
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={<Home notes={notes} availableTags={tags} />}
        />
        <Route
          path="/new"
          element={
            <Create
              availableTags={tags}
              handleSubmit={createNote}
              createTag={createTag}
            />
          }
        />

        <Route
          path="/note/:id"
          element={<Layout notes={notes} />}
        >
          <Route
            index
            element={<Detail deleteNote={deleteNote} />}
          />
          <Route
            path="edit"
            element={
              <Edit
                handleSubmit={updateData}
                createTag={createTag}
                availableTags={tags}
              />
            }
          />
        </Route>

        <Route path="*" element={<Undefined />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
