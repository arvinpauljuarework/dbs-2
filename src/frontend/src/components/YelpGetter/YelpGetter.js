import React, { Component } from 'react';
import axios from 'axios';

import './YelpGetter.css';

import BusinessCard from '../BusinessCard/BusinessCard';
import BusinessTable from '../BusinessCard/BusinessTable';
import BusinessNoData from '../BusinessCard/BusinessNoData';
import YelpLoader from './YelpLoader';

import $ from 'jquery';

class YelpGetter extends Component {
    
    constructor() {
        super();
        this.state = {keyword: '', location: '', businesses: [], loader: ''};
  
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleKeywordChange = this.handleKeywordChange.bind(this);
        this.handleLocationChange = this.handleLocationChange.bind(this);
    }

    componentDidMount () {
        this.setState({loader: ''}); 
        axios.get('http://localhost:8000/search/dbs/singapore')
            .then(response => {
                if(response.data.businesses) {
                    if (response.data.businesses.length > 0) this.setState({businesses: response.data.businesses});
                    else this.setState({businesses: 'No Data'}); 
                } else {
                    this.setState({businesses: 'No Data'}); 
                }
                this.setState({loader: 'Done'}); 
            });
    }
    
    handleSubmit(event) {
        this.setState({loader: ''}); 
        axios.get('http://localhost:8000/search/'+this.state.keyword+'/'+this.state.location)
            .then(response => {
                if(response.data.businesses) {
                    if (response.data.businesses.length > 0) this.setState({businesses: response.data.businesses});
                    else this.setState({businesses: 'No Data'}); 
                } else {
                    this.setState({businesses: 'No Data'}); 
                }
                this.setState({loader: 'Done'}); 
            });
        event.preventDefault();
    }

    handleKeywordChange(event) {
        this.setState({keyword: event.target.value});
    }

    handleLocationChange(event) {
        this.setState({location: event.target.value});
    }
  
    render() {

        let businesses = "";
        let businessTableRows = "";
        
        if (this.state.businesses !== "No Data") {

            businesses = this.state.businesses.map(business => {
                
                let address = "";
                for (let info of business.location.display_address) address += info + " " 
                return <BusinessCard key={business.id} 
                                    name={business.name} 
                                    image_url={business.image_url}
                                    rating={business.rating}
                                    phone={business.phone} 
                                    address={address} />
            });

            businessTableRows = this.state.businesses.map(business => {
                
                let address = "";
                for (let info of business.location.display_address) address += info + " " 
                return <BusinessTable key={business.id} 
                                    name={business.name} 
                                    image_url={business.image_url}
                                    rating={business.rating}
                                    phone={business.phone} 
                                    address={address} />
            });
        
        } else {

            businesses = <BusinessNoData />
        }

        return (

            <div>
                <div className="yelp-container">
                    <form onSubmit={this.handleSubmit} className="form-inline mr-auto">
                        <input className="form-control" type="text" placeholder="Keyword" id="keyword" name="keyword" aria-label="Keyword" value={this.state.keyword} onChange={this.handleKeywordChange} required></input>
                        <input className="form-control" type="text" placeholder="Location" name="location" aria-label="Location" value={this.state.location} onChange={this.handleLocationChange} required></input>
                        <button className="btn btn-primary btn-rounded btn-sm my-0 ml-sm-2" type="submit">Search</button>
                    </form>
                </div>              
                {this.state.loader === '' ? <YelpLoader /> :  <div className="row yelp-row">{businesses}</div>}
            </div>
        );
    }
  }
  
  export default YelpGetter;