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
    this.completeReturn = this.completeReturn.bind(this);
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


//update to reflect completed
  completeReturn(index) {
    //this.firebaseRef.orderByChild('orderNumber').equalTo(index).once('value', (dataSnapshot) => {
    //update firebase     
 
    //})
  }

  render() {

    return (
      <div>
        < ReturnTable items={this.state.items} completeReturn={this.completeReturn} />
      </div>        
    )
  }

}