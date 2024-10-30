import { useCallback, useEffect, useRef, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'

import { Box, Button, Checkbox, CheckboxGroup, Divider, Flex, Heading, Input, Stack, Text } from '@chakra-ui/react';

import './App.css'
import db from './appwrite/database';
import { Models } from 'appwrite';

type Note = Models.Document & {
  text: string;
  done: boolean;
}

const NoteElement = ({text, done, $id, onChangeStatus, onDelete}:Note & { onChangeStatus: () => void,  onDelete: () => void}) => {  
  return <Box display='flex' alignItems='center' gap='8px' w='100%'>
    <Checkbox isChecked={done} flex='1' onChange={onChangeStatus}>
      <Text textAlign={'left'} opacity={done ? 0.5 : 1} textDecorationLine={done ? 'line-through' : undefined}>{text}</Text>
    </Checkbox>
    <Button onClick={onDelete}>❌</Button>
  </Box>
}

function App() {

  const inputRef = useRef<HTMLInputElement>(null);
  const [notes, setNotes] = useState<Models.DocumentList<Note>>({documents: [], total: 0});

  const handleAdd = async () => {
    if(inputRef.current) {
      const text = inputRef.current.value;
      if(text) {
        inputRef.current.value = '';
        const note = await db.notes.create({text}) as Note;
        setNotes(prev => ({total: prev.total + 1, documents: [...prev.documents, note]}));
      }
    }
  }

  const handleDelete = async (id:string) => {
    console.log('handleDelete', id);
    setNotes(prev => ({total: prev.total - 1, documents: prev.documents.filter(note => note.$id !== id)}));
    await db.notes.delete(id);
  }

  const handleChangeStatus = async (id:string) => {
    console.log('handleChangeStatus', id);
    const note = notes.documents.find(note => note.$id === id);
    if (note) {
      const done = !note.done;
      setNotes(prev => ({total: prev.total, documents: prev.documents.map(n => n.$id === id ? {...n, done} : n )}));
      await db.notes.update(id, { done });
    }
  }

  const init = useCallback(async () => {
    const notes = await db.notes.list();
    setNotes(notes);
  }, []);

  useEffect(() => {
    init();
    //db.notes.create({text: 'Hello World'});
  }, [init]);

  return <Box p="8px" textAlign={'center'}>

    <Heading>NOTES</Heading>
    <Flex gap="8px">
      <Input ref={inputRef} placeholder='📝 Adicione uma nota' />
      <Button onClick={handleAdd}>add</Button>
    </Flex>
    <Stack mt="8px">
      {notes.documents.map((note) => <> 
        <Divider />    
        <NoteElement key={note.$id} {...note} onChangeStatus={() => handleChangeStatus(note.$id)} onDelete={() => { handleDelete(note.$id) }} />
      </>)}
    </Stack>
    <Button>ADD</Button>
  </Box>
}

export default App
