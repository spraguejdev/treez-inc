// import React from 'react';
// import { Button, IconButton, Tooltip, Typography } from '@material-ui/core';

// import { Add, DeleteForever } from '@material-ui/icons';

// import {
//   SortableContainer,
//   SortableElement,
//   SortEnd,
//   SortEndHandler,
//   SortEvent
// } from 'react-sortable-hoc';

// const SortableTable = SortableContainer(props => <Table {...props} />);

// const SortableRow = SortableElement(props => defaultTableRowRenderer(props));

// const sortableRowRenderer = props => {
//   return <SortableRow {...props} />;
// };

// class Grid extends React.Component {
//   remove(rowData) {
//     const items = this.state.items;

//     if (!items) {
//       return;
//     }

//     const index = items.indexOf(rowData);

//     const newItems = [...items.slice(0, index), ...items.slice(index + 1)];

//     this.setState({ items: newItems });
//   }

//   constructor(props) {
//     super(props);

//     this.state = {
//       items: []
//     };

//     this.getDefaultItems = this.getDefaultItems.bind(this);
//     this.rowRenderer = this.rowRenderer.bind(this);
//     this.reset = this.reset.bind(this);
//     this.buttonsCellRenderer = this.buttonsCellRenderer.bind(this);
//     this.getItem = this.getItem.bind(this);
//   }

//   componentDidMount() {
//     const items = this.getDefaultItems();
//     this.setState({ items: items });
//   }
//   getDefaultItems() {
//     return [
//       { value: 'one' },
//       { value: 'two' },
//       { value: 'three' },
//       { value: 'four' },
//       { value: 'five' }
//     ];
//   }

//   rowRenderer(props) {
//     return defaultTableRowRenderer(props);
//   }

//   render() {
//     return (
//       <div>
//         <WindowScroller>
//           {({ height, isScrolling, onChildScroll, scrollTop }) => (
//             <AutoSizer disableHeight={true}>
//               {size => (
//                 <SortableTable
//                   headerHeight={38}
//                   autoHeight={true}
//                   height={height}
//                   rowCount={this.state.items.length}
//                   scrollTop={scrollTop}
//                   rowGetter={this.getItem}
//                   rowHeight={37}
//                   width={size.width}
//                   rowRenderer={sortableRowRenderer}
//                 >
//                   <Column label={'value'} dataKey={'value'} width={160} />
//                   <Column
//                     dataKey={'buttons'}
//                     cellRenderer={this.buttonsCellRenderer}
//                     width={48}
//                     minWidth={48}
//                     maxWidth={48}
//                   />
//                 </SortableTable>
//               )}
//             </AutoSizer>
//           )}
//         </WindowScroller>
//         <Button onClick={this.reset}>Reset</Button>
//       </div>
//     );
//   }

//   reset() {
//     this.setState({ items: this.getDefaultItems() });
//   }

//   buttonsCellRenderer(props) {
//     const remove = event => {
//       console.log('remove');
//       console.log(event);

//       this.remove(props.rowData);
//     };

//     const removeWithPrevent = event => {
//       console.log('removeWithPrevent');
//       console.log(event);

//       this.remove(props.rowData);
//     };

//     return (
//       <Tooltip title="Delete Line Item" enterDelay={500}>
//         <IconButton onClick={this.remove}>
//           <DeleteForever fontSize="small" color="error" onClick={this.remove} />
//         </IconButton>
//       </Tooltip>
//     );
//   }

//   getItem(info) {
//     const rows = this.state.items;

//     const row = rows[info.index];

//     return row;
//   }
// }

// export default Grid;
