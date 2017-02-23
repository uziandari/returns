import React, {Component} from 'react';
import firebase from 'firebase';
import moment from 'moment';

import ReturnInventory from '../ReturnInventory/index';
import InventoryModal from '../InventoryModal/index';
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
      upc: null,
      sku: null,
      description: null,
      touched: {
        trackingNumber: false,
        orderNumber: false
      },
      itemSearch: [],
      selectedItem: null,
      modalIsOpen: false
    };
    this.baseState = this.state;
    this.resetForm = this.resetForm.bind(this);
    this.submitReturn = this.submitReturn.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
    this.findItem = this.findItem.bind(this);
    this.selectFromMultiple = this.selectFromMultiple.bind(this);
  }

  // Firebase Push data

  componentWillMount() {  
    this.firebaseReturnsRef = firebase.database().ref("/returns");
    this.firebaseInventoryRef = firebase.database().ref("/inventory");
  }

  componentWillUnmount() {  
    this.firebaseReturnsRef.off();
    this.firebaseInventoryRef.off();
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
    let timestamp = moment().toDate().getTime();
    this.firebaseReturnsRef.push({
      entryDate: timestamp,
      trackingNumber: this.state.trackingNumber,
      orderNumber: this.state.orderNumber,
      returnCode: this.state.returnCode,
      isElectronic: this.state.isElectronic,
      electronicSerial: this.state.electronicSerial,
      toRestock: this.state.toRestock,
      noRestockReason: this.state.noRestockReason,
      additionalNotes: this.state.additionalNotes,
      upc: this.state.upc,
      sku: this.state.sku,
      description: this.state.description
    });
    this.resetForm();
  };

  //Modal to select proper item

  closeModal() {
    this.setState({
      modalIsOpen: false
    })
  }

  //end Modal


  //END FIREBASE

  handleChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    //look for Item
    let searchUpc = value;
    let searchVal = '';

    if (name === 'upc') {
      let pad = "000000000000";
      searchVal = pad.substring(0, pad.length - searchUpc.length) + searchUpc;
      this.findItem(searchVal);
    } 
    //end search

    this.setState({
      [name]: value
    });
  }

  //find item search on firebase by UPC
  findItem(searchVal) {
    this.firebaseInventoryRef.orderByChild('upc').equalTo(searchVal.toUpperCase()).once('value').then(function(dataSnapshot) {
        var itemsArr = [];
        dataSnapshot.forEach(function(childSnapshot) {
            itemsArr.push(childSnapshot.val());
        });
        return Promise.all(itemsArr);
    }, function(error) {
        // The Promise was rejected.
        console.error(error);
    }).then(function(value) { 
        if (value.length === 1) {
          this.setState({
            sku: value[0].sku,
            description: value[0].description
          })
        } else if (value.length === 0) {
          this.setState({
            sku: null,
            description: null
          })
        } 
        else {
          this.setState({
            itemSearch: value,
            modalIsOpen: true
          })
        }
    }.bind(this));
  }

  //select single item in case of multiple matches to upc
  selectFromMultiple(index) {
    console.log("index is: " + index);
    this.setState({
       sku: this.state.itemSearch[index].sku,
       description: this.state.itemSearch[index].description
     })
  }

  //end find item

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
      const multipleItems = (this.state.itemSearch.length > 1) ?
            <InventoryModal modalIsOpen={this.state.modalIsOpen}
                          itemList={this.state.itemSearch} 
                          onRequestClose={ () => this.closeModal() }
                          selectFromItems={this.selectFromMultiple} />
            : null


    return (
      <div>
          {multipleItems}
          <form onSubmit={this.submitReturn}>
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
              <label htmlFor="additional-notes-input" className="col-sm-2 col-form-label">Notes</label>
              <div className="col-sm-8">
                <input className="form-control" 
                  placeholder="Notes" type="text" name="additionalNotes" 
                  value={this.state.additionalNotes} 
                  onChange={this.handleChange} />
              </div>
            </div>

            <div className="form-group row">
              <label htmlFor="tracking-number-input" className="col-sm-2 col-form-label">Item</label>
              <div className="col-sm-2">
                <input className="form-control"
                  name="upc"
                  placeholder="Scan UPC..."
                  value={this.state.upc} 
                  onChange={this.handleChange} />
              </div>
              <div className="col-sm-3">
                <input className="form-control"
                  name="sku"
                  placeholder="SKU..."
                  value={this.state.sku} 
                  onChange={this.handleChange} />
              </div>
              <div className="col-sm-5">
                <input className="form-control"
                  name="description"
                  placeholder="Description..."
                  value={this.state.description} 
                  onChange={this.handleChange} />
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