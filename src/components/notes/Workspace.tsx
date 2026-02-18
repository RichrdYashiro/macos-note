import { Button, Textarea, TextInput } from "@mantine/core";
import { DateTimePicker } from "@mantine/dates";
import { useNotes } from "../../hooks/useNotes";
import { useParams } from "react-router-dom";
import { bd } from "../../bd/bd";
import { useLiveQuery } from "dexie-react-hooks";
import { useState } from "react";

function Workspace() {
  const { deleteNote } = useNotes("");
  const { id } = useParams();
  const note = useLiveQuery(async () => {
    return await bd.notes.get(Number(id));
  });

  const [isEditing, setIsEditing] = useState(false);

  const toggleEdit = () => setIsEditing((prev) => !prev);

  return (
    <div className="workSpace">
      {!isEditing && (
        <>
          <h1>{note?.title}</h1>
          <div>
            Дата создание
            {note?.updatedAt &&
              new Date(note.updatedAt).toLocaleString("ru-RU")}
          </div>
          {note?.content}
          <Button color="red" mt="xs" onClick={() => deleteNote(Number(id))}>
            Удалить
          </Button>
          <Button color="yellow" mt="md" onClick={toggleEdit}>
            Редактировать
          </Button>
        </>
      )}
      {isEditing && (
        <>
          <TextInput label="Заголовок" value={note?.title}></TextInput>
          <div>
            <DateTimePicker
              value={note?.updatedAt}
              label="Время и дата публикации"
            />

            <Textarea label="Описание" value={note?.content}></Textarea>
          </div>
          <Button color="green" mt="md" onClick={toggleEdit}>
            Сохранить
          </Button>
        </>
      )}
    </div>
  );
}

export default Workspace;
