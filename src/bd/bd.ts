import { Dexie } from  'dexie';


interface Note  {
    id?: number;
    title: string;
    content: string;
    updatedAt: number;
}

export class NoteDB extends Dexie {
    notes!:Dexie.Table<Note, number>
    constructor() {
        super('NoteDB');
        this.version(1).stores({
            notes: '++id, title'
        })
    }

}

export const bd = new NoteDB()