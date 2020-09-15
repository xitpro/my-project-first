import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classes from '../../../assets/scss/nav.scss';
class NavItem extends Component {
	constructor(props) {
		super(props);

		this.state = {
			active: this.props.active,
		};
	}
	componentDidUpdate(prevProps) {
		const { active } = this.props;
		if (active !== prevProps.active) {
			this.setState({ active: active });
		}
	}
	changeView = view => {
		this.props.changeView(view);
	};
	render() {
		const { name } = this.props;
		// const { active } = this.state;
		// let navClass = `nav ${active ? 'active' : ''} ${this.props.extraClass ? this.props.extraClass : ''}`;

		return (
			<div
				className={classes.nav_item}
				onClick={this.changeView.bind(this, name)}
			>
				<div>{name}</div>
			</div>
		);
	}
}

// PropTypes
NavItem.propTypes = {
	name: PropTypes.string.isRequired,
	active: PropTypes.bool.isRequired,
	changeView: PropTypes.func.isRequired,
};

export default NavItem;
