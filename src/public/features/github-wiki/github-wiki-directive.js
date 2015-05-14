'use strict';

var embed = angular.module('ngEmbedGithubWiki', []);
var MarkdownIt = require('markdown-it');
var hljs = require('highlight.js');

var md = new MarkdownIt({
  'highlight': function (str, lang) {
    if (lang && hljs.getLanguage(lang)) {
      try {
        return hljs.highlight(lang, str).value;
      } catch (__) {}
    }

    try {
      return hljs.highlightAuto(str).value;
    } catch (__) {}

    return ''; // use external default escaping
  }                      
});

embed.directive('githubWikiPage', [function defineGithubWikiPageDirective() {

  function link($scope, $element) {
    function getMarkdownSuccess(markDown) {
      var renderedMarkdown = md.render(markDown);
      $element.html(renderedMarkdown);
    }

    $.ajax($scope.pagename, {
      'success': getMarkdownSuccess
    });
  }

  return {
    'restrict': 'EA',
    'link': link,
    'templateUrl': 'partials/github-wiki/github-wiki-partial.html',
    'scope': {
      'id': '@',
      'pagename': '@'
    }
  };

}]);
