var faker = require('faker');
import React, { Component } from 'react';
const UoM = ['each', 'g', 'I'];

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

function createRecord(count) {
  let records = [];

  for (let i = 0; i < count; i++) {
    records.push({
      distributor: 'Eden Extracts',
      productName: faker.commerce.productName(),
      size: 3.5,
      uom: UoM[getRandomInt(3)],
      packageLabel: getRandomInt(5000000000),
      discount: faker.commerce.price(),
      fees: faker.commerce.price(),
      price: faker.commerce.price(),
      baseCost: faker.commerce.price(),
      units: getRandomInt(300),
      totalCost: '60,000'
    });
  }
  return records;
}

const records = createRecord(10);

class ProductTable extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return <div>Hello World</div>;
  }
}

export default ProductTable;
