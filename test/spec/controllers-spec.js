/* global beforeEach, describe, expect, module, it, inject, spyOn */
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

        describe('controllers', function () {

            var $controller;

            var articlesDataServiceMock;
            var dataMockList;
            var getDataMock;

            var ctrl;
            var $scope;

            beforeEach(function () {

                $scope = {};

                dataMockList = {
                    slug: 'test'
                };
                getDataMock = function (slug) {
                    if (slug) {
                        return dataMockList[slug];
                    }
                    return dataMockList;
                };

                articlesDataServiceMock = {
                    getArticles: getDataMock,
                    getArticle: getDataMock,
                    getSections: getDataMock,
                    getSection: getDataMock,
                    getFlows: getDataMock,
                    getFlow: getDataMock,
                    getArticlesForSection: getDataMock,
                    getSectionsForFlow: getDataMock
                };

                module(function ($provide) {
                    $provide.value('articlesDataService', articlesDataServiceMock);
                });

                inject(function (_$controller_) {
                    $controller = _$controller_;
                });

            });

            describe('ArticlesListCtrl', function () {

                beforeEach(function () {
                    spyOn(articlesDataServiceMock, 'getArticles').and.callThrough();
                    ctrl = $controller('ArticlesListCtrl', {
                        $scope: $scope
                    });
                });

                it('should be defined', function () {
                    expect(ctrl).toBeDefined();
                });

                it('should set $scope.articles to the return of articlesDataService.getArticles', function () {
                    expect($scope.articles).toBe(dataMockList);
                });

            });

            describe('ArticlesDetailCtrl', function () {

                beforeEach(function () {
                    ctrl = $controller('ArticlesDetailCtrl', {
                        $scope: $scope,
                        $routeParams: {
                            article: 'slug'
                        }
                    });
                });

                it('should be defined', function () {
                    expect(ctrl).toBeDefined();
                });

                it('should set $scope.article to the return of articlesDataService.getArticle when given a slug', function () {
                    expect($scope.article).toBe(dataMockList.slug);
                });

            });

            describe('SectionsListCtrl', function () {

                beforeEach(function () {
                    spyOn(articlesDataServiceMock, 'getSections').and.callThrough();
                    ctrl = $controller('SectionsListCtrl', {
                        $scope: $scope
                    });
                });

                it('should be defined', function () {
                    expect(ctrl).toBeDefined();
                });

                it('should set $scope.sections to the return of articlesDataService.getSections', function () {
                    expect($scope.sections).toBe(dataMockList);
                });

            });

            describe('SectionsDetailCtrl', function () {

                beforeEach(function () {
                    ctrl = $controller('SectionsDetailCtrl', {
                        $scope: $scope,
                        $routeParams: {
                            section: 'slug'
                        }
                    });
                });

                it('should be defined', function () {
                    expect(ctrl).toBeDefined();
                });

                it('should set $scope.section to the return of articlesDataService.getSection when given a slug', function () {
                    expect($scope.section).toBe(dataMockList.slug);
                });

            });

            describe('FlowsListCtrl', function () {

                beforeEach(function () {
                    spyOn(articlesDataServiceMock, 'getFlows').and.callThrough();
                    ctrl = $controller('FlowsListCtrl', {
                        $scope: $scope
                    });
                });

                it('should be defined', function () {
                    expect(ctrl).toBeDefined();
                });

                it('should set $scope.flows to the return of articlesDataService.getFlows', function () {
                    expect($scope.flows).toBe(dataMockList);
                });

            });

            describe('FlowsDetailCtrl', function () {

                beforeEach(function () {
                    ctrl = $controller('FlowsDetailCtrl', {
                        $scope: $scope,
                        $routeParams: {
                            flow: 'slug'
                        }
                    });
                });

                it('should be defined', function () {
                    expect(ctrl).toBeDefined();
                });

                it('should set $scope.flow to the return of articlesDataService.getFlow when given a slug', function () {
                    expect($scope.flow).toBe(dataMockList.slug);
                });

            });

            describe('SectionsArticlesListCtrl', function () {

                beforeEach(function () {
                    ctrl = $controller('SectionsArticlesListCtrl', {
                        $scope: $scope,
                        $routeParams: {
                            section: 'slug'
                        }
                    });
                });

                it('should be defined', function () {
                    expect(ctrl).toBeDefined();
                });

                it('should set $scope.section to the return of articlesDataService.getSection when given a slug', function () {
                    expect($scope.section).toBe(dataMockList.slug);
                });

                it('should set $scope.article to the return of articlesDataService.getArticlesForSection when given a slug', function () {
                    expect($scope.articles).toBe(dataMockList.slug);
                });

            });

            describe('SectionsArticlesDetailCtrl', function () {

                beforeEach(function () {

                    ctrl = $controller('SectionsArticlesDetailCtrl', {
                        $scope: $scope,
                        $routeParams: {
                            article: 'slug',
                            section: 'slug'
                        }
                    });

                });

                it('should be defined', function () {
                    expect(ctrl).toBeDefined();
                });

                it('should set $scope.section to the return of articlesDataService.getSection when given a slug', function () {
                    expect($scope.section).toBe(dataMockList.slug);
                });

                it('should set $scope.article to the return of articlesDataService.getArticle when given a slug', function () {
                    expect($scope.article).toBe(dataMockList.slug);
                });

                describe('redirect', function () {

                    var $location;

                    beforeEach(function () {

                        dataMockList = {
                            section: {
                                articles: [
                                    'articleInSection'
                                ]
                            },
                            articleInSection: 'articleData',
                            articleNotInSection: 'articleData'
                        };

                        inject(function (_$location_) {
                            $location = _$location_;
                            // This must call through if $location.path() is
                            // is chained with .replace()
                            spyOn($location, 'path').and.callThrough();
                            spyOn($location, 'replace');
                        });

                    });

                    it('should not redirect to 404 if the article is found in the section', function () {
                        ctrl = $controller('SectionsArticlesDetailCtrl', {
                            $scope: $scope,
                            $routeParams: {
                                article: 'articleInSection',
                                section: 'section'
                            }
                        });
                        expect($location.path).not.toHaveBeenCalledWith('/404/');
                        expect($location.replace).not.toHaveBeenCalled();
                    });

                    it('should redirect to 404 if the article is not in the section', function () {
                        ctrl = $controller('SectionsArticlesDetailCtrl', {
                            $scope: $scope,
                            $routeParams: {
                                article: 'articleNotInSection',
                                section: 'section'
                            }
                        });
                        expect($location.path).toHaveBeenCalledWith('/404/');
                        expect($location.replace).toHaveBeenCalled();
                    });

                });

            });

            describe('FlowsSectionsListCtrl', function () {

                beforeEach(function () {
                    ctrl = $controller('FlowsSectionsListCtrl', {
                        $scope: $scope,
                        $routeParams: {
                            flow: 'slug'
                        }
                    });
                });

                it('should be defined', function () {
                    expect(ctrl).toBeDefined();
                });

                it('should set $scope.section to the return of articlesDataService.getFlow when given a slug', function () {
                    expect($scope.flow).toBe(dataMockList.slug);
                });

                it('should set $scope.article to the return of articlesDataService.getSectionsForFlow when given a slug', function () {
                    expect($scope.sections).toBe(dataMockList.slug);
                });

            });

        });

    });

}(window.angular));
