import React, {Component} from 'react';
import firebase from 'firebase';

import InventoryTable from '../InventoryTable/index';

export default class InventorySearch extends Component {
  constructor() {
    super();
    this.state = {
      items: [],
      value: '',
      results: '',
      searchField: 'upc'
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
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  submitSearch(event) {
    console.log(`A search was submitted: ${this.state.value}`);
    event.preventDefault();

    let searchUpc = this.state.value;
    let searchVal = '';

    if (this.state.searchField === 'upc') {
      let pad = "000000000000";
      searchVal = pad.substring(0, pad.length - searchUpc.length) + searchUpc;
    } else {
      searchVal = this.state.value;
    }

    this.firebaseRef.orderByChild(this.state.searchField).equalTo(searchVal.toUpperCase().trim()).once('value').then(function(dataSnapshot) {
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
        <div className="form-group row">
          <form onSubmit={this.submitSearch}>
            <label htmlFor="return-type-select" className="col-sm-2">Search In: </label>
              <div className="col-sm-2">
                <select className="form-control" name="searchField" value={this.state.searchField} onChange={this.handleChange}>
                    <option value="upc">UPC</option>
                    <option value="sku">SKU</option>
                    <option value="location">Location</option>
                </select>
              </div>
              <div className="col-sm-8">
                <input className="form-control" placeholder="Search Returns..." type="text" name="value" value={this.state.value} onChange={this.handleChange} />
              </div>
          </form>
        </div>
        < InventoryTable items={this.state.items} />
      </div>        
    )
  }

}