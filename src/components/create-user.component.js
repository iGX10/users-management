import React, { Component } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

export default class CreateUser extends Component {
  constructor(props) {
    super(props);

    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangeGender = this.onChangeGender.bind(this);
    this.onChangeDob = this.onChangeDob.bind(this);
    this.onChangeNews = this.onChangeNews.bind(this);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangePhoto = this.onChangePhoto.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      username: '',
      gender: '',
      dob: new Date(),
      news: false,
      email: '',
      photo: '',
      genderList: ['male', 'female'],
      newsList: ['false', 'true']
    }
  }

  componentDidMount() {
    this.setState({
        gender: this.state.genderList[0]
      })
  }

  onChangeUsername(e) {
    this.setState({
      username: e.target.value
    });
  }

  onChangeGender(e) {
    this.setState({
      gender: e.target.value
    });
  }

  onChangeDob(date) {
    this.setState({
      dob: date
    });
  }

  onChangeNews(e) {
    this.setState({
      news: Boolean(e.target.value)
    });
  }

  onChangeEmail(e) {
    this.setState({
      email: e.target.value
    });
  }

  onChangePhoto(e) {
    this.setState({
      photo: e.target.value
    });
  }

  onSubmit(e) {
    e.preventDefault();

    const user = {
      username: this.state.username,
      gender: this.state.gender,
      dob: this.state.dob,
      news: this.state.news,
      email: this.state.email,
      photo: this.state.photo
    }

    console.log(user);

    axios.post('http://localhost:5000/users/add', user)
      .then(res => console.log(res.data));

    window.location = "/";
  }

  render() {
    return (
      <div>
        <h3>Create New User</h3>
        <form onSubmit={this.onSubmit}>
          <div className="form-group"> 
            <label>Username: </label>
            <input  type="text"
                required
                className="form-control"
                value={this.state.username}
                onChange={this.onChangeUsername}
                />
          </div>
          <div className="form-group"> 
            <label>Gender: </label>
            <select ref="genderInput"
                required
                className="form-control"
                value={this.state.gender}
                onChange={this.onChangeGender}>
                {
                  this.state.genderList.map(function(selectedGender) {
                    return <option 
                      key={selectedGender}
                      value={selectedGender}>{selectedGender}
                      </option>;
                  })
                }
            </select>
          </div>
          <div className="form-group">
            <label>Date of birth: </label>
            <div>
              <DatePicker
                selected={this.state.dob}
                onChange={this.onChangeDob}
              />
            </div>
          </div>
          <div className="form-group">
            <label>News: </label>
            <select ref="newsInput"
                required
                className="form-control"
                value={this.state.news}
                onChange={this.onChangeNews}>
                {
                  this.state.newsList.map(function(selectedNews) {
                    return <option 
                      key={selectedNews}
                      value={selectedNews}>{selectedNews}
                      </option>;
                  })
                }
            </select>
          </div>
          <div className="form-group">
            <label>Email: </label>
            <input 
                type="text" 
                className="form-control"
                value={this.state.email}
                onChange={this.onChangeEmail}
                />
          </div>
          <div className="form-group">
            <label>Photo: </label>
            <input 
                type="text" 
                className="form-control"
                value={this.state.photo}
                onChange={this.onChangePhoto}
                />
          </div>
          

          <div className="form-group">
            <input type="submit" value="Create User" className="btn btn-primary" />
          </div>
        </form>
      </div>
    )
  }
}