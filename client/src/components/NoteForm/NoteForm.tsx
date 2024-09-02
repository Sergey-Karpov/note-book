import { useForm } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import { zodResolver } from '@hookform/resolvers/zod';
import { CreateNoteSchema, CreateNoteType } from '../../schemas/NoteSchema';
import { createNote } from '../../api/Note';
import { queryClient } from '../../api/queryClient';
import { FormField } from '../FormField';
import { Button } from '../Button';
import './NoteForm.css';

export const NoteForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<CreateNoteType>({ resolver: zodResolver(CreateNoteSchema) });

  const createNoteMutation = useMutation(
    {
      mutationFn: createNote,
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['notes'] });
        reset();
      },
    },
    queryClient
  );

  const onSubmit = (data: CreateNoteType) => {
    createNoteMutation.mutate(data);
  };

  return (
    <form className="note-form" onSubmit={handleSubmit(onSubmit)}>
      <FormField label="Заголовок" errorMessage={errors.title?.message}>
        <input type="text" {...register('title')} />
      </FormField>
      <FormField label="Текст" errorMessage={errors.text?.message}>
        <textarea {...register('text')} />
      </FormField>
      <Button isLoading={createNoteMutation.isPending}>Сохранить</Button>
    </form>
  );
};
