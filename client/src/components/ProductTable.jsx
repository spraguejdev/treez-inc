var faker = require('faker');
import React, { Component } from 'react';
import {
  AutoSizer,
  Column,
  Index,
  Table,
  defaultTableRowRenderer,
  SortDirection
} from 'react-virtualized';
import { SortableContainer, SortableElement } from 'react-sortable-hoc';
import Checkbox from './Checkbox.jsx';

// Initialize react-sortable-hox
const SortableTable = SortableContainer(props => <Table {...props} />);

const SortableRow = SortableElement(props => defaultTableRowRenderer(props));

const sortableRowRenderer = props => {
  return <SortableRow {...props} />;
};

class ProductTable extends React.Component {
  constructor(props, context) {
    super(props, context);

    // Generate a list of of objects containing our dummy data
    this.state = {
      sortBy: 'packageLabel',
      sortDirection: SortDirection.DESC,
      sortedList: [],
      dataKeys: 0
    };

    this._renderDistributorColumn = this._renderDistributorColumn.bind(this);
    this._renderUnitsColumn = this._renderUnitsColumn.bind(this);
    this._renderAssignColumn = this._renderAssignColumn.bind(this);
    this._sort = this._sort.bind(this);
    this._rowRenderer = this._rowRenderer.bind(this);
    this._headerRowRenderer = this._headerRowRenderer.bind(this);
    this._getItem = this._getItem.bind(this);
  }

  componentDidMount() {
    const list = this._getDefaultItems();
    this.setState({ sortedList: list });
  }

  _getDefaultItems() {
    let list = [];
    const UoM = ['each', 'g', 'I'];
    const icons = ['fas fa-seedling', 'fab fa-pagelines', 'fas fa-tree', 'fas fa-oil-can'];
    const getRandomInt = max => {
      return Math.floor(Math.random() * Math.floor(max));
    };

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

    for (let i = 0, l = 1000; i < l; i++) {
      list.push(generateRandomItem(i));
    }
    return list;
  }

  _renderDistributorColumn(data = TableCellProps) {
    const { distributor, productName, icon, packageLabel } = data.rowData;

    return (
      <div data-key="0">
        <Checkbox style="checkbox-row-style" name={packageLabel} />
        <div>
          <p className="distributor">
            <i className={icon} style={{ float: 'left', fontSize: '20px', paddingTop: '3px' }}></i>
            <span id="distName">{distributor}</span>
            <br></br>
            {productName}
          </p>
        </div>
      </div>
    );
  }

  _renderUnitsColumn(data = TableCellProps) {
    const { units, packageLabel, key, style } = data.rowData;
    const index = data.rowIndex;
    let rowData = data.parent.props.sortedList[index];

    return (
      <div>
        <input
          key={key}
          type="text"
          onChange={event => {
            rowData.units = event.target.value;
          }}
          placeholder={units}
          name={packageLabel}
        />
      </div>
    );
  }

  _renderAssignColumn(data = TableCellProps) {
    const { action } = data.rowData;
    return (
      <div>
        <i className="fas fa-sort" style={{ paddingRight: '20px' }}></i>
        <i className={action} style={{ paddingRight: '10px' }}></i>
      </div>
    );
  }

  _headerRowRenderer(props) {
    const { className, columns, style } = props;
    return (
      <div className={className} role="row" style={style}>
        {columns}
      </div>
    );
  }

  _sort({ sortBy, sortDirection }) {
    let sortedList = this.state.sortedList.sort((a, b) => {
      return a.packageLabel - b.packageLabel;
    });
    sortedList = sortDirection === SortDirection.DESC ? sortedList.reverse() : sortedList;
    this.setState({ sortBy, sortDirection, sortedList });
  }

  _rowRenderer(props) {
    return defaultTableRowRenderer(props);
  }

  render() {
    return (
      <div className="container">
        <h1>Treez, Inc</h1>
        <AutoSizer>
          {({ width }) => (
            <SortableTable
              {...this.state}
              handleChange={this._handleCheckboxChange}
              rowRenderer={sortableRowRenderer}
              ref={ref => (this.tableRef = ref)}
              className="table-row"
              headerHeight={40}
              width={width}
              height={500}
              rowHeight={60}
              rowCount={this.state.sortedList.length}
              rowGetter={this._getItem}
              sort={this._sort}
              sortBy={this.state.sortBy}
              sortDirection={this.state.sortDirection}
              rowStyle={{}}
            >
              <Column
                dataKey="distributor"
                label="Distributor"
                cellRenderer={this._renderDistributorColumn}
                width={width * 0.6}
                disableSort={true}
              />
              <Column width={width * 0.15} label="Size" dataKey="size" disableSort={true} />
              <Column width={width * 0.15} label="UoM" dataKey="uom" disableSort={true} />
              <Column
                width={width * 0.55}
                label="Package Label"
                dataKey="packageLabel"
                disableSort={false}
              />
              <Column width={width * 0.3} label="Discount" dataKey="discount" disableSort={true} />
              <Column width={width * 0.3} label="Fees" dataKey="fees" disableSort={true} />
              <Column width={width * 0.3} label="Price" dataKey="price" disableSort={true} />
              <Column width={width * 0.3} label="Base Cost" dataKey="baseCost" disableSort={true} />
              <Column
                width={width * 0.2}
                label="Units"
                dataKey="units"
                cellRenderer={this._renderUnitsColumn}
                disableSort={true}
              />
              <Column
                width={width * 0.35}
                label="Total Cost"
                dataKey="totalCost"
                disableSort={true}
              />
              <Column
                width={width * 0.2}
                label="Action"
                dataKey="action"
                cellRenderer={this._renderAssignColumn}
                disableSort={true}
              />
            </SortableTable>
          )}
        </AutoSizer>
      </div>
    );
  }

  _getItem(info) {
    const rows = this.state.sortedList;
    const row = rows[info.index];
    return row;
  }
}

export default ProductTable;
