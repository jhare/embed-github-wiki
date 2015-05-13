* If you find you need to do async within the rendering logic of a React component, stop. These components ought to have all necessary properties and data passed to it through `model.props` (where you get the *input* for your component) and through events manipulating `this.state` through the `this.setState` function to react events (`mouseenter`, `mouseleave` etc.) and do any two-way binding needed.
* Limit usage of `$apply()` within your React component. The Angular digest cycle is evil, but sometimes necessary.
* Outside of notifying Angular of model changes via `$apply()` don't use Angular components in your React components:

**No**
```javascript
var myElementAttributes {
  'id': 'myUniqueID',
  'ng-include': 'myScopeAttribute' // we're using Angular in React. Don't do that.
};
```