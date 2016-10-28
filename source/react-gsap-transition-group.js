import React 							from 'react';
import ReactTransitionGroup 			from 'react-addons-transition-group';
import ReactGSAPTransitionGroupChild 	from './react-gsap-transition-group-child';
import assign 							from 'object-assign';

const ReactGSAPTransitionGroup = React.createClass({
	displayName: 'ReactGSAPTransitionGroup',

	propTypes: {
		tweenAppear: React.PropTypes.func,
		tweenEnter : React.PropTypes.func,
		tweenLeave : React.PropTypes.func,

		// TODO: Same thing as in ReactCSSTransitionGroup with regards to type checking here.
		transitionAppear: React.PropTypes.bool,
		transitionEnter : React.PropTypes.bool,
		transitionLeave : React.PropTypes.bool
	},

	getDefaultProps() {
		return {
			transitionAppear: false,
			transitionEnter : true,
			transitionLeave : true
		};
	},

	_wrapChild( child ) {
		return React.createElement( ReactGSAPTransitionGroupChild, {
			tweenAppear: this.props.tweenAppear,
			tweenEnter : this.props.tweenEnter,
			tweenLeave : this.props.tweenLeave,

			appear: this.props.transitionAppear,
			enter : this.props.transitionEnter,
			leave : this.props.transitionLeave
		}, child );
	},

	render() {

		var props = assign({}, this.props);

		delete props.tweenAppear;
		delete props.tweenEnter;
		delete props.tweenLeave;

		return React.createElement( ReactTransitionGroup,
			Object.assign({}, props, { childFactory: this._wrapChild })
		);
	}
});

module.exports = ReactGSAPTransitionGroup;
