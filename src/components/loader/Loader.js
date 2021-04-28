import React, { Component } from 'react';
import './Loader.css';

export default class Loader extends Component {

    componentDidMount() {
        setTimeout(async () => {
    
          document.querySelector('.loader-container').style.transition = 'opacity 5s';
          document.querySelector('.loader-container').style.opacity = '0';
    
          setTimeout(async () => {
            document.querySelector('.loader-container').remove();
          }, 3000);
    
        }, 100);
      } 


    render() {
        return (
            <div className="loader-container">
            <div className="loader">
              <div className="inner one"></div>
              <div className="inner two"></div>
              <div className="inner three"></div>
            </div>
          </div>
        )
    }
}
