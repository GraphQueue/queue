import React, { Component } from 'react';
import axios from 'axios';

export default class Favorites extends Component {
    constructor() {
        super()
        this.state = {
            favs: [],
            businesses: []
        }

        this.fetchFavorites = this.fetchFavorites.bind(this)
    }
    fetchFavorites() {
        axios.get('/dbRouter/favorites')
            .then(res => {
                return this.setState({
                    favs: [...res.data.favorites]
                })
            })
            .then(() => {
                this.state.favs.forEach( fav => {
                    axios.get(`/api/favorite/${fav.venue_id}`)
                      .then(res => {
                          const businessCopy = [...this.state.businesses, res]
                          this.setState({ businesses: businessCopy })
                        })
                      .catch(err => console.log(err));
                })
            })
            .catch
    }
    componentDidMount() {
        this.fetchFavorites()
    }

    componentDidUpdate() {

    }
    render() {
        const favs = this.state.businesses.map((obj, i) => {
            console.log(obj.data.business);
            return (<div className='favorite-box flex fd-col j-center' key={i}>
            <img className='favorite-img' src={obj.data.business.image} />
              <div className='favorite-info'>
                <h3>{obj.data.business.name} </h3>
                {obj.data.business.location.address1} <br />
                {obj.data.business.phone} <br />
                {obj.data.business.price}
              </div>
            </div>)
        })
        return <div className="favorites-container flex j-center fd-col">
            <h2 style={{ margin: '0 auto', marginTop: '20px' }}>Your Favorites</h2>
            <div className="flex j-center fd-row wrap">{favs}</div>
        </div>
    }
}
