import React, {Component} from 'react';
import firebase from 'firebase';

import SearchInventory from './SearchInventory';

export default class ReturnInventory extends Component {
  constructor() {
    super();
    this.state = {
      trackingNumber: '',
      orderNumber: '',
      returnCode: '',
      isElectronic: false,
      electronicSerial: null,
      noRestock: false,
      noRestockReason: '',
      additionalNotes: '',
    };
    this.submitSearch = this.submitSearch.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

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
          <input className="form-control" placeholder="Tracking #" type="text" value={this.state.trackingNumber} onChange={this.handleChange} />
          <input className="form-control" placeholder="Order #" type="text" value={this.state.orderNumber} onChange={this.handleChange} />
          <input className="form-control" placeholder="" type="text" value={this.state.returnCode} onChange={this.handleChange} />
          <input className="form-control" placeholder="" type="text" value={this.state.isElectronic} onChange={this.handleChange} />
          <input className="form-control" placeholder="" type="text" value={this.state.electionicSerial} onChange={this.handleChange} />
          <input className="form-control" placeholder="" type="text" value={this.state.noRestock} onChange={this.handleChange} />
          <input className="form-control" placeholder="" type="text" value={this.state.noRestockReason} onChange={this.handleChange} />
          <input className="form-control" placeholder="" type="text" value={this.state.additionalNotes} onChange={this.handleChange} />
          </form>
        </div>
      </div>        
    )
  }

}