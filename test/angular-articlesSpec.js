/* global beforeEach, describe, expect, module, it, inject */
(function (angular) {

    'use strict';

    beforeEach(function () {
        module('articles');
    });

    describe('Unit: articles', function () {

        describe('routes', function () {

            var $route;
            var route;

            beforeEach(function () {
                inject(function (_$route_) {
                    $route = _$route_;
                });
            });

            describe('/articles/', function () {
                beforeEach(function () {
                    route = $route.routes['/articles/'];
                });
                it('should be registered', function () {
                    expect(route).toBeDefined();
                });
                it('should use the ArticlesListCtrl controller', function () {
                    expect(route.controller).toBe('ArticlesListCtrl');
                });
                it('should use the articles/list template', function () {
                    expect(route.templateUrl).toBe('templates/articles/list.html');
                });
            });

            describe('/articles/:article/', function () {
                beforeEach(function () {
                    route = $route.routes['/articles/:article/'];
                });
                it('should be registered', function () {
                    expect(route).toBeDefined();
                });
                it('should use the ArticlesDetailCtrl controller', function () {
                    expect(route.controller).toBe('ArticlesDetailCtrl');
                });
                it('should use the articles/detail template', function () {
                    expect(route.templateUrl).toBe('templates/articles/detail.html');
                });
            });

            describe('/sections/', function () {
                beforeEach(function () {
                    route = $route.routes['/sections/'];
                });
                it('should be registered', function () {
                    expect(route).toBeDefined();
                });
                it('should use the SectionsListCtrl controller', function () {
                    expect(route.controller).toBe('SectionsListCtrl');
                });
                it('should use the sections/list template', function () {
                    expect(route.templateUrl).toBe('templates/sections/list.html');
                });
            });

            describe('/sections/:section/', function () {
                beforeEach(function () {
                    route = $route.routes['/sections/:section/'];
                });
                it('should be registered', function () {
                    expect(route).toBeDefined();
                });
                it('should use the SectionsDetailCtrl controller', function () {
                    expect(route.controller).toBe('SectionsDetailCtrl');
                });
                it('should use the sections/detail template', function () {
                    expect(route.templateUrl).toBe('templates/sections/detail.html');
                });
            });

            describe('/sections/:section/articles/', function () {
                beforeEach(function () {
                    route = $route.routes['/sections/:section/articles/'];
                });
                it('should be registered', function () {
                    expect(route).toBeDefined();
                });
                it('should use the SectionsArticlesListCtrl controller', function () {
                    expect(route.controller).toBe('SectionsArticlesListCtrl');
                });
                it('should use the sections/articles-list template', function () {
                    expect(route.templateUrl).toBe('templates/sections/articles-list.html');
                });
            });

            describe('/sections/:section/articles/:article/', function () {
                beforeEach(function () {
                    route = $route.routes['/sections/:section/articles/:article/'];
                });
                it('should be registered', function () {
                    expect(route).toBeDefined();
                });
                it('should use the SectionsArticlesDetailCtrl controller', function () {
                    expect(route.controller).toBeDefined('SectionsArticlesDetailCtrl');
                });
                it('should use the sections/articles-detail template', function () {
                    expect(route.templateUrl).toBe('templates/sections/articles-detail.html');
                });
            });

            describe('otherwise', function () {
                it('should redirect to /articles/', function () {
                    expect($route.routes[null].redirectTo).toBe('/articles/');
                });
            });

        });

    });

}(window.angular));
