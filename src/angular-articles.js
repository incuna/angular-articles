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
