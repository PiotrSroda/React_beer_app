import React, {Component} from 'react';
import InfiniteScroll from 'react-infinite-scroller';
import qwest from 'qwest';
import BeerModal from './components/beer_modal';

import './App.css';

const api = 'https://api.punkapi.com/v2';

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      beers: [],
      hasMoreItems: true,
      nextPage: null
    };
  }

  loadItems(page) {
    var self = this;

    var url = api + '/beers';
    if (this.state.nextPage) {
      url = this.state.nextPage;
    }

    qwest.get(url, {
      page: page++,
      per_page: 20
    }).then(function(xhr, resp) {
      if (resp) {
        var beers = self.state.beers;
        resp.map((beer) => {
          return beers.push(beer);
        });

        if (resp[resp.length - 1]) {
          self.setState({beers: beers, nextPage: url});
        } else {
          self.setState({hasMoreItems: false});
        }
      }
    });
  }
  render() {
    const loader = <div className="lds-hourglass" key= "1">&nbsp;</div>;
    var beers_database = this.state.beers

    var beers = [];
    beers_database.map((beer, i) => {
      return beers.push(
        <BeerModal
        beer={beer}
        beer_data={beers_database}
        key={i}
        />);
    });

    return (<div>
      <header className="header">
        <div className="header__text-box">
          Beer World
        </div>
      </header>
      <div className="row">
        <InfiniteScroll
        pageStart={0}
        loadMore={this.loadItems.bind(this)}
        hasMore={this.state.hasMoreItems}
        loader={loader}
        >

          {beers}
          {
            (!this.state.hasMoreItems)
              ? <div className="beer_card col-1-of-5">
                  <div className="beer_card__finisher">No more beers available</div>
                </div>
              : <div>&nbsp;</div>
          }

        </InfiniteScroll>
      </div>
    </div>);
  }
};

export default App;
