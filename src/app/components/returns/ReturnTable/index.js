import React, {Component} from 'react';

export default class ReturnTable extends Component {
  constructor(props) {
    super(props);
  }


  render() {

    var itemsNode = this.props.items.map((item, index) => {
      return (
        <tr key={index}>
          <td>{item.entryDate}</td>
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