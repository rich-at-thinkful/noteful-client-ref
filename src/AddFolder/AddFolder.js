import React from 'react';
import PropTypes from 'prop-types';
import NotefulForm from '../NotefulForm/NotefulForm';
import ApiContext from '../ApiContext';

import './AddFolder.css';

const propTypes = {
  history: PropTypes.object.isRequired,
};

function AddFolder(props) {
  return (
    <div className="AddFolder">
      <h2>Create a new folder</h2>
      <ApiContext.Consumer>
        {api => 
          <NotefulForm onSubmit={e => {
            e.preventDefault();
            api.addFolder(e.target.folderName.value)
              .then(folder => {
                props.history.push(`/folder/${folder.id}`);
              })
              .catch(err => console.log(err));
          }}>
            <label htmlFor="folder-name">Folder Name:</label>
            <input type="text" name="folderName" id="folder-name" />
            <button type="submit">Add</button>
          </NotefulForm>
        }
      </ApiContext.Consumer>
    </div>    
  );
}

AddFolder.propTypes = propTypes;

export default AddFolder;
