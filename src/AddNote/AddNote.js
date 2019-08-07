import React from 'react';
import PropTypes from 'prop-types';
import NotefulForm from '../NotefulForm/NotefulForm';

import ApiContext from '../ApiContext';

class AddNote extends React.Component {
  static propTypes = {
    location: PropTypes.object.isRequired,
    folders: PropTypes.array.isRequired,
    addNote: PropTypes.func.isRequired,
  }

  state = {
    folderId: '',
    name: '',
    content: '',
  };

  componentDidMount() {
    const fromFolder = new URLSearchParams(this.props.location.search).get('fromFolder');
    if (fromFolder) {
      this.setState({ folderId: fromFolder });
    } else if (this.props.folders[0]) {
      this.setState({ folderId: this.props.folders[0].id })
    }
  }

  componentDidUpdate(prevProps) {
    if (!this.state.folderId && prevProps.folders.length !== this.props.length) {
      this.setState({ folderId: this.props.folders[0].id });
    }
  }

  render() {
    return (
      <div className="AddNote">
        <NotefulForm onSubmit={e => {
          e.preventDefault();

          this.props.addNote(this.state)
            .then(note => {
              this.props.history.push(`/folder/${this.state.folderId}`)
            })
            .catch(err => console.log(err.message));
        }}>
          <label htmlFor="note-folder">Folder:</label>
          <select name="folderId" value={this.state.folderId} onChange={e => this.setState({ folderId: e.target.value })}>
            {this.props.folders.map(f => {
              return <option key={f.id} value={f.id}>{f.name}</option>
            })}
          </select>
          <label htmlFor="note-name">Name:</label>
          <input type="text" name="name" id="note-name" onChange={e => this.setState({ name: e.target.value })} required />
          <label htmlFor="note-name">Content:</label>
          <textarea name="content" id="note-content" rows="5" cols="30" onChange={e => this.setState({ content: e.target.value })} required />
          <button type="submit">Save</button>
        </NotefulForm>
      </div>
    )
  }
}

function withDefaultFolder(props) {
  return <ApiContext.Consumer>
    {({ addNote, folders }) => <AddNote addNote={addNote} folders={folders} {...props} /> }
  </ApiContext.Consumer>
}

export default withDefaultFolder;
