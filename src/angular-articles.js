/**
* angular-articles Module
*
* Articles of content for AngularJS.
*/
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
    // Currently the library does not have any of its own methods to provide.
    module.factory('articlesBackend', function () {
        return {};
    });

    module.run([
        '$log', 'articlesBackend',
        function ($log, articlesBackend) {

            // Ensure a backend is provided.
            if (_.isEmpty(articlesBackend)) {
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
