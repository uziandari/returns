import React, {Component} from 'react';

export default class SingleReturn extends Component {
  constructor() {
    super();
    this.state = {
      items: [],
      value: '',
      results: ''
    };
  }

  render() {

    return (
      <div>
        SingleView Component
      </div>        
    )
  }

}