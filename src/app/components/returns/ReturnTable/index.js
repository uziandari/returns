import React, {Component} from 'react';

export default class ReturnsList extends Component {
  constructor(props) {
    super(props);
  }


  render() {

    var itemsNode = this.props.items.map((item, index) => {
      return (
        <div key={index}>
          <h3>{item.trackingNumber}</h3>
          <p>{item.orderNumber}</p>
        </div>
      );
    }); 

    return (
      <div>
        {itemsNode}
      </div>
    );
  }

}