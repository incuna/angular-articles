/* global beforeEach, describe, expect, module, it, inject, jasmine */
(function (angular) {

    'use strict';

    beforeEach(function () {
        module('articles');
    });

    describe('Unit: articles services', function () {

        var articlesBackendMock;

        beforeEach(function () {

            articlesBackendMock = jasmine.createSpyObj('articlesBackend', [
                'getArticles',
                'getArticle',
                'getSections',
                'getSection',
                'getFlows',
                'getFlow',
                'getArticlesForSection',
                'getSectionsForFlow'
            ]);

            module(function ($provide) {
                $provide.value('articlesBackend', articlesBackendMock);
            });

        });

        describe('articlesDataService', function () {

            var articlesDataService;

            beforeEach(function () {

                inject(function (_articlesDataService_) {
                    articlesDataService = _articlesDataService_;
                });

            });

            describe('getArticles', function () {
                it('should call articlesBackend.getArticles', function () {
                    articlesDataService.getArticles();
                    expect(articlesBackendMock.getArticles).toHaveBeenCalled();
                });
            });

            describe('getArticle', function () {
                it('should call articlesBackend.getArticle', function () {
                    articlesDataService.getArticle();
                    expect(articlesBackendMock.getArticle).toHaveBeenCalled();
                });
            });

            describe('getSections', function () {
                it('should call articlesBackend.getSections', function () {
                    articlesDataService.getSections();
                    expect(articlesBackendMock.getSections).toHaveBeenCalled();
                });
            });

            describe('getSection', function () {
                it('should call articlesBackend.getSection', function () {
                    articlesDataService.getSection();
                    expect(articlesBackendMock.getSection).toHaveBeenCalled();
                });
            });

            describe('getFlows', function () {
                it('should call articlesBackend.getFlows', function () {
                    articlesDataService.getFlows();
                    expect(articlesBackendMock.getFlows).toHaveBeenCalled();
                });
            });

            describe('getFlow', function () {
                it('should call articlesBackend.getFlow', function () {
                    articlesDataService.getFlow();
                    expect(articlesBackendMock.getFlow).toHaveBeenCalled();
                });
            });

            describe('getArticlesForSection', function () {
                it('should call articlesBackend.getArticlesForSection', function () {
                    articlesDataService.getArticlesForSection();
                    expect(articlesBackendMock.getArticlesForSection).toHaveBeenCalled();
                });
            });

            describe('getSectionsForFlow', function () {
                it('should call articlesBackend.getSectionsForFlow', function () {
                    articlesDataService.getSectionsForFlow();
                    expect(articlesBackendMock.getSectionsForFlow).toHaveBeenCalled();
                });
            });

        });

    });

}(window.angular));
