import React, {Component} from 'react';
import Carousel from 'react-elastic-carousel';
import Paper from "@material-ui/core/Paper";
import './carousel.css';
import Caro1 from '../../Assests/caro1.jpg';
import Caro2 from '../../Assests/caro2.webp'
import Caro3 from '../../Assests/caro3.jpg'
import Caro4 from '../../Assests/caro4.jpg'
import Caro5 from '../../Assests/caro5.jpg'
export default class Caro extends Component {
  state = {
    items: [
      {id: 1, title: Caro5},
      {id: 2, title: Caro2},
      {id: 3, title: Caro1},
      {id: 4, title: Caro4},
      {id: 5, title: Caro3},
    ]
  }

  render () {
    const { items } = this.state;
    return (
      <Carousel>
        {items.map(item => <div 
        className='paper'
        key={item.id}
        elevation = {20}>
        <img src =  {item.title} alt = 'image' width={800} height={400} />
        </div>)}
      </Carousel>
    )
  }
}

