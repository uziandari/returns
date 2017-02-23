import React, {Component} from 'react';

//import css
import './style.scss';

export default class InventoryTable extends Component {
  constructor(props) {
    super(props);
  }

  render() {

    var itemsNode = this.props.items.map((item, index) => {

      var productImage = 'http://rockbottomimages.com/ProductImages/random/NoImage2.jpg';

      return (
        <div key={index} className="col-xs-12">
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
      <div className="container">
        <div className="row">
        {this.props.items.length === 0 &&
          <h2>Nothing Found :(</h2>
        }
        {itemsNode}
        </div>
      </div>
    );
  }

}

  