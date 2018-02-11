import React from 'react';
import { Redirect } from 'react-router-dom';

class SongUploadForm extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      songUrl: this.props.song.song_url,
      songFile: null,
      title: this.props.song.title,
      genre: this.props.song.genre,
      description: this.props.song.description,
      permalink: this.props.song.permalink,
      redirect: false,
      artworkUrl: this.props.song.image_url,
      artwork: null,
      disabled: false,
      id: this.props.song.id
    }
    this.handleFile = this.handleFile.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.handleImage = this.handleImage.bind(this);
  }

  titleToPermalink(title) {
    let plink = title;
    plink = plink.replace(/[-@#]/g, " ");
    plink = plink.replace(/\s\s+/g, " ");
    plink = plink.replace(/[ ]/g, "-");
    plink = plink.replace(/['()\[\]{}$%^&+=!,;"~`,|.]/g, "");
    return plink.toLowerCase();
  }

  capitalizeTitle(title) {
    let titleArr = title.split(" ");
    return titleArr.map(
      (word) => {
        if (word) {
          return word[0].toUpperCase().concat(word.slice(1));
        }
        return word;
      }
    ).join(" ");
  }

  handleUploadButton(inputId) {
    return (e) => {
      e.preventDefault();
      document.getElementById(inputId).click();
    }
  }

  handleFile(e) {
    e.preventDefault();
    const reader = new FileReader();
    const file = e.currentTarget.files[0];
    if (file) {
      let title = file.name.split(".");
      title = title.length > 2 ? title.slice(0, title.length - 1).join(".") : title[0];
      let permalink = this.titleToPermalink(title);
      title = this.capitalizeTitle(title);
      reader.onloadend = () => this.setState({ songUrl: reader.result, songFile: file, title, permalink });
      reader.readAsDataURL(file);
    } else {
      this.setState({ songUrl: "", songFile: null });
    }
  }

  handleImage(e) {
    e.preventDefault();
    const reader = new FileReader();
    const imagefile = e.currentTarget.files[0];
    reader.onloadend = () => this.setState({ artworkUrl: reader.result, artwork: imagefile });
    if (imagefile) {
      reader.readAsDataURL(imagefile);
    } else {
      this.setState({ artworkUrl: "", artwork: null });
    }
    console.log(this.state);
  }

  handleUpdate(field) {
    return (e) => {
      if (field === 'permalink') {
        const permalinkRegex = /^[a-zA-Z0-9_-]*$/;
        if (!permalinkRegex.test(e.currentTarget.value)) {
          return;
        }
      }
      this.setState({ [field]: e.currentTarget.value })
    }
  }

  handleCancel(e) {
    e.preventDefault();
    this.setState({ songUrl: "", songFile: null, title: "", genre: "", description: "", permalink: "", redirect: false });
    if (window.closeEdit) {
      window.closeEdit();
    }
  }

  handleSubmit(e) {
    e.preventDefault();
    const { title, genre, description, permalink, id } = this.state;
    const sfile = this.state.songFile;
    const imageFile = this.state.artwork;
    const formData = new FormData();
    formData.append("song[title]", title);
    formData.append("song[genre]", genre);
    formData.append("song[description]", description);
    formData.append("song[permalink]", permalink);
    if (imageFile) {
      formData.append("song[image]", imageFile);
    }
    if (sfile)  {
      formData.append("song[songfile]", sfile);
      this.setState({ disabled: true });
      if (this.props.page === 'page') {
        this.props.createSong(formData).then(
          () => this.setState({
            songUrl: "", songFile: null,
            title: "", genre: "", description: "",
            redirect: true, artwork: null,
            artworkUrl: ""
          }));
      }
    } else {
      if (this.props.page === 'modal') {
        this.props.updateSong(formData, id);
      }
    }

  }

  render() {
    const { currentUser } = this.props;
    const { redirect, title, disabled } = this.state;
    let btnDisabled = "";
    if (disabled) {
      btnDisabled = "disabled-button";
    }
    if (redirect) {
      return <Redirect to='/stream' />
    }
    let uploadButton = ""
    if (this.props.page === 'page') {
        uploadButton = <button onClick={this.handleUploadButton("file-input")} className="session-button" id="song-upload-button"><span>Choose a file to upload</span></button>
    }
    return(
      <section className={`upload-form-${this.props.page}`}>

        {uploadButton}
        <div className="upload-form-wrapper">
          <form onSubmit={this.handleSubmit} className="song-upload-form">
            <input type="file" id="file-input" onChange={this.handleFile} />
            <div className="artwork-div">
              <img src={this.state.artworkUrl} className="upload-artwork"></img>
              <input type="file" id="artwork-input" onChange={this.handleImage} />
              <button onClick={this.handleUploadButton("artwork-input")} className="image-update-button"><span><i className="fas fa-camera"></i>  Update image</span></button>
            </div>
            <div className="upload-form-inner-div">
              <div className="upload-form-input-div">
                <label>
                  Title:<strong className="asterick-wrapper">*</strong>
                  <input  onChange={this.handleUpdate('title')} value={title} required="required"/>
                </label>
              </div>
              <div className="upload-form-input-div" id="upload-form-permalink-div">
                <label>
                  <span className="upload-form-permalink-span">
                    elitebeats.herokuapp.com/#/{currentUser.profile_url}/
                  </span>
                  <input onChange={this.handleUpdate('permalink')} value={this.state.permalink} id="upload-form-permalink-input" required="required"/>
                </label>
              </div>
              <div className="upload-form-input-div">
                <label>
                  <span className="genre-span">Genre:</span>
                  <select className="genre-select" onChange={this.handleUpdate('genre')}>
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
              </div>
              <div className="upload-form-input-div">
                <label>
                  Description:
                  <textarea
                    onChange={this.handleUpdate('description')}
                    placeholder="Describe your track"/>
                </label>
              </div>
              <div className="upload-form-buttons-div">
                <button className={`upload-form-cancel-button ${btnDisabled}`} onClick={this.handleCancel} disabled={disabled}><span>Cancel</span></button>
                <button className={`upload-form-save-button ${btnDisabled}`} disabled={disabled}><span>Save</span></button>
              </div>
            </div>
          </form>
        </div>
      </section>
    );
  }
}
export default SongUploadForm;
