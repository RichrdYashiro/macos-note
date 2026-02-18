import { useLiveQuery } from "dexie-react-hooks";
import { bd } from "../bd/bd";

import { useNavigate } from "react-router-dom";

export function useNotes(searchTerm: string) {
  const notes = useLiveQuery(() => bd.notes.toArray());

  const filteredNotes = notes
    ?.filter((note) =>
      note.title.toLowerCase().includes(searchTerm.toLowerCase()),
    )
    .sort((a, b) => b.updatedAt - a.updatedAt);
  const navigate = useNavigate();

  async function addNote() {
    const id = await bd.notes.add({
      title: "Новая заметка",
      content: "",
      updatedAt: Date.now(),
    });
    navigate(`/notes/${id}`);
  }

  function deleteNote(id: number) {
    bd.notes.delete(id);
    navigate(`/`);
  }

  return {
    filteredNotes,
    addNote,
    notes,
    deleteNote,
  };
}
