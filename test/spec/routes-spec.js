/* global beforeEach, describe, expect, module, it, inject */
(function (angular) {

    'use strict';

    beforeEach(function () {
        module('articles');
    });

    describe('Unit: articles', function () {

        beforeEach(function () {
            module(function ($provide) {
                // Use the mocked backend provided on the window object.
                $provide.value('articlesBackend', window.articlesBackendMock);
            });
        });

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

            describe('/flows/', function () {
                beforeEach(function () {
                    route = $route.routes['/flows/'];
                });
                it('should be registered', function () {
                    expect(route).toBeDefined();
                });
                it('should use the flowsListCtrl controller', function () {
                    expect(route.controller).toBe('FlowsListCtrl');
                });
                it('should use the flows/list template', function () {
                    expect(route.templateUrl).toBe('templates/flows/list.html');
                });
            });

            describe('/flows/:flow/', function () {
                beforeEach(function () {
                    route = $route.routes['/flows/:flow/'];
                });
                it('should be registered', function () {
                    expect(route).toBeDefined();
                });
                it('should use the flowsDetailCtrl controller', function () {
                    expect(route.controller).toBe('FlowsDetailCtrl');
                });
                it('should use the flows/detail template', function () {
                    expect(route.templateUrl).toBe('templates/flows/detail.html');
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
                    expect(route.controller).toBe('SectionsArticlesDetailCtrl');
                });
                it('should use the sections/articles-detail template', function () {
                    expect(route.templateUrl).toBe('templates/sections/articles-detail.html');
                });
            });

            describe('/flows/:flow/sections/', function () {
                beforeEach(function () {
                    route = $route.routes['/flows/:flow/sections/'];
                });
                it('should be registered', function () {
                    expect(route).toBeDefined();
                });
                it('should use the FlowsSectionsListCtrl controller', function () {
                    expect(route.controller).toBe('FlowsSectionsListCtrl');
                });
                it('should use the flows/sections-list template', function () {
                    expect(route.templateUrl).toBe('templates/flows/sections-list.html');
                });
            });

            describe('/flows/:flow/sections/:section/', function () {
                beforeEach(function () {
                    route = $route.routes['/flows/:flow/sections/:section/'];
                });
                it('should be registered', function () {
                    expect(route).toBeDefined();
                });
                it('should use the FlowsSectionsDetailCtrl controller', function () {
                    expect(route.controller).toBe('FlowsSectionsDetailCtrl');
                });
                it('should use the flows/sections-detail template', function () {
                    expect(route.templateUrl).toBe('templates/flows/sections-detail.html');
                });
            });

            describe('/flows/:flow/sections/:section/articles/', function () {
                beforeEach(function () {
                    route = $route.routes['/flows/:flow/sections/:section/articles/'];
                });
                it('should be registered', function () {
                    expect(route).toBeDefined();
                });
                it('should use the FlowsSectionsArticlesListCtrl controller', function () {
                    expect(route.controller).toBe('FlowsSectionsArticlesListCtrl');
                });
                it('should use the flows/sections-articles-list template', function () {
                    expect(route.templateUrl).toBe('templates/flows/sections-articles-list.html');
                });
            });

            describe('/flows/:flow/sections/:section/articles/:article/', function () {
                beforeEach(function () {
                    route = $route.routes['/flows/:flow/sections/:section/articles/:article/'];
                });
                it('should be registered', function () {
                    expect(route).toBeDefined();
                });
                it('should use the FlowsSectionsArticlesDetailCtrl controller', function () {
                    expect(route.controller).toBe('FlowsSectionsArticlesDetailCtrl');
                });
                it('should use the flows/sections-articles-detail template', function () {
                    expect(route.templateUrl).toBe('templates/flows/sections-articles-detail.html');
                });
            });

        });

    });

}(window.angular));
