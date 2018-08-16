import React, {Component} from 'react';
import {Modal} from 'react-bootstrap';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom';
import _ from 'lodash';

import '../App.css';

class BeerModal extends Component {
  constructor(props, context) {
    super(props, context);

    this.handleShow = this.handleShow.bind(this);
    this.handleHide = this.handleHide.bind(this);

    this.state = {
      show: true,
      beer_database: this.props.beer_data
    };

  }

  handleShow() {
    this.setState({show: true});

  }

  handleHide() {
    this.setState({show: false});

  }

  render() {

    const beer = this.props.beer
    const beer_database = this.state.beer_database

    const showModal = () => {

      var beerIbu = 0;
      var beerEbc = 0;
      var beerAbv = 0;

      _.findLast(beer_database, function(beers) {
        var diffIbu = Math.abs(beers.ibu - beer.ibu)
        var diffEbc = Math.abs(beers.ebc - beer.ebc)
        var diffAbv = Math.abs(beers.abv - beer.abv)

        if (diffIbu <= 30 && (beers.id !== beer.id) && beerIbu === 0) {

          beerIbu = beers

        } else if (diffEbc <= 15 && (beers.id !== beer.id) && beerEbc === 0) {

          beerEbc = beers

        } else if (diffAbv <= 5 && (beers.id !== beer.id) && beerAbv === 0) {

          beerAbv = beers

        }

      })

      return (<Modal show={this.state.show} onHide={this.handleHide}>
        <Modal.Header closeButton>
          <Modal.Title>
            <div className="modal_card-header">{beer.name}</div>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="modal_card-body">
            <div className="modal_card-body-imageholder">
              <img src={beer.image_url} alt="{beer.tagline}" className="modal_card-body-image"/>
            </div>
            <div className="modal_card-body-textholder">
              <h4>{beer.tagline}</h4>
              <span className="modal_card-body-textholder-content">Description:</span>
              <p>{beer.description}</p>
              <span className="modal_card-body-textholder-content">Brewer tips:</span>
              <p>
                {beer.brewers_tips}</p>
              <p>
                <span className="modal_card-body-textholder-content">ibu: {beer.ibu} abv: {beer.abv} ebc: {beer.ebc}</span>
              </p>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <div className="modal_card-footer">
            <div className="modal_card-footer-recommendation">You might also like</div>
          </div>
          <div className="modal_card-footer">
            <div className="modal_card-box">
              <img src={beerIbu.image_url} alt={beerIbu.tagline} className="modal_card-box-image"/></div>
            <div className="modal_card-box">
              <img src={beerEbc.image_url} alt={beerEbc.tagline} className="modal_card-box-image"/></div>
            <div className="modal_card-box">
              <img src={beerAbv.image_url} alt={beerAbv.tagline} className="modal_card-box-image"/></div>
          </div>
          <div className="modal_card-footer-text">
            <div className="modal_card-footer-text-box">{beerIbu.name}</div>
            <div className="modal_card-footer-text-box">{beerEbc.name}</div>
            <div className="modal_card-footer-text-box">{beerAbv.name}</div>
          </div>
        </Modal.Footer>
      </Modal>)
    };

    return (<Router>
      <div>
        <Route path={`/details/${beer.id}`} render={showModal}/>
        <Link to={`/details/${beer.id}`}>
          <div key={beer.id} className="beer_card__miniature col-1-of-5" onClick={this.handleShow}>
            <div className="beer_card">
              <div className="beer_card__image">
                <img src={beer.image_url} alt={beer.tagline} className="beer_card__image-content"/>
              </div>
              <span className="beer_card__text">
                <h1 className="beer_card__text-header">{beer.name}</h1>
                <p className="beer_card__text-paragraph">{beer.tagline}</p>
              </span>
            </div>
          </div>
        </Link>

      </div>
    </Router>);
  }
}

export default BeerModal;
