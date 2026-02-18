import { Link } from "react-router-dom";
import { Button, TextInput } from "@mantine/core";
import { useNotes } from "../../hooks/useNotes";
import ErrorBoundary from "../common/ErrorBoundary";
import { useState } from "react";

function Sidebar() {
  const [searchText, setSearchText] = useState("");
  const { notes, filteredNotes, addNote } = useNotes(searchText);

  if (!notes) return null;
  return (
    <div>
      <TextInput
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
        placeholder="Поиск"
      />
      {notes.length === 0 && <>Список пуст</>}
      <Button onClick={addNote}>Новая заметка</Button>
      <ErrorBoundary>
        {filteredNotes ? (
          <ul>
            {filteredNotes.map((note) => (
              <li key={note.id}>
                <Link to={`/notes/${note.id}`}>{note.title}</Link>
              </li>
            ))}
          </ul>
        ) : (
          <ul>
            {notes.map((note) => (
              <li key={note.id}>
                <Link to={`/notes/${note.id}`}>{note.title}</Link>
              </li>
            ))}
          </ul>
        )}
      </ErrorBoundary>
    </div>
  );
}

export default Sidebar;
