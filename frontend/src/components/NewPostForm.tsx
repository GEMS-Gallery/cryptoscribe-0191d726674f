import React, { useState } from 'react';
import { TextField, Button, Box } from '@mui/material';
import { Editor } from 'react-draft-wysiwyg';
import { EditorState, convertToRaw } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

type NewPostFormProps = {
  onSubmit: (title: string, body: string, author: string) => void;
  onCancel: () => void;
};

const NewPostForm: React.FC<NewPostFormProps> = ({ onSubmit, onCancel }) => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [editorState, setEditorState] = useState(EditorState.createEmpty());

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const body = draftToHtml(convertToRaw(editorState.getCurrentContent()));
    onSubmit(title, body, author);
  };

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        fullWidth
        label="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        margin="normal"
        required
      />
      <TextField
        fullWidth
        label="Author"
        value={author}
        onChange={(e) => setAuthor(e.target.value)}
        margin="normal"
        required
      />
      <Box sx={{ mb: 2 }}>
        <Editor
          editorState={editorState}
          onEditorStateChange={setEditorState}
          wrapperClassName="rich-text-editor"
          editorClassName="rich-text-editor-content"
        />
      </Box>
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
        <Button variant="outlined" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit" variant="contained" color="primary">
          Submit
        </Button>
      </Box>
    </form>
  );
};

export default NewPostForm;