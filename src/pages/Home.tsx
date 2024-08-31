import { Button, Col, Form, Row, Stack } from "react-bootstrap";
import { Note, Tag } from "../types";
import { Link } from "react-router-dom";
import ReactSelect from "react-select";
import Card from "../Components/Card";
import { useState } from "react";

interface IProps {
  notes: Note[];
  availableTags: Tag[];
}

const Home = ({ availableTags, notes }: IProps) => {
  const [selectedTags, setSelectedTags] = useState<Tag[]>([]);
  const [title, setTitle] = useState<string>("");

  const filtredNotes = notes.filter(
    (note) =>
      note.title.toLowerCase().includes(title.toLowerCase()) &&
      selectedTags.every((s_tag) =>
        note.tags.some(
          (note_tag) => note_tag.value === s_tag.value
        )
      )
  );
  return (
    <div className="container mx-auto py-5">
      {/* Top Area */}
      <Stack
        direction="horizontal"
        className="justify-content-between  mb-4"
      >
        <Link to={"/"}>
          <h1 className="d-flex gap-3 align-items-center">
            <img
              src="note_logo.png"
              alt="notes-logo"
              width={45}
            />
            <span>Note It</span>
          </h1>
        </Link>

        <Link to={"/new"}>
          <Button>Create</Button>
        </Link>
      </Stack>

      {/* Form Area */}
      <Form>
        <Row>
          <Col>
            <Form.Group>
              <Form.Label>Search By Title</Form.Label>
              <Form.Control
                onChange={(e) => setTitle(e.target.value)}
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group>
              <Form.Label>Search By Tag</Form.Label>
              <ReactSelect
                onChange={(allTags) =>
                  setSelectedTags(allTags as Tag[])
                }
                className="text-black"
                isMulti
                options={availableTags}
              />
            </Form.Group>
          </Col>
        </Row>
      </Form>

      {/* Notes */}
      <Row xs={1} sm={2} lg={3} xl={4} className="mt-4 g-4">
        {filtredNotes.map((note) => (
          <Col className="mt-4" key={note.id}>
            <Card note={note} />
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default Home;
