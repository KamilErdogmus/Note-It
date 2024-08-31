import { FormEvent, useRef, useState } from "react";
import { Button, Col, Form, Row, Stack } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import ReactSelect from "react-select/creatable";
import { CreateProps } from "../../pages/Create";
import { Tag } from "../../types";
import { v4 } from "uuid";
import styles from "./form.module.css";

const CustomForm = ({
  availableTags,
  handleSubmit,
  createTag,
  markdown = "",
  tags = [],
  title = "",
}: CreateProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const navigate = useNavigate();
  const [selectedTags, setSelectedTags] = useState<Tag[]>(tags);

  const handleSend = (e: FormEvent) => {
    e.preventDefault();

    //* Yeni oluşturulan Notu Kaydet
    handleSubmit({
      title: inputRef.current?.value as string,
      markdown: textareaRef.current?.value as string,
      tags: selectedTags,
    });
    //! Anasayfaya Yönlendir
    navigate("/");
  };

  return (
    <Form onSubmit={handleSend}>
      <Row>
        <Col>
          <Form.Group controlId="title">
            <Form.Label>Title</Form.Label>
            <Form.Control defaultValue={title} ref={inputRef} />
          </Form.Group>
        </Col>
        <Col>
          <Form.Group controlId="tags">
            <Form.Label>Tags</Form.Label>
            <ReactSelect
              isMulti
              onChange={(allTags) =>
                setSelectedTags(allTags as Tag[])
              }
              options={selectedTags}
              className="text-black"
              value={selectedTags}
              defaultValue={tags}
              onCreateOption={(text: string) => {
                //*Etiket nesnesini oluştur ve id'ye ekle
                const newTag: Tag = {
                  label: text,
                  value: v4(),
                };

                //*Yeni etiketi locale kaydet
                createTag(newTag);

                setSelectedTags([...selectedTags, newTag]);
              }}
            />
          </Form.Group>
        </Col>
      </Row>

      <Form.Group className="mt-4" controlId="markdown">
        <Form.Label>Content(Markdown supports)</Form.Label>
        <Form.Control
          as={"textarea"}
          defaultValue={markdown}
          ref={textareaRef}
          style={{ minHeight: "300px", maxHeight: "500px" }}
        />
      </Form.Group>

      {/* Buttons */}

      <Stack
        direction="horizontal"
        gap={4}
        className="justify-content-end mt-5"
      >
        <Link to={".."}>
          <Button type="button" variant="secondary">
            Previous
          </Button>
        </Link>
        <Button type="submit">Confirm</Button>
      </Stack>
    </Form>
  );
};

export default CustomForm;
