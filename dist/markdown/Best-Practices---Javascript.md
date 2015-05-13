* Use spaces for indention
* Use two-space indention
* Use single quotes
* **Check [lodash](https://lodash.com/docs)** when doing common operations such as
  * Iterating - **"Don't reach for each()"**. There's likely a lodash helper that does what you want.
  * Type/value checking - See functions like `_.isUndefined()` to take care of these operations and make your code more readable
* Name your boolean conditions
```js
// replace this code
if($scope.hover == true && !$scope.disabled) {
  doSomething();
}

// with this
var isHovered = $scope.hover == true && !$scope.disabled;
if(isHovered) { // This is much more readable.
  doSomething();
}
```
* Avoid pure anonymous functions.
```js
$element.on('click', function() {
  console.log('This way is a bit \'meh\'');
});

$element.on('click', function handleClick() {
  console.log('This way you get a useful function name in a stack trace.');
});
```
* Prefer to have your functions pulled up into their hoistable state. See [var hoisting](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/var)
```js
// Taking the previous example further
function handleClick() {
  console.log('This way ends up much more readable when there are many functions being defined.');
}

function handleHover() {
  console.log('Here is our cool hover effect!');
}

function handleBlur() {
  console.log('PLEASE DON\'T LEAVE');
}

// Now these handlers are all nice and grouped together.
$element.on('click', handleClick);
$element.on('mouseenter', handleHover);
$element.on('mouseleave', handleBlur);
```