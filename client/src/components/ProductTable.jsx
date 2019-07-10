var faker = require('faker');
import React, { Component } from 'react';
import { Column, Table, AutoSizer } from 'react-virtualized';
// import 'react-virtualized/styles.css'; // only needs to be imported once

const UoM = ['each', 'g', 'I'];

// Generate a random integer to use for dummy data
function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}
const icons = ['fas fa-seedling', 'fab fa-pagelines', 'fas fa-tree', 'fas fa-oil-can'];

// Generate an object containing our dummyData
const generateRandomItem = idx => ({
  distributor: 'Eden Extracts',
  productName: faker.commerce.productName(),
  size: 3.5,
  uom: UoM[getRandomInt(3)],
  packageLabel: getRandomInt(5000000000),
  discount: '$' + faker.commerce.price(),
  fees: '$' + faker.commerce.price(),
  price: '$' + faker.commerce.price(),
  baseCost: '$' + faker.commerce.price(),
  units: getRandomInt(300),
  totalCost: '$60,000',
  icon: icons[getRandomInt(4)],
  action: 'fas fa-ellipsis-v'
});

class ProductTable extends React.Component {
  constructor() {
    super();

    // Generate a list of of objects containing our dummy data
    let items = [];
    for (let i = 0, l = 10; i < l; i++) {
      items.push(generateRandomItem(i));
    }
    this.state = {
      items: items
    };

    // this._headerRenderer = this._headerRenderer.bind(this);
    this._renderDistributor = this._renderDistributor.bind(this);
    this._renderAssign = this._renderAssign.bind(this);
  }

  _renderDistributor(data = TableCellProps) {
    const { distributor, productName, icon } = data.rowData;

    return (
      <div>
        <p className="distributor">
          <i className={icon} style={{ float: 'left', fontSize: '20px', paddingTop: '5px' }}></i>
          <span id="distName">{distributor}</span>
          <br></br>
          {productName}
        </p>
      </div>
    );
  }

  _renderAssign(data = TableCellProps) {
    const { action } = data.rowData;
    return (
      <div>
        <i class="fas fa-sort" style={{ paddingRight: '20px' }}></i>
        <i class={action} style={{ paddingRight: '10px' }}></i>
      </div>
    );
  }
  render() {
    return (
      <div className="container">
        <h1>Treez, Inc</h1>
        <AutoSizer>
          {({ width }) => (
            <Table
              rowClassName="table-row"
              headerHeight={40}
              width={width}
              height={500}
              rowHeight={60}
              rowCount={this.state.items.length}
              rowGetter={({ index }) => this.state.items[index]}
            >
              <Column
                dataKey="distributor"
                label="Distributor"
                cellRenderer={this._renderDistributor}
                width={width * 0.55}
              />
              <Column width={width * 0.15} label="Size" dataKey="size" />
              <Column width={width * 0.15} label="UoM" dataKey="uom" />
              <Column width={width * 0.55} label="Package Label" dataKey="packageLabel" />
              <Column width={width * 0.3} label="Discount" dataKey="discount" />
              <Column width={width * 0.3} label="Fees" dataKey="fees" />
              <Column width={width * 0.3} label="Price" dataKey="price" />
              <Column width={width * 0.3} label="Base Cost" dataKey="baseCost" />
              <Column width={width * 0.2} label="Units" dataKey="units" />
              <Column width={width * 0.35} label="Total Cost" dataKey="totalCost" />
              <Column
                width={width * 0.2}
                label="Action"
                dataKey="action"
                cellRenderer={this._renderAssign}
              />
            </Table>
          )}
        </AutoSizer>
      </div>
    );
  }
}

export default ProductTable;
