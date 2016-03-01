'use strict';

const React = require( 'react' );
const ReactTransitionGroup = require( 'react-addons-transition-group' );
const assign = require( 'react/lib/Object.assign' );
const ReactGSAPTransitionGroupChild = require( './react-gsap-transition-group-child' );



const ReactGSAPTransitionGroup = React.createClass({
	displayName: 'ReactGSAPTransitionGroup',

	propTypes: {
		// There's no simple way to guarantee an animation is reversible so just explicitly specify
		// any in/out transition animations.
		// They can be reused for both appear and enter, though.
		tweenAppear: React.PropTypes.func,
		tweenEnter: React.PropTypes.func,
		tweenLeave: React.PropTypes.func,

		// TODO: Same thing as in ReactCSSTransitionGroup with regards to type checking here.
		transitionAppear: React.PropTypes.bool,
		transitionEnter: React.PropTypes.bool,
		transitionLeave: React.PropTypes.bool
	},

	getDefaultProps() {
		return {
			transitionAppear: false,
			transitionEnter: true,
			transitionLeave: true
		};
	},

	_wrapChild( child ) {
		return React.createElement( ReactGSAPTransitionGroupChild, {
			tweenAppear: this.props.tweenAppear,
			tweenEnter: this.props.tweenEnter,
			tweenLeave: this.props.tweenLeave,

			appear: this.props.transitionAppear,
			enter: this.props.transitionEnter,
			leave: this.props.transitionLeave
		}, child );
	},

	render() {
		return React.createElement( ReactTransitionGroup,
			assign({}, this.props, { childFactory: this._wrapChild })
		);
	}
});

module.exports = ReactGSAPTransitionGroup;
