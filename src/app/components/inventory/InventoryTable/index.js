import React, {Component} from 'react';

export default class InventoryTable extends Component {
  constructor(props) {
    super(props);
  }

  render() {

    var itemsNode = this.props.items.map((item, index) => {
      return (
        <div key={index}>
          <h3>{item.sku}</h3>
          <p>{item.description}</p>
          <h2>{item.location}, {item.upc}</h2>
        </div>
      );
    }); 

    return (
      <div>
        {this.props.items.length === 0 &&
          <h2>Nothing Found :(</h2>
        }
        {itemsNode}
      </div>
    );
  }

}