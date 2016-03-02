React Addons: GSAP Transition Group
===================================

Use GSAP animations for transitions which work in any browser both GSAP and React support.  Uses [React GSAP Enhancer](https://github.com/azazdeaz/react-gsap-enhancer) to add GSAP support to React Components, and extends [ReactTransitionGroup](https://www.npmjs.com/package/react-addons-transition-group) to create an element which adds GSAP powered transitions which even work in IE8.



Usage
-----

```
<ReactGSAPTransitionGroup
	tweenAppear={ tweenAppearFactory :function }
	tweenEnter={ tweenEnterFactory :function }
	tweenLeave={ tweenLeaveFactory :function }
	transitionAppear={ shouldAppear :boolean }
	transitionEnter={ shouldEnter :boolean }
	transitionLeave={ shouldLeave :boolean }
	></ReactGSAPTransitionGroup>
```

Functions more or less like ReactCSSTransitionGroup, although rather than `transitionName`, the three properties are used to specify the transitions.

- The Tween Props
	- These should be set to functions which take an arguments object that has the properties `target` and `options` and return a TweenLite, TweenMax, TimelineLite, or TimelineMax instance.  See the _Example_ section for a simple case of a use of `TweenMax.fromTo`.
	- Note: If you need to target a specific element within, use `utils.target.find` and other such element finding/filtering functions.  See [React GSAP Enhancer](https://github.com/azazdeaz/react-gsap-enhancer)'s documents for more details on this.
	- `tweenAppear: function({ target, options }): (TweenLite|TweenMax|TimelineLite|TimelineMax)` _optional_
	- `tweenEnter: function({ target, options }): (TweenLite|TweenMax|TimelineLite|TimelineMax)`
	- `tweenLeave: function({ target, options }): (TweenLite|TweenMax|TimelineLite|TimelineMax)`
- The Transition Props
	- These specify whether a transition should be played at a given life cycle point, in much the same way the same props work in ReactCSSTransitionGroup.
	- `tweenAppear: boolean = false` determines whether or not `tweenAppear` is called.
	- `tweenEnter: boolean = true` determines whether or not `tweenEnter` is called.
	- `tweenLeave: boolean = true` determines whether or not `tweenLeave` is called.



Example
-------

> Note: This example is written in ES6, sorta.

```js
let React = require( 'react' );
let ReactGSAPTransitionGroup = require( 'react-addons-gsap-transition-group' );
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

### ES5 Example of the Factory Functions

```js
function transitionEnter( utils ) {
	return TweenMax.fromTo( utils.target, 0.3, {
		x: '+=50',
		opacity: 0
	}, {
		x: '-=50',
		opacity: 1
	});
}

function transitionLeave( utils ) {
	return TweenMax.fromTo( utils.target, 0.3, {
		x: '+=0',
		opacity: 1
	}, {
		x: '-=50',
		opacity: 0
	});
}
```



Considerations when targeting legacy browsers
---------------------------------------------

- You should add [core-js](https://github.com/zloirock/core-js) to ensure things such as `Map`, `Array#map`, and other sundry ES5 things.
- If targeting ES3 environments (mostly IE8), you should at least add a transform to make property name access ES3 safe, such as [es3ify](https://github.com/spicyj/es3ify) if using [Browserify](http://browserify.org/).
