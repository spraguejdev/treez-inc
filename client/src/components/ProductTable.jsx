var faker = require('faker');
import React, { Component } from 'react';
import {
  AutoSizer,
  Column,
  Index,
  Table,
  TableProps,
  TableRowProps,
  WindowScroller,
  defaultTableRowRenderer,
  SortDirection
} from 'react-virtualized';

import {
  SortableContainer,
  SortableElement,
  SortEnd,
  SortEndHandler,
  SortEvent
} from 'react-sortable-hoc';

import Checkbox from './Checkbox.jsx';
import { defaultRowRenderer } from 'react-virtualized/dist/commonjs/Table';

const SortableTable = SortableContainer(props => <Table {...props} />);

const SortableRow = SortableElement(props => defaultTableRowRenderer(props));

const sortableRowRenderer = props => {
  return <SortableRow {...props} />;
};

const UoM = ['each', 'g', 'I'];
const icons = ['fas fa-seedling', 'fab fa-pagelines', 'fas fa-tree', 'fas fa-oil-can'];

// Generate a random integer to use for dummy data
function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

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

let list = [];
for (let i = 0, l = 10; i < l; i++) {
  list.push(generateRandomItem(i));
}

class ProductTable extends React.Component {
  constructor(props, context) {
    super(props, context);

    // Generate a list of of objects containing our dummy data

    this.state = {
      sortBy: 'packageLabel',
      // sortDirection: SortDirection.DESC,
      sortedList: [],
      checkedItems: {},
      dataKeys: 0
    };

    this._renderDistributor = this._renderDistributor.bind(this);
    this._renderAssign = this._renderAssign.bind(this);
    this._sort = this._sort.bind(this);
    this._handleChange = this._handleChange.bind(this);
    this._rowRenderer = this._rowRenderer.bind(this);
    this._getItem = this._getItem.bind(this);
  }

  // componentWillUpdate(prevProps, prevState) {
  //   if (this.state.checkedItems !== prevState.checkedItems) {
  //     console.log('Hello');
  //   }
  // }

  componentDidMount() {
    let checkedItems = this.state.checkedItems;
    list.forEach(item => {
      checkedItems[item.packageLabel] = false;
    });
    this.setState({ sortedList: list, checkedItems: checkedItems });
  }

  // componentDidUpdate(prevProps, prevState) {
  //   if (this.props.sortOrder !== prevProps.sortOrder) {
  //     console.log('hello');
  //     this.tableRef.forceUpdateGrid();
  //   }
  // }

  _renderDistributor(data = TableCellProps) {
    const { distributor, productName, icon, packageLabel } = data.rowData;
    return (
      <div data-key="0">
        <Checkbox
          name={packageLabel}
          checked={this.state.checkedItems[packageLabel]}
          onChange={this._handleChange}
        />
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

  _renderUnits(data = TableCellProps) {
    const { units } = data.rowData;
    return (
      <div>
        <input type="text" placeholder={units} style={{ width: '35px' }} />
      </div>
    );
  }

  _renderAssign(data = TableCellProps) {
    const { action } = data.rowData;
    return (
      <div>
        <i className="fas fa-sort" style={{ paddingRight: '20px' }}></i>
        <i className={action} style={{ paddingRight: '10px' }}></i>
      </div>
    );
  }

  _sort({ sortBy, sortDirection }) {
    let sortedList = list.sort((a, b) => {
      return a.packageLabel - b.packageLabel;
    });
    sortedList = sortDirection === SortDirection.DESC ? list.reverse() : list;
    this.setState({ sortBy, sortDirection, sortedList });
  }

  _handleChange(e) {
    let item = e.target.name;
    let isChecked = e.target.checked;
    let prevCheckedItems = this.state.checkedItems;
    prevCheckedItems.item = isChecked;
    this.setState({ checkedItems: prevCheckedItems });
    (() => {
      this.tableRef.forceUpdateGrid();
    })();
    // console.log(this.tableRef.forceUpdateGrid());
  }

  // _rowRenderer(props) {
  //   var style = '';
  //   if (this.state.dataKeys > -1 && this.state.dataKeys < 3) {
  //     this.state.dataKeys++;
  //   } else {
  //     this.state.dataKeys = 0;
  //   }
  //   var temp = this.state.dataKeys.toString();
  //   if (temp === '0') {
  //     style = 'border-one';
  //   } else if (temp === '1') {
  //     style = 'border-two';
  //   } else if (temp === '2') {
  //     style = 'border-three';
  //   } else {
  //     style = 'border-four';
  //   }
  //   return (
  //     <div key={props.key} className={style} data-key={this.state.dataKeys}>
  //       {defaultTableRowRenderer(props)}
  //     </div>
  //   );
  // }

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
              {...this.props}
              handleChange={this._handleChange}
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
                cellRenderer={this._renderDistributor}
                width={width * 0.6}
              />
              <Column width={width * 0.15} label="Size" dataKey="size" />
              <Column width={width * 0.15} label="UoM" dataKey="uom" />
              <Column
                width={width * 0.55}
                label="Package Label"
                dataKey="packageLabel"
                disableSort={false}
              />
              <Column width={width * 0.3} label="Discount" dataKey="discount" />
              <Column width={width * 0.3} label="Fees" dataKey="fees" />
              <Column width={width * 0.3} label="Price" dataKey="price" />
              <Column width={width * 0.3} label="Base Cost" dataKey="baseCost" />
              <Column
                width={width * 0.2}
                label="Units"
                dataKey="units"
                cellRenderer={this._renderUnits}
              />
              <Column width={width * 0.35} label="Total Cost" dataKey="totalCost" />
              <Column
                width={width * 0.2}
                label="Action"
                dataKey="action"
                cellRenderer={this._renderAssign}
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
