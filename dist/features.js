(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
require("./src/public/features/github-wiki/github-wiki-directive.js");

},{"./src/public/features/github-wiki/github-wiki-directive.js":2}],2:[function(require,module,exports){
'use strict';

var embed = angular.module('ngEmbedGithubWiki', []);

console.log('i have my module', embed);
embed.directive('githubWikiPage', [function defineGithubWikiPageDirective() {

  function link($element, $scope, $attrs) {
    console.log('in ghwp', $element, $scope, $attrs);
  }

  return {
    'restrict': 'EA',
    'link': link,
    'templateUrl': 'partials/github-wiki/github-wiki-partial.html',
    'scope': {
      'id': '@',
      'pageid': '@'
    }
  };

}]);

},{}]},{},[1])
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJfc3RyZWFtXzAuanMiLCJzcmMvcHVibGljL2ZlYXR1cmVzL2dpdGh1Yi13aWtpL2dpdGh1Yi13aWtpLWRpcmVjdGl2ZS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBO0FBQ0E7O0FDREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJyZXF1aXJlKFwiLi9zcmMvcHVibGljL2ZlYXR1cmVzL2dpdGh1Yi13aWtpL2dpdGh1Yi13aWtpLWRpcmVjdGl2ZS5qc1wiKTtcbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIGVtYmVkID0gYW5ndWxhci5tb2R1bGUoJ25nRW1iZWRHaXRodWJXaWtpJywgW10pO1xuXG5jb25zb2xlLmxvZygnaSBoYXZlIG15IG1vZHVsZScsIGVtYmVkKTtcbmVtYmVkLmRpcmVjdGl2ZSgnZ2l0aHViV2lraVBhZ2UnLCBbZnVuY3Rpb24gZGVmaW5lR2l0aHViV2lraVBhZ2VEaXJlY3RpdmUoKSB7XG5cbiAgZnVuY3Rpb24gbGluaygkZWxlbWVudCwgJHNjb3BlLCAkYXR0cnMpIHtcbiAgICBjb25zb2xlLmxvZygnaW4gZ2h3cCcsICRlbGVtZW50LCAkc2NvcGUsICRhdHRycyk7XG4gIH1cblxuICByZXR1cm4ge1xuICAgICdyZXN0cmljdCc6ICdFQScsXG4gICAgJ2xpbmsnOiBsaW5rLFxuICAgICd0ZW1wbGF0ZVVybCc6ICdwYXJ0aWFscy9naXRodWItd2lraS9naXRodWItd2lraS1wYXJ0aWFsLmh0bWwnLFxuICAgICdzY29wZSc6IHtcbiAgICAgICdpZCc6ICdAJyxcbiAgICAgICdwYWdlaWQnOiAnQCdcbiAgICB9XG4gIH07XG5cbn1dKTtcbiJdfQ==
