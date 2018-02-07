import React from 'react';
import { Redirect } from 'react-router-dom';

class SongUploadForm extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      songUrl: "",
      songFile: null,
      title: "",
      genre: "",
      description: "",
      permalink: ""
    }
    this.handleUploadButton = this.handleUploadButton.bind(this);
    this.handleFile = this.handleFile.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleUploadButton(e) {
    e.preventDefault();
    document.getElementById("file-input").click();
  }

  handleFile(e) {
    e.preventDefault();
    const reader = new FileReader();
    const file = e.currentTarget.files[0];
    reader.onloadend = () => this.setState({ songUrl: reader.result, songFile: file });
    if (file) {
      reader.readAsDataURL(file);
    } else {
      this.setState({ songUrl: "", songFile: null });
    }
  }

  handleUpdate(field) {
    return (e) => {
      this.setState({ [field]: e.currentTarget.value })
    }
  }

  handleCancel(e) {
    e.preventDefault();
    this.setState({ songUrl: "", songFile: null, title: "", genre: "", description: "" })
  }

  handleSubmit(e) {
    e.preventDefault();
    const { title, genre, description, permalink } = this.state;
    const file = this.state.songFile;
    const formData = new FormData();
    formData.append("song[title]", title);
    formData.append("song[genre]", genre);
    formData.append("song[description]", description);
    formData.append("song[permalink]", permalink);
    if (file) formData.append("song[songfile]", file);
    this.props.createSong(formData);
    <Redirect to={`/${currentUser.profile_url}/${permalink}`}/>
  }

  render() {
    const { currentUser } = this.props;
    return(
      <section className="upload-form-wrapper">

        <form onSubmit={this.handleSubmit}>
          <input type="file" id="file-input" onChange={this.handleFile}/>
          <button onClick={this.handleUploadButton}><span>Choose a file to upload</span></button>
          <label>
            Title:
            <input className="upload-form-input" onChange={this.handleUpdate('title')}/>
          </label>
          <label>
            elitebeats.herokuapp.com/#/{currentUser.profile_url}/
            <input onChange={this.handleUpdate('permalink')}/>
          </label>
          <label>
            Genre
            <select className="upload-form-input" onChange={this.handleUpdate('genre')}>
              <option value="none" selecter="selected">None</option>
              <option value="alternative">Alternative Rock</option>
              <option value="ambient">Ambient</option>
              <option value="classical">Classical</option>
              <option value="country">Country</option>
              <option value="edm">Dance & EDM</option>
              <option value="dancehall">Dancehall</option>
              <option value="deephouse">Deep House</option>
              <option value="disco">Disco</option>
              <option value="dnb">Drum & Bass</option>
              <option value="dubstep">Dubstep</option>
              <option value="electronic">Electronic</option>
              <option value="folk">Folk & Singer-Songwriter</option>
              <option value="hiphop">Hip-hop & Rap</option>
              <option value="house">House</option>
              <option value="indie">Indie</option>
              <option value="jazz">Jazz & Blues</option>
              <option value="latin">Latin</option>
              <option value="metal">Metal</option>
              <option value="piano">Piano</option>
              <option value="pop">Pop</option>
              <option value="rnb">R&B & Soul</option>
              <option value="reggae">Reggae</option>
              <option value="reggaeton">Reggaeton</option>
              <option value="rock">Rock</option>
              <option value="soundtrack">Soundtrack</option>
              <option value="techno">Techno</option>
              <option value="trance">Trance</option>
              <option value="trap">Trap</option>
              <option value="triphop">Triphop</option>
              <option value="world">World</option>
            </select>
          </label>
          <label>
            Description:
            <textarea className="upload-form-input"
              onChange={this.handleUpdate('description')}
              placeholder="Describe your track"/>
          </label>
          <button onClick={this.handleCancel}><span>Cancel</span></button>
          <button><span>Save</span></button>
        </form>
      </section>
    );
  }
}
export default SongUploadForm;
