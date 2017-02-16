import React, {Component} from 'react';
import firebase from 'firebase';

import InventoryList from './InventoryList';

export default class SearchInventory extends Component {
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
    this.firebaseRef = firebase.database().ref("inventory");
  }

  componentWillUnmount() {  
    this.firebaseRef.off();
  };

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  submitSearch(event) {
    console.log(`A upc was submitted: ${this.state.value}`);
    event.preventDefault();


    this.firebaseRef.orderByChild('upc').equalTo(this.state.value).once('value').then(function(dataSnapshot) {
        var itemsArr = [];
        dataSnapshot.forEach(function(childSnapshot) {
            itemsArr.push(childSnapshot.val());
        });
        return Promise.all(itemsArr);
    }, function(error) {
        // The Promise was rejected.
        console.error(error);
    }).then(function(values) { 
        console.log('Results: ', values);
        this.setState({
          items: values
        })
    }.bind(this));
}
  

  

  render() {

    return (
      <div>
        <div className="form-group">
          <form onSubmit={this.submitSearch}>
          <input className="form-control" placeholder="Scan UPC..." type="text" value={this.state.value} onChange={this.handleChange} />
          </form>
        </div>
        < InventoryList items={this.state.items} />
      </div>        
    )
  }

}