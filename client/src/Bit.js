import React, {Component} from 'react';
import {Map} from 'immutable';

export default class Bit extends Component {
  getBit() {
    return this.props.bit || Map();
  }

  render() {
    return (
      <div className="panel panel-default">
        <div className = "panel-heading">
          <h3 className="panel-title">
            <button type="button" className="btn">
              <span className="glyphicon glyphicon-thumbs-down" />
            </button>
            { " " } {this.getBit().get('upvotes') - this.getBit().get('downvotes')} { " " }
            <button type="button" className="btn">
              <span className="glyphicon glyphicon-thumbs-up" />
            </button>
            { " " } {this.getBit().get('title')}
          </h3>
        </div>
        <div className="panel-body">
          <p>
            <b>{this.getBit().get('author').get('name')}</b> 
            { " " } &#x2022; { " " }
            <i>{this.getBit().get('date_created').toDateString()}</i>
          </p>

          {this.getBit().get('content')}
        </div>
      </div>
    );
  }
}