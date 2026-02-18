import { Link } from "react-router-dom";
import { Button, TextInput } from "@mantine/core";
import { useNotes } from "../../hooks/useNotes";
import ErrorBoundary from "../common/ErrorBoundary";

function Sidebar() {
  const { notes, addNote } = useNotes("");

  if (!notes) return null;
  return (
    <div>
      <TextInput placeholder="Поиск" />
      {notes.length === 0 && <>Список пуст</>}
      <Button onClick={addNote}>Новая заметка</Button>
      <ErrorBoundary>
        <ul>
          {notes.map((note) => (
            <li key={note.id}>
              <Link to={`/notes/${note.id}`}>{note.title}</Link>
            </li>
          ))}
        </ul>
      </ErrorBoundary>
    </div>
  );
}

export default Sidebar;
