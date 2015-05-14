'use strict';

var embed = angular.module('ngEmbedGithubWiki', []);
var MarkdownIt = require('markdown-it');
var highlight = require('highlight');

var md = new MarkdownIt();

embed.directive('githubWikiPage', [function defineGithubWikiPageDirective() {

  function link($scope, $element, $attrs) {
    function getMarkdownSuccess(markDown) {
      console.log('data is', markDown);
      console.log('md is', md);

      var renderedMarkdown = md.render(markDown);
      $element.html(renderedMarkdown);
    }

    function getMarkdownComplete(jqXHR, textStatus) {
      console.log('complete call', jqXHR, textStatus);
    }

    function getMarkdownError(error, textStatus, jqXHR) {
      console.log('had error', error, textStatus, jqXHR);
    }

    $.ajax('/markdown/Best-Practices---Angular.md', {
      'success': getMarkdownSuccess,
      'complete': getMarkdownComplete,
      'error': getMarkdownError,
    });

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
