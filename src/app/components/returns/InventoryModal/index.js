import React, {Component} from 'react';

export default class InventoryModal extends Component {
  constructor() {
    super();
    
  }

render() {
  return (
    <div>
      {this.props.itemSearch.length > 0 &&
        <div>
          <h2>There are {itemsNode.length} matches</h2>
          <div>{itemsNode}</div>
        </div>
      } 
    </div>
  );
}

}
