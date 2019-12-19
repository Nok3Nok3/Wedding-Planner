import React, { Component } from "react";
import { inject, observer } from "mobx-react";
import {List, ListItem, ListItemText, ListItemAvatar, Avatar, Card} from '@material-ui/core'
import Paper from './Paper'

import './Overview.css'
import CreditCardIcon from '@material-ui/icons/CreditCard';
import LocalAtmIcon from '@material-ui/icons/LocalAtm';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
@inject("user")
@observer
class Overview extends Component {
  componentDidMount = () => {
    this.props.user.getBookedAttractions();
    this.props.user.getWeddingDetails()
  };
  componentDidUpdate = () => {
    this.props.user.getBookedAttractions();
  };

  render() {
    let bookedAttractions = this.props.user.bookedAttractions;
    let totalPrice = bookedAttractions.reduce((a,b) => a+b.price,0)
    let weddingDetailes = this.props.user.userInfo.weddingData ? this.props.user.userInfo.weddingData:""
    return <div>
      <div className="budget">
        <Card style={{backgroundColor: "rgba(255, 255, 255, 0.3)"}}>
        <List>
        <ListItem>
        <ListItemAvatar>
          <Avatar>
            <LocalAtmIcon />
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary="Total Budget" secondary={weddingDetailes? weddingDetailes.est_budget + "₪":""} />
        </ListItem>
        <ListItem>
        <ListItemAvatar>
          <Avatar>
            <CreditCardIcon />
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary="Total spent" secondary={totalPrice + "₪"} />
        </ListItem>
        <ListItem>
        <ListItemAvatar>
          <Avatar>
            <AttachMoneyIcon />
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary="Remaining Budget" secondary={weddingDetailes.est_budget - totalPrice + "₪"} />
          </ListItem>
        </List>
        </Card>
      </div>
      {bookedAttractions.map(ba => <Paper attr={ba} />)}
    </div>
  }
}

export default Overview;
