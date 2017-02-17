import React, {Component} from 'react';
import firebase from 'firebase';

import ReturnInventory from '../ReturnInventory/index';
import './style.scss'

function validate(tracking, order) {
    return {
      tracking: tracking.length === 0,
      order: order.length === 0,
    };
  }

export default class ReturnForm extends Component {
  constructor() {
    super();
    this.state = {
      trackingNumber: '',
      orderNumber: '',
      returnCode: 'RAVR',
      isElectronic: false,
      electronicSerial: null,
      toRestock: true,
      noRestockReason: null,
      additionalNotes: null,
      touched: {
        trackingNumber: false,
        orderNumber: false
      }
    };
    this.baseState = this.state;
    this.resetForm = this.resetForm.bind(this);
    this.submitReturn = this.submitReturn.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
  }

  // Firebase Push data

  componentWillMount() {  
    this.firebaseRef = firebase.database().ref("/returns");
  }

  componentWillUnmount() {  
    this.firebaseRef.off();
  };

  resetForm = () => {
    this.setState(this.baseState)
  }

  submitReturn = (event) => {
    if (!this.canBeSubmitted()) {
      event.preventDefault();
      return;
    }
    event.preventDefault();
    let timestamp = new Date().getTime();
    this.firebaseRef.push({
      entryDate: timestamp,
      trackingNumber: this.state.trackingNumber,
      orderNumber: this.state.orderNumber,
      returnCode: this.state.returnCode,
      isElectronic: this.state.isElectronic,
      electronicSerial: this.state.electronicSerial,
      toRestock: this.state.toRestock,
      noRestockReason: this.state.noRestockReason,
      additionalNotes: this.state.additionalNotes
    });
    this.resetForm();
  };


  //END FIREBASE

  handleChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  canBeSubmitted() {
    const tracking = this.state.trackingNumber;
    const order = this.state.orderNumber;
    return (
      tracking.length > 0 &&
      order.length > 0
    );
  }
 
 handleBlur = (field) => (evt) => {
    this.setState({
      touched: { ...this.state.touched, [field]: true },
    });
  }

  render() {
    const shouldMarkError = (field) => {
      const hasError = errors[field];
      const shouldShow = this.state.touched[field];

      return hasError ? shouldShow : false;
    };
    const errors = validate(this.state.trackingNumber, this.state.orderNumber); 
    const isEnabled = !Object.keys(errors).some(x => errors[x]);
    const electronicText = this.state.isElectronic 
      ? <div className="col-sm-4"> <input className="form-control" placeholder="Serial #..." type="text" name="electronicSerial" value={this.state.electronicSerial} onChange={this.handleChange} /></div>
      : null;
    const toRestockText = this.state.toRestock 
      ? null
      : <div className="col-sm-3">
          <select className="form-control" name="noRestockReason" value={this.state.noRestockReason} onChange={this.handleChange}>
              <option value="">Select Reason</option>
              <option value="NA Location">NA Location</option>
              <option value="Defective Item">Defective Item</option>
              <option value="Used Item">Used Item</option>
              <option value="Electronics Return">Electronics Return</option>
              <option value="Other">Other</option>
          </select>
        </div>;


    return (
      <div>
         <form onSubmit={this.submitReturn}>
          <div className="form-group row">
            <label htmlFor="tracking-number-input" className="col-sm-2 col-form-label">Tracking #</label>
            <div className="col-sm-4">
              <input className={shouldMarkError('tracking') ? "error form-control" : "form-control"}
                onBlur={this.handleBlur('tracking')}
                placeholder="Tracking #" type="text" name="trackingNumber" 
                value={this.state.trackingNumber} 
                onChange={this.handleChange} />
            </div>
          </div>
          <div className="form-group row">
            <label htmlFor="order-number-input" className="col-sm-2 col-form-label">Order #</label>
            <div className="col-sm-4">
              <input className={shouldMarkError('order') ? "error form-control" : "form-control"}
                onBlur={this.handleBlur('order')}
                placeholder="Order #" type="text" name="orderNumber" 
                value={this.state.orderNumber} 
                onChange={this.handleChange} />
            </div>
          </div>
          <div className="form-group row">
            <label htmlFor="return-type-select" className="col-sm-2 col-form-label">Return Type</label>
              <div className="col-sm-3">
                <select className="form-control" name="returnCode" value={this.state.returnCode} onChange={this.handleChange}>
                    <option value="RAVR">RAVR</option>
                    <option value="RADE">RADE</option>
                    <option value="RAIR">RAIR</option>
                    <option value="Unknown">Unknown</option>
                </select>
              </div>
          </div>
          <div className="form-group row">
            <label htmlFor="electronic-serial-checkbox" className="col-sm-2 col-form-label">Electronic Return</label>
            <div className="col-sm-1">
              <input className="form-control" type="checkbox" name="isElectronic" checked={this.state.isElectronic} onChange={this.handleChange} />
            </div>
            { electronicText }
          </div>
          <div className="form-group row">
            <label htmlFor="return-stock-checkbox" className="col-sm-2 col-form-label">Return to stock</label>
            <div className="col-sm-1">  
              <input className="form-control" type="checkbox" name="toRestock" checked={this.state.toRestock} onChange={this.handleChange} />
            </div>
            { toRestockText }
          </div>
          <div className="form-group row">
            <div className="col-sm-2">
              <button disabled={!isEnabled}
                className={isEnabled ? "btn btn-primary" : "btn btn-danger"}>
                Submit Return
              </button>
            </div>
            <div className="col-sm-2">
              <button className="btn btn-warning" onClick={this.resetForm}>Cancel</button>
            </div>
          </div>
          </form>

          <div className="row">
            <ReturnInventory />
          </div>
      </div>        
    )
  }

}