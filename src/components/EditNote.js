import React, {useState, useEffect} from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Showdown from 'showdown';
import ReactMde from 'react-mde';
import "react-mde/lib/styles/css/react-mde-all.css";
import User from '../services/User';
import server from '../services/Server';
const converter = new Showdown.Converter({
  tables: true,
  simplifiedAutoLink: true,
  strikethrough: true,
  tasklists: true
});

const EditNote = () => {
  let navigate = useNavigate();

  const user = User.getCurrentUser();
  const username = user.username;
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  // let match = useRouteMatch(`/note/:id`);
  const {id} = useParams();
  useEffect(() => {
    server.get(`/note/${id}`)
    .then(response => {
      setTitle(response.data.title);
      setContent(response.data.content);
    })
  }, [username, id]);
  const editNote = () => {
    const noteData = { title, content };
    server.put(`/note/${id}`, noteData)
    .then(() => {
      navigate(`/notes`)
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
      <p>Edit Note</p>
      <form onSubmit={e => {e.preventDefault(); editNote()} }>
        <input type="text" value={title} onChange={handleTitleChange} required/>
        <textarea value={content} onChange={handleContentChange} required/>
        <button type='submit'>Save</button>
      </form>
    </div>

  </div>)
}
export default EditNote;