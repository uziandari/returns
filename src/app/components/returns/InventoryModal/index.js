import React, { Component } from 'react';
import Modal from 'react-modal';

export default class InventoryModal extends Component {
  constructor(props) {
    super(props);
  }

  itemSelected(event) {
    event.preventDefault();
    console.log(event.target);
    this.props.selectFromItems();
  }

   render() {

    var itemsNode = this.props.itemList.map((item, index) => {
      return (
        <div key={index}>
          <h3>{item.sku}</h3>
        </div>
      );
    }); 

    return (
      <Modal
        isOpen={ this.props.modalIsOpen }
        contentLabel="Select Correct Item"
        onRequestClose={ () => this.props.onRequestClose() }>
        <div>
          <button className="btn btn-default" onClick={() => this.props.onRequestClose()}>close</button>
          {itemsNode}
        </div>
      </Modal>
    );
  }

}