import React, { Component } from 'react';
import PropTypes from 'prop-types';
import MuiVirtualizedTable from './muiVirtualizedTable.component'
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import axios from 'axios';
import * as JsSearch from "js-search";

const styles = theme => ({
    flexContainer: {
        display: 'flex',
        alignItems: 'center',
        boxSizing: 'border-box',
    },
    table: {
        '& .ReactVirtualized__Table__headerRow': {
            borderSpacing: 1,
            borderCollapse: 'collapse',
            background: '#ddd',
            width: '100%',
            margin: '0 auto',
            border: '1px solid #ddd',
            textAlign: 'left'
        },

    },
    oddRow: {
        background: '#ddd'
    },
      
    headerRow: {
        background: '#ddd'
    }
});

MuiVirtualizedTable.propTypes = {
    classes: PropTypes.object.isRequired,
    columns: PropTypes.arrayOf(
        PropTypes.shape({
            dataKey: PropTypes.string.isRequired,
            label: PropTypes.string.isRequired,
            numeric: PropTypes.bool,
            width: PropTypes.number.isRequired,
        }),
    ).isRequired,
    headerHeight: PropTypes.number,
    rowHeight: PropTypes.number,
};

const VirtualizedTable = withStyles(styles)(MuiVirtualizedTable);

export default class MaterialTable extends Component {
    constructor(props) {
        super(props);
        this.state = {
            shippingJsonData: [],
            search: [],
            searchResults: [],
            searchQuery: "",
        };
        this._rowClassName = this._rowClassName.bind(this)
      }
    
    
      componentDidMount() {
        axios.get('https://textile-movements-backend.herokuapp.com/api/getlist')
          .then(response => {
            console.log(response)
            const shippingJsonData = response.data;
            this.setState({
              shippingJsonData
            });
            this.buildSearch()
          })
          .catch(err => {
            console.log("====================================")
            console.log(`Something bad happened while fetching the data\n${err}`)
            console.log("====================================")
          })
      }

      buildSearch = () => {
        const { shippingJsonData } = this.state
        const dataToSearch = new JsSearch.Search("_id")
        dataToSearch.indexStrategy = new JsSearch.PrefixIndexStrategy()
        dataToSearch.sanitizer = new JsSearch.LowerCaseSanitizer()
        dataToSearch.searchIndex = new JsSearch.TfIdfSearchIndex("_id")

        dataToSearch.addIndex("shipperName")
        dataToSearch.addIndex("importerName") 
        dataToSearch.addIndex("country") 
        dataToSearch.addIndex("destination") 
        dataToSearch.addIndex("country") 
        dataToSearch.addDocuments(shippingJsonData) 
        this.setState({ search: dataToSearch})
      }

      searchData = e => {
        const { search } = this.state
        const queryResult = search.search(e.target.value)
        this.setState({ searchQuery: e.target.value, searchResults: queryResult })
      }

      handleSubmit = e => {
        e.preventDefault()
      }

      _rowClassName({index}) {
        if (index < 0) {
          return styles.headerRow;
        } else {
          return index % 2 === 0 ? styles.evenRow : styles.oddRow;
        }
      }
      
    render() {
        const { shippingJsonData, searchResults, searchQuery } = this.state;
        const queryResults = searchQuery === "" ? shippingJsonData : searchResults;
        const rowGetter = ({index}) => queryResults[index];
        return (
            <div>
                <form className="form-inline my-2 my-lg-0" onSubmit={this.handleSubmit}>
                        <input
                            id="Search"
                            value={searchQuery}
                            onChange={this.searchData}
                            autoComplete="off"
                            placeholder="Enter your search here"
                            style={{ margin: "0 auto", width: "250px" }}
                        />
                </form>
                <Paper style={{ height: '580px', flex: 1, width: '100%', margin: "20px 0" }}>
                    <VirtualizedTable
                        rowCount={queryResults.length}
                        rowGetter={rowGetter}
                        columns={[
                            {
                                width: 200,
                                label: 'SHIPMENT DATE',
                                dataKey: 'shipmentDate',
                            },
                            {
                                width: 350,
                                label: 'SHIPPER NAME',
                                dataKey: 'shipperName',
                            },
                            {
                                width: 120,
                                label: 'CARTONS',
                                dataKey: 'qty',
                            },
                            {
                                width: 160,
                                label: 'DESTINATION',
                                dataKey: 'destination',
                            },
                            {
                                width: 350,
                                label: 'IMPORTER NAME',
                                dataKey: 'importerName',
                            },
                            {
                                width: 350,
                                label: 'IMPORTER COUNTRY',
                                dataKey: 'country',
                            },
                            {
                                width: 60,
                                label: '20(S)',
                                dataKey: '20S',
                            },
                            {
                                width: 60,
                                label: '40(S)',
                                dataKey: '40S',
                            },
                            {
                                width: 60,
                                label: '45(S)',
                                dataKey: '45S',
                            },
                        ]}
                    />
                </Paper>
            </div>
        );
    }
}