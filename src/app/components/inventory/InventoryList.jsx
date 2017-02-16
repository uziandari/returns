import React, {Component} from 'react';

export default class InventoryList extends Component {
  constructor(props) {
    super(props);
  }


  render() {

    var itemsNode = this.props.items.map((item, index) => {
      return (
        <div key={index}>
          <h3>{item.sku}</h3>
          <p>{item.description}</p>
          <h2>{item.location}</h2>
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