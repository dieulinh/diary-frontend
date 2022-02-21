import React, {useState} from 'react';
import Showdown from 'showdown';
import ReactMde from 'react-mde';
import "react-mde/lib/styles/css/react-mde-all.css";
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
  const [showModal, setShowModal] = useState(false);

  return (<div className='card has-background-warning'>
    <div className="card-content m-2 has-background-warning-light has-text-dark">
      <div id="note" className="content">
        <p className='title is-4'>{note.title}</p>
        <hr/>
        <p className='subtitle is-6'>{date} at {time}</p>
      </div>
    </div>
    <footer>
      <a onClick={e => {
          e.preventDefault();
          setShowModal(true);
        }
      }> show </a>
    </footer>
    <div className={`modal ${showModal ? 'is-active' : ''}`} >
      <div className='modal-background'></div>
      <div className='modal-card'>
        <header className="modal-card-head has-background-warning">
          <p className="modal-card-title has-text-warning-dark">{note.title}</p>

          <button className="delete" aria-label="close" onClick={e => {
              e.preventDefault();
              setShowModal(false);
            }}></button>
        </header>
        <section className="modal-card-body has-background-warning-light">
            <ReactMde
              value={note.content}
              selectedTab={"preview"}
              readOnly
              toolbarCommands={[]}
              generateMarkdownPreview={markdown =>
                Promise.resolve(converter.makeHtml(markdown))
              }
            />
          </section>
      </div>
    </div>

  </div>)
}
export default Note;