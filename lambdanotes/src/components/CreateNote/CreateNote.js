import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './CreateNote.css';

class CreateNote extends Component {
    constructor(props) {
        super(props);
        this.state = {
            newNote: {
                title: '',
                textBody: ''
            },
            newID: ''
        }
    }

    handleTitleChange = (e) => {
        this.setState({ newNote: { title: e.target.value, textBody: this.state.newNote.textBody } })
    }

    handleContentChange = (e) => {
        this.setState({ newNote: { title: this.state.newNote.title, textBody: e.target.value } })
    }

    handleSaveNote = () => {
        axios
            .post(`https://killer-notes.herokuapp.com/note/create`, this.state.newNote)
                .then(res => {this.setState({ newID: res.data })})
                .catch(err => {console.log(err)})

        this.props.addCreatedNote(this.state.newNote.title, this.state.newNote.textBody, this.state.newID);
        this.setState({ newNote: {title: '', textBody: ''}, newID: '' });
    }

    render() {
        return (
            <div className='CreateNoteContainer'>
                <div>
                    <h3 className='createNoteHeader'>Create New Note:</h3>
                </div>
                <form className='createNoteForm'>
                    <input 
                        onChange={this.handleTitleChange} 
                        type='text' 
                        className='createNoteInputTitle' 
                        name='title'
                        value={this.state.noteTitle}
                        placeholder='Note Title' 
                    />
                    <textarea
                        onChange={this.handleContentChange}
                        type='text' 
                        className='createNoteInputContent' 
                        name='textBody'
                        value={this.state.noteContent}
                        placeholder='Note Content'>
                    </textarea>
                    <div className='cnEntireLink'>
                        <Link to={`/${this.state.newID}`}>
                            <input onClick={this.handleSaveNote} className='createNoteSaveButton' type='button' value='Save' />
                        </Link>
                    </div>
                </form>
            </div>
        )
    }
}

export default CreateNote;