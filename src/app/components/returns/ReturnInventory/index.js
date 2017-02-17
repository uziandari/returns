import React, {Component} from 'react';
import firebase from 'firebase';

import ReturnList from '../ReturnTable/index';

export default class ReturnInventory extends Component {
  constructor() {
    super();
    this.state = {
      items: [],
      value: '',
      results: ''
    };
    this.submitSearch = this.submitSearch.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentWillMount() {  
    this.firebaseRef = firebase.database().ref("returns");
  }

  componentDidMount() {
    this.firebaseRef.on('value', (dataSnapshot) => {
      let returns = [];
        dataSnapshot.forEach((child) => {
          returns.push(child.val());
        })
      this.setState({
        items: returns
      });
    })
  }

  componentWillUnmount() {  
    this.firebaseRef.off();
  };

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  submitSearch(event) {
    
}
  

  

  render() {

    return (
      <div>
        <div className="form-group">
          <form onSubmit={this.submitSearch}>
          <input className="form-control" placeholder="Search Returns..." type="text" value={this.state.value} onChange={this.handleChange} />
          </form>
        </div>
        < ReturnList items={this.state.items} />
      </div>        
    )
  }

}