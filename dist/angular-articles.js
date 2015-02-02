/*! angular-articles - v0.0.0 - 2015-02-02 */
(function (angular, _) {
    'use strict';

    var module = angular.module('articles', [
        'ngRoute'
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
                .when('/sections/:section/articles/:article', {
                    controller: 'SectionsArticlesDetailCtrl',
                    templateUrl: 'templates/sections/articles-detail.html'
                })
                .otherwise({
                    redirectTo: '/articles/'
                });
        }
    ]);

    // Override this with a decorator to provide your own data.
    module.service('articlesBackend', [
        function () {
            var defaults = {
                articles: {
                    temp: {}
                },
                sections: {
                    temp: {
                        articles: ['temp']
                    }
                },
                flows: {
                    temp: {
                        sections: ['temp']
                    }
                }
            };
            var getListWithSlug = function (data) {
                return _.map(data, getObjectWithSlug);
            };
            var getObjectWithSlug = function (data, slug) {
                return angular.extend({
                    slug: slug
                }, data);
            };
            return {
                getArticles: function () {
                    return getListWithSlug(defaults.articles);
                },
                getArticle: function (slug) {
                    return getObjectWithSlug(defaults.articles[slug], slug);
                },
                getSections: function () {
                    return getListWithSlug(defaults.sections);
                },
                getSection: function (slug) {
                    return getObjectWithSlug(defaults.sections[slug], slug);
                },
                getFlows: function () {
                    return getListWithSlug(defaults.flows);
                },
                getFlow: function (slug) {
                    return getObjectWithSlug(defaults.flows[slug], slug);
                }
            };
        }
    ]);

    module.factory('articlesDataService', [
        'articlesBackend',
        function (articlesBackend) {
            return {
                getArticles: function () {
                    return articlesBackend.getArticles();
                },
                getArticle: function (slug) {
                    return articlesBackend.getArticle(slug);
                },
                getSections: function () {
                    return articlesBackend.getSections();
                },
                getSection: function (slug) {
                    return articlesBackend.getSection(slug);
                },
                getFlows: function () {
                    return articlesBackend.getFlows();
                },
                getFlow: function (slug) {
                    return articlesBackend.getFlow(slug);
                },
                getArticlesForSection: function (slug) {
                    var section = articlesBackend.getSection(slug);
                    return _.map(section.articles, articlesBackend.getArticle);
                },
                getSectionsForFlow: function (slug) {
                    var flow = articlesBackend.getFlow(slug);
                    return _.map(flow.sections, articlesBackend.getSection);
                }
            };
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