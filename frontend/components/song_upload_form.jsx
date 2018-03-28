import React from 'react';
import { Redirect } from 'react-router-dom';

class SongUploadForm extends React.Component {
  constructor (props) {
    super(props);
    this.pLinkErrorDisabled = "disabled";
    this.validationError = "";
    this.errorMessage = "";
    this.saveButtonDisabled = "disabled-save-button";
    let { song } = props;
    this.state = {
      songUrl: song.song_url,
      songFile: null,
      title: song.title,
      genre: song.genre,
      description: song.description,
      permalink: song.permalink,
      redirect: false,
      artworkUrl: song.image_url,
      artwork: null,
      disabled: false,
      id: song.id,
      newError: false
    }
    this.handleFile = this.handleFile.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.handleImage = this.handleImage.bind(this);
  }

  titleToPermalink(title) {
    let plink = title.toLowerCase(), num = 1;
    plink = plink.replace(/[-@&#]/g, " ");
    plink = plink.replace(/\s\s+/g, " ");
    plink = plink.replace(/[ ]/g, "-");
    plink = plink.replace(/['()\[\]{}$%^&+=!,;"~`,|.]/g, "");
    let base = plink;
    return plink;
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

  clickUrlEdit(e) {
    e.preventDefault();
    document.getElementById("upload-form-permalink-input").select();
  }

  resetErrors() {
    this.pLinkErrorDisabled = "disabled";
    this.validationError = "";
    this.errorMessage = "";
    this.saveButtonDisabled = "";
  }

  setErrorMessage(message) {
    this.pLinkErrorDisabled = "";
    this.validationError = "validation-error"
    this.errorMessage = message;
    this.saveButtonDisabled = "disabled-save-button";
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
      this.resetErrors();
      reader.onloadend = () => this.setState({ songUrl: reader.result,
        songFile: file, title, permalink });
      reader.readAsDataURL(file);
    } else {
      this.setState({ songUrl: "", songFile: null });
    }
  }

  handleImage(e) {
    e.preventDefault();
    const reader = new FileReader();
    const imagefile = e.currentTarget.files[0];
    reader.onloadend = () => this.setState({ artworkUrl: reader.result,
      artwork: imagefile });
    if (imagefile) {
      reader.readAsDataURL(imagefile);
    } else {
      this.setState({ artworkUrl: "", artwork: null });
    }
  }

  handleUpdate(field) {
    return (e) => {
      this.resetErrors();
      this.setState({ [field]: e.currentTarget.value, newError: false })
    }
  }

  handleCancel(e) {
    e.preventDefault();
    this.setState({ songUrl: "", songFile: null, title: "",
      genre: "", description: "", permalink: "", redirect: false });
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
      this.saveButtonDisabled = "disabled-save-button";
      if (this.props.page === 'page') {
        this.props.createSong(formData).then(
          () => this.setState({
            songUrl: "", songFile: null,
            title: "", genre: "", description: "",
            redirect: true, artwork: null,
            artworkUrl: ""
          }),
          error => this.setState({ disabled: false, newError: true })
        );
      }
    } else {
      if (this.props.page === 'modal') {
        this.props.updateSong(formData, id).then(
          () => window.closeEdit(),
          error => this.setState({ disabled: false, newError: true })
        );
      }
    }

  }

  render() {
    const { redirect, title, genre, description,
          disabled, permalink, artworkUrl, newError } = this.state,
          { currentUser, page, errors } = this.props,
          permalinkRegex = /^[a-z0-9_-]*$/;
    let btnDisabled = "",
        linkSpanElement = document.getElementById("song-form-link-span"),
        uploadButtonDiv = "", errorMargin = "185px";
    if (disabled) btnDisabled = "disabled-button";
    if (redirect) return (<Redirect to='/stream' />)
    if (page === 'page') {
        uploadButtonDiv = <div className="upload-header">
                            <h1 className="upload-h1">Upload to EliteBeats</h1>
                            <div>
                              <button onClick={this.handleUploadButton("file-input")}
                                className="session-button" id="song-upload-button"
                                type="button">
                                <span>Choose a file to upload</span>
                              </button>
                            </div>
                          </div>
    }
    if (linkSpanElement) errorMargin = `${linkSpanElement.offsetWidth}px`;
    if (errors.includes("Permalink has already been taken") && newError) {
      this.setErrorMessage("This permalink is already in use. Enter another one.");
    }
    if (!permalinkRegex.test(permalink)) {
      this.setErrorMessage("Use only numbers, lowercase letters, underscores, or hyphens.");
    }
    return(
      <section className={`upload-form-${page}`}>

        {uploadButtonDiv}
        <form onSubmit={this.handleSubmit} className="song-upload-form">
          <div className="sf-main">
            <input type="file" id="file-input" onChange={this.handleFile} />
            <div className="artwork-div">
              <img src={artworkUrl} className="upload-artwork"></img>
              <input type="file" id="artwork-input" onChange={this.handleImage} />
              <button onClick={this.handleUploadButton("artwork-input")}
                className="image-update-button" type="button">
                <span>
                  <i className="fas fa-camera"></i>&nbsp;Update image
                </span>
              </button>
            </div>
            <div className="upload-form-inner-div">
              <div className="upload-form-input-div">
                <label>
                  <span className="label-span">
                    Title:&nbsp;<strong className="asterick-wrapper">*</strong>
                  </span>
                <input className="upload-form-input" value={title}
                  onChange={this.handleUpdate('title')} required="required"/>
                </label>
              </div>
              <div className="upload-form-input-div" id="upload-form-permalink-div">
                <label className="form-permalink-label"
                  htmlFor="upload-form-permalink-input">
                  <span className="form-permalink-span" id="song-form-link-span">
                    elitebeats.herokuapp.com/#/{currentUser.profile_url}/
                  </span>
                </label>
                <input id="upload-form-permalink-input"
                  className={`url-input ${this.validationError}`} value={permalink}
                  onChange={this.handleUpdate('permalink')} required="required"
                  onClick={this.clickUrlEdit} />
                <button type="button" className="permalink-edit-button"
                  onClick={this.clickUrlEdit}>
                  <i className="fas fa-pencil-alt link-edit-pencil" />
                </button>
              </div>
              <div className={`permalink-validation ${this.pLinkErrorDisabled}`} style={{ marginLeft: `${errorMargin}` }}>
                {this.errorMessage}
              </div>
              <div className="upload-form-input-div">
                <label>
                  <span className="genre-span">Genre:</span>
                  <select className="genre-select upload-form-input"
                    onChange={this.handleUpdate('genre')} value={this.state.genre}>
                    <option value="none">None</option>
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
                    className="upload-form-input sf-description"
                    onChange={this.handleUpdate('description')}
                    value={description}
                    placeholder="Describe your track"/>
                </label>
              </div>
            </div>
          </div>
          <div className="form-footer">
            <div className="upload-form-buttons-div">
              <button type="button" className={`form-cancel-button ${btnDisabled}`}
                onClick={this.handleCancel} disabled={disabled}>
                <span>Cancel</span>
              </button>
              <button type="submit" className={`form-save-button ${this.saveButtonDisabled}`}
                disabled={this.saveButtonDisabled}>
                <span>Save</span>
              </button>
            </div>
          </div>
        </form>
      </section>
    );
  }
}
export default SongUploadForm;
