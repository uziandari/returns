import React, {Component} from 'react';
import moment from 'moment';

export default class ReturnTable extends Component {
  constructor(props) {
    super(props);
  }

  checkReturn(item) {
    //this.props.completeReturn(item);
  }


  render() {

    var itemsNode = this.props.items.map((item, index) => {
      let entryTime = moment(item.entryDate).format("MM-DD h:mm");
      return (
        <tr key={index}>
          <td><input className="form-control" type="checkbox" name="complete" checked={item.completed} onChange={ () => this.checkReturn(item.orderNumber)} /></td>
          <td>{entryTime}</td>
          <td>{item.returnCode}-{item.orderNumber}</td>
          <td>{item.trackingNumber}</td>
          <td>{item.noRestockReason}</td>
          <td>{item.sku}</td>
          <td>{item.description}</td>
          <td>{item.upc}</td>
          <td>{item.additionalNotes}</td>
        </tr>
      );
    }); 

    return (
      <table className="table table-condensed table-bordered table-striped">
        <thead>
          <tr>
            <th>Complete?</th>
            <th>Time</th>
            <th>Order#</th>
            <th>Tracking#</th>
            <th>No Restock</th>
            <th>SKU</th>
            <th>Desc.</th>
            <th>UPC</th>
            <th>Notes</th>
          </tr>
        </thead>
        <tbody>
          {itemsNode}
        </tbody>
      </table>
    );
  }

}