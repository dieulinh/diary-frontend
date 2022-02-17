import React, {useState, useEffect} from 'react';
import { Link } from "react-router-dom";
import server from '../services/Server';
import User from '../services/User';

import Note from './Note';
import Showdown from 'showdown';
const converter = new Showdown.Converter({
  tables: true,
  simplifiedAutoLink: true,
  strikethrough: true,
  tasklists: true
});

const Notes = () => {
  const [notes, setNotes] = useState([]);
  const [message, setMessage] = useState(false);
  const user = User.getCurrentUser();
  const username = user.username;
  useEffect(() => {
    server.get(`/${username}/notes`)
    .then((response => {
      setNotes(response.data);
    }))
  }, [username]);

  return (<div className='container mt-3'>
    <h1 className='title'>All Notes</h1>
    <Link to={`/${username}/add`}><span className='icon is-small'></span> Add note</Link>
    {notes.length > 0 && (
      <div className='columns is-multiline'>
        { notes.map((note) => {
          return (<div className='column is-one-third' key={note._id}>
            <Note note={note} notes={notes} setNotes={setNotes} />
            <Link to={`/${username}/edit/${note._id}`}><span className='icon is-small'></span> Edit {note._id}</Link>
          </div>)
        })}
      </div>
    )}
  </div>);
}
export default Notes;