import { Button, TextInput } from "@mantine/core";
import { modals } from "@mantine/modals";
import { useNotes } from "../../hooks/useNotes";
import { useParams } from "react-router-dom";
import { bd } from "../../bd/bd";
import { useLiveQuery } from "dexie-react-hooks";
import { useState } from "react";
import { marked } from "marked";
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";

function Workspace() {
  const { deleteNote } = useNotes("");
  const { id } = useParams();
  const note = useLiveQuery(async () => {
    return await bd.notes.get(Number(id));
  }, [id]);

  const [isEditing, setIsEditing] = useState(false);

  const toggleEdit = () => setIsEditing((prev) => !prev);
  const openModal = () =>
    modals.openConfirmModal({
      title: "Удалить заметку",
      radius: "md",
      centered: true,
      withCloseButton: false,
      children: `Вы уверены? Что хотите удалить заметку "${note?.title}"`,
      labels: { confirm: "Да", cancel: "Отмена" },
      onCancel: () => console.log("Отмена"),
      onConfirm: () => deleteNote(Number(id)),
    });
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
          <div className="markdown-preview">
            <div
              dangerouslySetInnerHTML={{
                __html: String(marked.parse(note?.content || "")),
              }}
            />
          </div>

          <Button color="red" mt="xs" onClick={openModal}>
            Удалить
          </Button>

          <Button color="yellow" mt="md" onClick={toggleEdit}>
            Редактировать
          </Button>
        </>
      )}

      {isEditing && (
        <>
          <TextInput
            onChange={(e) =>
              bd.notes.update(Number(id), {
                title: e.currentTarget.value,
                updatedAt: Date.now(),
              })
            }
            label="Заголовок"
            value={note?.title}
          />
          <div>
            {note?.updatedAt}

            <SimpleMDE
              value={note?.content}
              onChange={(value) =>
                bd.notes.update(Number(id), {
                  content: value,
                  updatedAt: Date.now(),
                })
              }
            />
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
