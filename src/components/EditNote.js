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
  const [selectedTab, setSelectedTab] = useState('write');

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

  return (<div className='card has-background-warning'>
    <div id="note" className="content">
      <p>Edit Note</p>
      <form onSubmit={e => {e.preventDefault(); editNote()} }>
        <div className='field'>
          <label className='label'>Title</label>
          <div className="control">
            <input type="text" value={title} onChange={handleTitleChange} className='input' required/>
          </div>

        </div>
        <div className='field'>
          <label className='label'>Content</label>
          <div className='control'>
            <ReactMde value={content}
              onChange={setContent}
              selectedTab={selectedTab}
              onTabChange={setSelectedTab}
              generateMarkdownPreview={markdown => Promise.resolve(converter.makeHtml(markdown))}
            />
          </div>
        </div>
        <button className='button is-link'>Save</button>
      </form>
    </div>

  </div>)
}
export default EditNote;