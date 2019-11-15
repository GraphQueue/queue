import React, { Component } from 'react';
import SearchDisplay from '../components/SearchDisplay.jsx';
import NewMap from '../components/NewMap.jsx'
import debounce from "lodash.debounce";
import '../css/CategoryPage.css';
import Image from 'react-bootstrap/Image'

class CategoryContainer extends Component {
  constructor(props) {
    super(props);

    /*
    if (this.props.categoryPage && this.props.current < 50) {
      window.onscroll = debounce(() => {
        // console.log('scrolling')

        if (this.props.current >= 50) return;

        if (document.documentElement.scrollTop > document.documentElement.scrollHeight - window.innerHeight - 2) {
          this.props.search();
        }
      });
    }
    */

  }

  render() {
    // render map and list of businessess from searchResults arr in the state
    let search = null;
    let searchDisplayResults = this.props.searchResults.map((element, i) => {
      // console.log('search results', props.searchResults);
      //console.log('ELEMENT -> ', element);
      return <div id="list" key={i} className="fs-14">
        <button className="list-item" onClick={() => this.props.selectVenue(element.id, element.name, element.url, element.image, element.location, element.phone, element.latitude, element.longitude)}>
          <div className="flex fd-col">
            <div>
              {/* {element.location.address1} {element.location.address2}<br /> */}
              <h3>{element.name}</h3>
              <Image src={`${element.image}`} thumbnail />
              <div className="list-item-details">
                {/* // need to grab the unique id provided from the yelp api data search results that are saved in state. need to use it to save into our database */}
                {/* <button onClick={() => this.props.selectVenue(element.id, element.name, element.url, element.image, element.location, element.phone)}>Select</button> */}	            <br />
                {element.category}
                <br />
                {element.location.address1} {element.location.address2}
                <br />
                {element.location.city}, {element.location.state} {element.location.zip_code}
                {element.phone}<br />
                {/* // need to grab the unique id provided from 
          the yelp api data search results that are saved in state. 
          need to use it to save into our database */}
                {/* <button onClick={() => this.props.selectVenue(element.id, element.name, element.url, 
            element.image, element.location, element.phone)}>Select</button> */}
              </div>
            </div>
          </div>
          {/* // need to grab the unique id provided from the yelp api data search results that are saved in state. need to use it to save into our database */}
          {/* <button onClick={() => this.props.selectVenue(element.id, element.name, element.url, element.image, element.location, element.phone)}>Select</button> */}
        </button>
      </div>
    })

    if (this.props.categoryPage) {

      search =
        <div id="category-body">
          <SearchDisplay
            searchDisplayResults={searchDisplayResults}
          />
          <NewMap
            StoresInfo={this.props.searchResults}
            latitude={this.props.latitude}
            longitude={this.props.longitude}

          />

        </div>
    }

    return (
      <div>
        <section className="search-bar">
          <img id="logo-pic-category" src="https://image.flaticon.com/icons/png/512/876/876569.png" />
          <input type="input" id="searchInput" placeholder="Business or Category" onChange={this.props.setSearchInput} className="search-placeholders" />
          <input type="input" id="location" placeholder="Location" onChange={this.props.setLocation} className="search-placeholders" />
          <input type="button" id="searchButton" onClick={this.props.search} />
        </section>
        {search}
      </div>
    );
  }
}

export default CategoryContainer;
