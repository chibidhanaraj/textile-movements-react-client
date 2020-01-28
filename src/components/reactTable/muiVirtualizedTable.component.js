import React, { Component } from 'react';
import { AutoSizer, Column, Table } from 'react-virtualized';
import "react-virtualized/styles.css";
import clsx from 'clsx';
import TableCell from '@material-ui/core/TableCell';

export default class MuiVirtualizedTable extends Component {
  static defaultProps = {
    headerHeight: 48,
    rowHeight: 48,
  };

  getRowClassName = ({ index }) => {
    const { classes } = this.props;
    return index % 2 === 0 ? classes.evenRow : classes.oddRow;
  };

  cellRenderer = ({ cellData }) => {
    const { rowHeight } = this.props;
    return (
      <TableCell
        component="div"
        style={{ height: rowHeight }}
      >
        {cellData}
      </TableCell>
    );
  };

  headerRenderer = ({ label }) => {
    const { headerHeight, classes } = this.props;

    return (
      <TableCell
        component="div"
        className={clsx(classes.flexContainer, classes.headerRow)}
        style={{ height: headerHeight, fontSize: '16px' }}
      >
        <span>{label}</span>
      </TableCell>
    );
  };

  className({ index }) {
    return index % 2 === 0 ? { background: '#ddd' } : { background: '#fff' }
  }

  render() {
    const { classes, columns, rowHeight, headerHeight, ...tableProps } = this.props;
    return (
      <AutoSizer >
        {({ height, width }) => (
          <Table
            height={height}
            width={width}
            rowHeight={rowHeight}
            headerHeight={headerHeight}
            className={classes.table}
            rowClassName={this.getRowClassName}
            {...tableProps}
          >
            {columns.map(({ dataKey, ...other }, index) => {
              return (
                <Column
                  key={dataKey}
                  headerRenderer={headerProps =>
                    this.headerRenderer({
                      ...headerProps,
                      columnIndex: index,
                    })
                  }
                  className={classes.flexContainer}
                  cellRenderer={this.cellRenderer}
                  dataKey={dataKey}
                  {...other}
                />
              );
            })}
          </Table>
        )}
      </AutoSizer>
    );
  }
}