import React, { Component } from 'react';
import Modal from 'react-modal';

export default class InventoryModal extends Component {
  constructor(props) {
    super(props);
  }

  selectItem(index) {
    this.props.selectFromItems(index);
    this.props.onRequestClose();
  }

   render() {

    var itemsNode = this.props.itemList.map((item, index) => {

      var productImage = 'http://rockbottomimages.com/ProductImages/random/NoImage2.jpg';

      return (
          <div key={index} className="col-xs-12" onClick={ () => this.selectItem(index)}>
            <div className="card">
              <div className="card-image">
                <img src={(item.img_url == "") ? productImage : item.img_url} alt={item.description} />
              </div>
              <div className="card-info">
                <div className="name">
                  <p><strong>{item.location}</strong> | {item.sku}</p>
                </div>
                <hr />
                <div className="content">
                  <p>{item.upc}</p>
                  <p>{item.description}</p>
                  <p></p>
                </div>
              </div>
            </div>
          </div>  
      );
    }); 

    return (
      <Modal
        isOpen={ this.props.modalIsOpen }
        contentLabel="Select Correct Item"
        onRequestClose={ () => this.props.onRequestClose() } >
        <div>
          <button className="btn btn-default" onClick={() => this.props.onRequestClose()}>close</button>
          {itemsNode}
        </div>
      </Modal>
    );
  }

}