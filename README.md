React Addons: GSAP Transition Group
===================================

Use GSAP animations for transitions which work in any browser both GSAP and React support.  Uses [React GSAP Enhancer](https://github.com/azazdeaz/react-gsap-enhancer) to add GSAP support to React Components, and extends [ReactTransitionGroup](https://www.npmjs.com/package/react-addons-transition-group) to create an element which adds GSAP powered transitions which even work in IE8.



Usage
-----

> Note: This example is written in ES6, sorta.

```js
let React = require( 'react' );
let ReactGSAPTransitionGroup = require( './react/react-gsap-transition-group' );
let TweenMax = require( 'gsap' );

//////// Transition factories
// See react-gsap-enhancer (https://github.com/azazdeaz/react-gsap-enhancer) for how these functions should be structured.

function transitionEnter({ target, options }) {
	return TweenMax.fromTo( target, 0.3, {
		x: '+=50',
		opacity: 0
	}, {
		x: '-=50',
		opacity: 1
	});
}

function transitionLeave({ target, options }) {
	return TweenMax.fromTo( target, 0.3, {
		x: '+=0',
		opacity: 1
	}, {
		x: '-=50',
		opacity: 0
	});
}

//////// A grouping component

const TransitioningList = React.createClass({
	render() {
		return (
			// Note: Don't need tweenAppear unless you set transitionAppear="true".
			<ReactGSAPTransitionGroup component="div" className="list"
				tweenEnter={ transitionEnter }
				tweenLeave={ transitionLeave }
				>
				{ this.renderItems() }
			</ReactGSAPTransitionGroup>
		);
	},

	renderItems() {
		return this.props.items.map( item => (
			<div key={ item.id }
				className="list-item"
				>
				<button onClick={ this.handleRemoveItem.bind( this, item.id ) }>X</button>
				{ item.id }
			</div>
		));
	},

	handleRemoveItem( itemId ) {
		this.props.onRemoveItem( itemId );
	}
});
```



Considerations when targeting legacy browsers
---------------------------------------------

- You should add [core-js](https://github.com/zloirock/core-js) to ensure things such as `Map`, `Array#map`, and other sundry ES5 things.
- If targeting ES3 environments (mostly IE8), you should at least add a transform to make property name access ES3 safe, such as [es3ify](https://github.com/spicyj/es3ify) if using [Browserify](http://browserify.org/).
