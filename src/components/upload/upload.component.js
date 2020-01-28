import React, { Component } from 'react';
import './upload.component.css';
import { post } from 'axios';

export default class Upload extends Component {

  constructor(props) {
    super(props);
    this.state = {
      file: null
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.onChangeHandler = this.onChangeHandler.bind(this)
    this.fileUpload = this.fileUpload.bind(this)
  }

  onChangeHandler(e) {
    var files = e.target.files;
    console.warn(files);
    this.setState({
      file: e.target.files[0]
    })
  }

  handleSubmit(e) {
    e.preventDefault();
    this.fileUpload(this.state.file).then((response)=>{
      if(response) {
        this.props.history.push('/')
      }
    })
    }

  fileUpload(file) {
    const url = 'https://textile-movements-backend.herokuapp.com/movements';
    const formData = new FormData();
    formData.append('file', file)
    const config = {
      headers: {
        'content-type': 'multipart/form-data'
      }
    }
    return post(url, formData, config)
  }

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-6">
            <form onSubmit = {this.handleSubmit}>
              <div className="form-group files">
                <label>Shipping Movements Dashboard </label>
                <input type="file" id="file" name='file' className="form-control" onChange={this.onChangeHandler}/>
                <button className="form-control" type="submit" htmlFor="name">Upload</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    )
  }
}