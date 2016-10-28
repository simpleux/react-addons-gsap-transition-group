import React 							from 'react';
import ReactGSAP 						from 'react-gsap-enhancer';

const onlyChild = React.Children.only;

const ReactGSAPTransitionGroupChild = ReactGSAP()( React.createClass({
	displayName: 'ReactGSAPTransitionGroupChild',

	propTypes: {
		tweenAppear: React.PropTypes.func,
		tweenEnter : React.PropTypes.func,
		tweenLeave : React.PropTypes.func,

		appear     : React.PropTypes.bool,
		enter      : React.PropTypes.bool,
		leave      : React.PropTypes.bool
	},

	componentWillMount() {
		this.animationControllers = {
			appear: null,
			enter : null,
			leave : null
		};
	},

	componentWillUnmount() {
		for( let transitionName in this.animationControllers ) {
			if( this.animationControllers[ transitionName ] ) {
				this.animationControllers[ transitionName ].kill();
			}
		}
	},

	playTransitionAnimation( transitionName, complete ) {
		if( ! this.animationControllers[ transitionName ] ) {
			//let tween = this.getTweenFactory( transitionName );

			this.animationControllers[ transitionName ] =
				this.addAnimation( this.getTweenFactory( transitionName, complete ) );
		}

		this.animationControllers[ transitionName ].play();
	},

	getTweenFactory( transitionName, onComplete ) {
		let factory = this.props[ {
			'appear': 'tweenAppear',
			'enter' : 'tweenEnter',
			'leave' : 'tweenLeave'
		}[ transitionName ] ];

		return ( utils ) => {
			let tween = factory( utils );
			// Should we check fo existing onComplete callbacks?
			tween.eventCallback( 'onComplete', onComplete, [], this );
			return tween;
		};
	},

	componentWillAppear( complete ) {
		if( this.props.appear ) {
			this.playTransitionAnimation( 'appear', complete );
		}
		else {
			complete();
		}
	},

	// componentDidAppear

	componentWillEnter( complete ) {
		if( this.props.enter ) {
			this.playTransitionAnimation( 'enter', complete );
		}
		else {
			complete();
		}
	},

	// componentDidEnter

	componentWillLeave( complete ) {
		if( this.props.leave ) {
			this.playTransitionAnimation( 'leave', complete );
		}
		else {
			complete();
		}
	},

	// componentDidLeave

	render() {
		return onlyChild( this.props.children );
	}
}));

module.exports = ReactGSAPTransitionGroupChild;
