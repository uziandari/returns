import React, {Component} from 'react';
import firebase from 'firebase';

import ReturnTable from '../ReturnTable/index';

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
    this.firebaseRef.orderByChild('entryDate').on('value', (dataSnapshot) => {
      let returns = [];
        dataSnapshot.forEach((child) => {
          returns.push(child.val());
        })
      returns.reverse();
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
        < ReturnTable items={this.state.items} />
      </div>        
    )
  }

}