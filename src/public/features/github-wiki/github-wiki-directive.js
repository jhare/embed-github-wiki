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
