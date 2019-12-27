import React, { Component } from 'react';
import axios from 'axios';

export default class MockUsers extends Component {

    constructor(props) {
        super(props);

        this.mockUsers = this.mockUsers.bind(this);

        this.state = {
            nbrUsers: 0,
            remainingUsers: 0,
            users: []
        };
    }

    componentDidMount() {
        axios.get('http://localhost:5000/users/')
            .then(response => {
                this.setState({ 
                    nbrUsers: response.data.length,
                    remainingUsers: 100-response.data.length,
                    users: response.data
                });
                //console.log(this.state);
            })
            .catch((error) => {
                console.log(error);
            })
    }

    mockUsers(nbrToMock) {
        for(var i = 0; i<nbrToMock; i++) {

            axios.get('https://randomuser.me/api/')
            .then(response => {
                //console.log(response.data.results);
                
                const user = {
                    username: response.data.results[0].login.username,
                    gender: response.data.results[0].gender,
                    dob: new Date(response.data.results[0].dob.date),
                    news: true,
                    email: response.data.results[0].email,
                    photo: response.data.results[0].picture.thumbnail
                  }

                //console.log(user);

                axios.post('http://localhost:5000/users/add', user)
                    .then(res => console.log(res.data));
            })
            .catch((error) => {
                console.log(error);
            })

            //window.location = '/';
        }
    }

  render() {
    return (
      <div>
        <p>Number of users in the Database : {this.state.nbrUsers}</p>
        <br/>
        <p>Click ce bouton pour mocker : {this.state.remainingUsers}</p>
        <br/>
        <button className="btn btn-primary" onClick={() => this.mockUsers(this.state.remainingUsers)}>Mock Users</button>
      </div>
    )
  }
}