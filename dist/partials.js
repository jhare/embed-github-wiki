(function(module) {
try {
  module = angular.module('embedGithubWikiPartials');
} catch (e) {
  module = angular.module('embedGithubWikiPartials', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('ng-embed-github-wiki/ng-embed-github-wiki-partial.html',
    '<div class="waffles">hello i am a partial</div>');
}]);
})();
