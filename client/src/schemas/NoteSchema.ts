import { z } from 'zod';

export const NoteSchema = z.object({
  id: z.string(),
  title: z.string(),
  text: z.string(),
  userId: z.string(),
  createdAt: z.number(),
});

export type NoteType = z.infer<typeof NoteSchema>;

export const NoteList = z.array(NoteSchema);

export type NoteList = z.infer<typeof NoteList>;

export const FetchNoteListSchema = z.object({
  list: NoteList,
});

export type FetchNoteListResponse = z.infer<typeof FetchNoteListSchema>;

export const CreateNoteSchema = z.object({
  title: z.string().min(5, 'Длина загаловка должна быть не менее 5 символов'),
  text: z.string().min(10, 'Длина текста должна быть не менее 10 символов'),
});

export type CreateNoteType = z.infer<typeof CreateNoteSchema>;
