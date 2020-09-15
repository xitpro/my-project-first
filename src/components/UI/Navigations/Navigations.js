import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import classes from "../../../assets/scss/nav.scss";
import NavItem from "./NavItem";

class Navigations extends Component {
  constructor(props) {
    super(props);
    var navigationArray = [
      {
        id: 1,
        name: "Home",
      },
      {
        id: 2,
        name: "New Feed",
	  },
	  {
		  id: 3,
		  name: "Notification"
	  },
	  {
		  id: 4,
		  name: "Fan Page"
	  }
    ];
    this.view = navigationArray[0].name;
    this.items = [];
    this.state = {
      activeView: this.view,
      navs: navigationArray,
      currentTabNavigation: 0,
      tabNavigations: [],
      item: 0,
    };
  }

  componentDidUpdate(prevProps) {
    const { activeView } = this.props;
    if (activeView !== prevProps.activeView) {
      this.setState({ activeView: activeView });
    }
    if (prevProps.currentTabNavigation !== this.props.currentTabNavigation) {
      console.log(this.props.tabNavigations);
      console.log(this.props.currentTabNavigation);
    }
  }
  changeView = (view) => {
    this.view = view;

    this.updateView();
  };
  updateView = () => {
    if (this.view === this.state.activeView) return;
    const { tabNavigations, currentTabNavigation } = this.state;
    if (currentTabNavigation + 1 !== tabNavigations.length)
	  tabNavigations.splice(currentTabNavigation + 1);
	this.setState({
		activeView: this.view,
	})
  };

  Add = () => {
    let increase = this.state.item + 1;
    this.setState({
      item: increase,
    })
    let itemInfo = {
      id: increase,
      name: 'item thu ' + increase
    }
    this.items.push(itemInfo);
    console.log('this.state.item', this.items)
  }
  Remove = () => {
    if(this.state.item === 0) return;
    let decrease = this.state.item - 1;
    this.setState({ item: decrease })
    this.items.pop()
  }
  Reset = () => {
    this.setState({item: 0})
    this.items.length = 0;
  }
  render() {
    return (
      <div className={classes.main_container}>
      <div className={classes.nav_tabs}>
        {this.state.navs.map((nav) => (
          <NavItem
            key={nav.id}
            name={nav.name}
            active={this.state.activeView === nav.name}
            changeView={this.changeView}
          />
        ))}
		  <div className={[classes.nav_tabs, classes[`right`]].join(' ')}>{this.state.item} </div>
      <button className={classes.button} onClick={()=> this.Add()}>Add</button>
      <button className={classes.button} onClick={()=> this.Remove()}>Remove</button>
      <button className={classes.button} onClick={()=> this.Reset()}>Reset</button>
      </div>
      <div className={classes.active_view}>
          {this.items.map((it) => (<div className={classes.item}>{it.name}</div>))}
      </div>
      </div>
    );
  }
}

// PropTypes
Navigations.propTypes = {
  navs: PropTypes.array.isRequired,
  activeView: PropTypes.string.isRequired,
  changeView: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  // isOnline: state.connection.isOnline,
});

export default connect(mapStateToProps)(Navigations);
