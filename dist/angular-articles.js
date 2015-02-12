/*! angular-articles - v0.0.0 - 2015-02-13 11:07:56 */
(function (angular, _) {
    'use strict';

    var module = angular.module('articles', [
        'ngRoute'
    ]);

    // Override the backend to provide your own data, like so:
    /*
    angular.module('articles').config([
        '$provide',
        function ($provide) {
            $provide.decorator('articlesBackend', [
                '$delegate',
                function ($delegate) {
                    // Use $delegate so this library's methods stay intact.
                    $delegate.requiredMethod = function () {};
                    $delegate.otherRequiredMethod = function () {};
                    return $delegate;
                }
            ]);
        }
    ]);
    */
    var emptyBackend = {};
    module.factory('articlesBackend', function () {
        return emptyBackend;
    });

    module.run([
        '$log', 'articlesBackend',
        function ($log, articlesBackend) {

            // Ensure a backend is provided.
            if (articlesBackend === emptyBackend) {
                throw new Error('articles: articlesBackend must be provided. See source code for example.');
            }

            // Ensure certain methods are provided on the backend.
            var requiredMethods = [
                'getArticles',
                'getArticle',
                'getSections',
                'getSection',
                'getFlows',
                'getFlow',
                'getArticlesForSection',
                'getSectionsForFlow'
            ];
            var hasErrored = false;
            angular.forEach(requiredMethods, function (method) {
                if (!_.has(articlesBackend, method)) {
                    hasErrored = true;
                    $log.error('articles: articlesBackend must provide a ' + method + ' method.');
                }
            });
            if (hasErrored) {
                throw new Error('articles: articlesBackend is not providing required methods.');
            }

        }
    ]);

    module.factory('articlesDataService', [
        'articlesBackend',
        function (articlesBackend) {
            // Currently the library has no methods of its own to provide.
            return {
                getArticles: articlesBackend.getArticles,
                getArticle: articlesBackend.getArticle,
                getSections: articlesBackend.getSections,
                getSection: articlesBackend.getSection,
                getFlows: articlesBackend.getFlows,
                getFlow: articlesBackend.getFlow,
                getArticlesForSection: articlesBackend.getArticlesForSection,
                getSectionsForFlow: articlesBackend.getSectionsForFlow
            };
        }
    ]);

    module.config([
        '$routeProvider',
        function ($routeProvider) {
            $routeProvider
                .when('/articles/', {
                    controller: 'ArticlesListCtrl',
                    templateUrl: 'templates/articles/list.html'
                })
                .when('/articles/:article/', {
                    controller: 'ArticlesDetailCtrl',
                    templateUrl: 'templates/articles/detail.html'
                })
                .when('/sections/', {
                    controller: 'SectionsListCtrl',
                    templateUrl: 'templates/sections/list.html'
                })
                .when('/sections/:section/', {
                    controller: 'SectionsDetailCtrl',
                    templateUrl: 'templates/sections/detail.html'
                })
                .when('/sections/:section/articles/', {
                    controller: 'SectionsArticlesListCtrl',
                    templateUrl: 'templates/sections/articles-list.html'
                })
                .when('/sections/:section/articles/:article/', {
                    controller: 'SectionsArticlesDetailCtrl',
                    templateUrl: 'templates/sections/articles-detail.html'
                });
        }
    ]);

    module.controller('ArticlesListCtrl', [
        '$scope', 'articlesDataService',
        function ($scope, articlesDataService) {
            $scope.articles = articlesDataService.getArticles();
        }
    ]);

    module.controller('ArticlesDetailCtrl', [
        '$scope', '$routeParams', 'articlesDataService',
        function ($scope, $routeParams, articlesDataService) {
            var slug = $routeParams.article;
            $scope.article = articlesDataService.getArticle(slug);
        }
    ]);

    module.controller('SectionsListCtrl', [
        '$scope', 'articlesDataService',
        function ($scope, articlesDataService) {
            $scope.sections = articlesDataService.getSections();
        }
    ]);

    module.controller('SectionsDetailCtrl', [
        '$scope', '$routeParams', 'articlesDataService',
        function ($scope, $routeParams, articlesDataService) {
            var slug = $routeParams.section;
            $scope.section = articlesDataService.getSection(slug);
        }
    ]);

    module.controller('SectionsArticlesListCtrl', [
        '$scope', '$routeParams', 'articlesDataService',
        function ($scope, $routeParams, articlesDataService) {
            var slug = $routeParams.section;
            $scope.section = articlesDataService.getSection(slug);
            $scope.articles = articlesDataService.getArticlesForSection(slug);
        }
    ]);

    module.controller('SectionsArticlesDetailCtrl', [
        '$scope', '$routeParams', '$location', 'articlesDataService',
        function ($scope, $routeParams, $location, articlesDataService) {
            var sectionSlug = $routeParams.section;
            var articleSlug = $routeParams.article;
            $scope.section = articlesDataService.getSection(sectionSlug);
            $scope.article = articlesDataService.getArticle(articleSlug);
            if (!_.contains($scope.section.articles, articleSlug)) {
                // Article is not in this section.
                $location.path('/404/').replace();
            }
        }
    ]);

}(window.angular, window._));

angular.module('articles').run(['$templateCache', function($templateCache) {
  'use strict';

  $templateCache.put('templates/articles/detail.html',
    "<h1>Article: {{ article.slug }}</h1><div ng-include=article.templateUrl></div><a href=\"#/articles/\">&lt;– Articles</a>"
  );


  $templateCache.put('templates/articles/list.html',
    "<h1>Articles</h1><ul><li ng-repeat=\"article in articles\"><a ng-href=\"#/articles/{{ article.slug }}/\">Article: {{ article.slug }}</a></li></ul>"
  );


  $templateCache.put('templates/sections/articles-detail.html',
    "<h1>Section: {{ section.slug }}</h1><h2>Article: {{ article.slug }}</h2><div ng-include=article.templateUrl></div><a href=\"#/sections/{{ section.slug }}/articles/\">&lt;– Section articles: {{ section.slug }}</a>"
  );


  $templateCache.put('templates/sections/articles-list.html',
    "<h1>Section: {{ section.slug }}</h1><ul><li ng-repeat=\"article in articles\"><a ng-href=\"#/sections/{{ section.slug }}/articles/{{ article.slug }}/\">Article: {{ article.slug }}</a></li></ul><a href=\"#/sections/{{ section.slug }}/\">&lt;– Section: {{ section.slug }}</a>"
  );


  $templateCache.put('templates/sections/detail.html',
    "<h1>Section: {{ section.slug }}</h1><a href=\"#/sections/\">&lt;– Sections</a> <a href=\"#/sections/{{ section.slug }}/articles/\">Articles of {{ section.slug }} – &gt;</a>"
  );


  $templateCache.put('templates/sections/list.html',
    "<h1>Sections</h1><ul><li ng-repeat=\"section in sections\"><a ng-href=\"#/sections/{{ section.slug }}/\">Section: {{ section.slug }}</a></li></ul>"
  );

}]);
