import { randomUUID } from "crypto";
import { JSONFilePreset } from "lowdb/node";

export interface INote {
  id: string;
  title: string;
  text: string;
  userId: string;
  createdAt: number;
}

const database = await JSONFilePreset<Record<string, INote>>("notes.json", {});

export interface IGetAllNotesOptions {
  searchString?: string;
}

export interface IGetAllNotesResult {
  list: INote[];
}

export class Notes {
  static getAllForUser(
    userId: string,
    { searchString }: IGetAllNotesOptions = {}
  ): IGetAllNotesResult {
    let list = Object.values(database.data).filter(
      (el) => el.userId === userId
    );

    if (searchString) {
      list = list.filter((post) =>
        post.text.toLowerCase().includes(searchString.toLowerCase())
      );
    }

    return {
      list,
    };
  }

  static async create(
    title: string,
    text: string,
    userId: string
  ): Promise<INote> {
    const note: INote = {
      id: randomUUID(),
      title,
      text,
      userId,
      createdAt: Date.now(),
    };

    await database.update((data) => {
      data[note.id] = note;
    });

    return note;
  }
}
