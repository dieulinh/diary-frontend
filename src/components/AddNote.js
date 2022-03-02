import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import Showdown from 'showdown';
import User from '../services/User';
import server from '../services/Server';
const converter = new Showdown.Converter({
  tables: true,
  simplifiedAutoLink: true,
  strikethrough: true,
  tasklists: true
});

const AddNote = () => {
  let navigate = useNavigate();
  const user = User.getCurrentUser();
  const username = user.username;
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const addNote = () => {
    const noteData = { title, content };
    server.post(`/${username}/add`, noteData)
    .then(() => {
      navigate(`/notes`);
    })
  }
  const handleTitleChange = (e) => {
    e.preventDefault();
    setTitle(e.target.value);
  }
  const handleContentChange = (e) => {
    e.preventDefault();
    setContent(e.target.value)
  }

  return (<div className='card has-background-warning'>
    <div id="note" className="content">
      <p>Add Note</p>
      <form onSubmit={e => {e.preventDefault(); addNote()} }>
        <input type="text" value={title} onChange={handleTitleChange} required/>
        <textarea value={content} onChange={handleContentChange} required/>
        <button type='submit'>Save</button>
      </form>
    </div>

  </div>)
}
export default AddNote;