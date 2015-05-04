'use strict';

var embed = angular.module('ngEmbedGithubWiki');

embed.directive('githubWikiPage', [function defineGithubWikiPageDirective() {

  function link($element, $scope, $attrs) {
    console.log('in ghwp', $element, $scope, $attrs);
  }

  return {
    'restrict': 'EA',
    'link': link,
    'scope': {
      'id': '@',
      'pageid': '@'
    }
  };
}]);
