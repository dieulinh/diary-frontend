import React from 'react';
import Showdown from 'showdown';
import server from '../services/Server';
const converter = new Showdown.Converter({
  tables: true,
  simplifiedAutoLink: true,
  strikethrough: true,
  tasklists: true
});

const Note = ({note, notes, setNotes}) => {
  const date = new Date(note.date).toDateString();
  const time = new Date(note.date).toTimeString();

  return (<div className='card has-background-warning'>
    <div id="note" className="content">
      <p>{note.title}</p>
      <p>{note.content}</p>
    </div>

  </div>)
}
export default Note;