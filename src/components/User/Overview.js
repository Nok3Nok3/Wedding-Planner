import React, { Component } from "react";
import { inject, observer } from "mobx-react";
import Paper from './Paper'
import { TextField } from '@material-ui/core';
import './Overview.css'
@inject("user")
@observer
class Overview extends Component {
  componentDidMount = () => {
    this.props.user.getBookedAttractions();
    this.props.user.getWeddingDetails()
  };

  render() {
    let bookedAttractions = this.props.user.bookedAttractions;
    let totalPrice = bookedAttractions.reduce((a,b) => a+b.price,0)
    console.log(totalPrice)
    let getWeddingDetails = this.props.user.userInfo
    let weddingDetailes = this.props.user.userInfo.weddingData ? this.props.user.userInfo.weddingData:""
    return <div>
      <div className="budget">
        Total Budget:{weddingDetailes? weddingDetailes.est_budget:""} <br></br>
        Total spent:{totalPrice} <br></br>
        Remaining Budget:{weddingDetailes.est_budget - totalPrice} <br></br>
      </div>
      <div id="booked_container">
      {bookedAttractions.map(ba => <Paper attr={ba} />)}
      </div>
    </div>
  }
}

export default Overview;
