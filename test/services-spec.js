/* global beforeEach, describe, expect, module, it, inject, spyOn */
(function (angular) {

    'use strict';

    beforeEach(function () {
        module('articles');
    });

    describe('Unit: articles services', function () {

        describe('articlesDataService', function () {

            var articlesDataService;

            var articlesBackendMock;

            beforeEach(function () {

                articlesBackendMock = {};

                module(function ($provide) {
                    $provide.value('articlesBackend', articlesBackendMock);
                });

                inject(function (_articlesDataService_) {
                    articlesDataService = _articlesDataService_;
                });

            });

            describe('getArticles', function () {

                var articles;

                beforeEach(function () {

                    articles = {};
                    articlesBackendMock.getArticles = function () {
                        return articles;
                    };
                    spyOn(articlesBackendMock, 'getArticles').and.callThrough();

                });

                it('should call articlesBackend.getArticles', function () {
                    articlesDataService.getArticles();
                    expect(articlesBackendMock.getArticles).toHaveBeenCalled();
                });

                it('should return all articles', function () {
                    expect(articlesDataService.getArticles()).toBe(articles);
                });

            });

            describe('getArticle', function () {

                var articles;

                beforeEach(function () {

                    articles = {
                        test: {}
                    };
                    articlesBackendMock.getArticle = function (slug) {
                        return articles[slug];
                    };
                    spyOn(articlesBackendMock, 'getArticle').and.callThrough();

                });

                it('should call articlesBackend.getArticle with a slug', function () {
                    articlesDataService.getArticle('test');
                    expect(articlesBackendMock.getArticle).toHaveBeenCalledWith('test');
                });

                it('should return the correct article', function () {
                    expect(articlesDataService.getArticle('test')).toBe(articles.test);
                });

            });

            describe('getSections', function () {

                var sections;

                beforeEach(function () {

                    sections = {};
                    articlesBackendMock.getSections = function () {
                        return sections;
                    };
                    spyOn(articlesBackendMock, 'getSections').and.callThrough();

                });

                it('should call articlesBackend.getSections', function () {
                    articlesDataService.getSections();
                    expect(articlesBackendMock.getSections).toHaveBeenCalled();
                });

                it('should return all sections', function () {
                    expect(articlesDataService.getSections()).toBe(sections);
                });

            });

            describe('getSection', function () {

                var sections;

                beforeEach(function () {

                    sections = {
                        test: {}
                    };
                    articlesBackendMock.getSection = function (slug) {
                        return sections[slug];
                    };
                    spyOn(articlesBackendMock, 'getSection').and.callThrough();

                });

                it('should call articlesBackend.getSection with a slug', function () {
                    articlesDataService.getSection('test');
                    expect(articlesBackendMock.getSection).toHaveBeenCalledWith('test');
                });

                it('should return the correct section', function () {
                    expect(articlesDataService.getSection('test')).toBe(sections.test);
                });

            });

            describe('getFlows', function () {

                var flows;

                beforeEach(function () {

                    flows = {};
                    articlesBackendMock.getFlows = function () {
                        return flows;
                    };
                    spyOn(articlesBackendMock, 'getFlows').and.callThrough();

                });

                it('should call articlesBackend.getFlows', function () {
                    articlesDataService.getFlows();
                    expect(articlesBackendMock.getFlows).toHaveBeenCalled();
                });

                it('should return all flows', function () {
                    expect(articlesDataService.getFlows()).toBe(flows);
                });

            });

            describe('getFlow', function () {

                var flows;

                beforeEach(function () {

                    flows = {
                        test: {}
                    };
                    articlesBackendMock.getFlow = function (slug) {
                        return flows[slug];
                    };
                    spyOn(articlesBackendMock, 'getFlow').and.callThrough();

                });

                it('should call articlesBackend.getFlow with a slug', function () {
                    articlesDataService.getFlow('test');
                    expect(articlesBackendMock.getFlow).toHaveBeenCalledWith('test');
                });

                it('should return the correct flow', function () {
                    expect(articlesDataService.getFlow('test')).toBe(flows.test);
                });

            });

            describe('getArticlesForSection', function () {

                var articles;
                var sections;

                beforeEach(function () {

                    articles = {
                        testArticle1: {},
                        testArticle2: {}
                    };
                    sections = {
                        testSection: {
                            articles: [
                                'testArticle1',
                                'testArticle2'
                            ]
                        }
                    };
                    articlesBackendMock.getArticle = function (slug) {
                        return articles[slug];
                    };
                    articlesBackendMock.getSection = function (slug) {
                        return sections[slug];
                    };
                    spyOn(articlesBackendMock, 'getArticle').and.callThrough();
                    spyOn(articlesBackendMock, 'getSection').and.callThrough();

                });

                it('should call articlesBackend.getSection with a slug', function () {
                    articlesDataService.getArticlesForSection('testSection');
                    expect(articlesBackendMock.getSection).toHaveBeenCalledWith('testSection');
                });

                it('should call articlesBackend.getArticle with arguments from _.map', function () {
                    articlesDataService.getArticlesForSection('testSection');
                    expect(articlesBackendMock.getArticle).toHaveBeenCalledWith('testArticle1', 0, ['testArticle1', 'testArticle2']);
                    expect(articlesBackendMock.getArticle).toHaveBeenCalledWith('testArticle2', 1, ['testArticle1', 'testArticle2']);
                });

                it('should return the correct articles for the section', function () {
                    expect(articlesDataService.getArticlesForSection('testSection')).toEqual([articles.testArticle1, articles.testArticle2]);
                });

            });

            describe('getSectionsForFlow', function () {

                var sections;
                var flows;

                beforeEach(function () {

                    sections = {
                        testSection1: {},
                        testSection2: {}
                    };
                    flows = {
                        testFlow: {
                            sections: [
                                'testSection1',
                                'testSection2'
                            ]
                        }
                    };
                    articlesBackendMock.getSection = function (slug) {
                        return sections[slug];
                    };
                    articlesBackendMock.getFlow = function (slug) {
                        return flows[slug];
                    };
                    spyOn(articlesBackendMock, 'getSection').and.callThrough();
                    spyOn(articlesBackendMock, 'getFlow').and.callThrough();

                });

                it('should call articlesBackend.getFlow with a slug', function () {
                    articlesDataService.getSectionsForFlow('testFlow');
                    expect(articlesBackendMock.getFlow).toHaveBeenCalledWith('testFlow');
                });

                it('should call articlesBackend.getSection with arguments from _.map', function () {
                    articlesDataService.getSectionsForFlow('testFlow');
                    expect(articlesBackendMock.getSection).toHaveBeenCalledWith('testSection1', 0, ['testSection1', 'testSection2']);
                    expect(articlesBackendMock.getSection).toHaveBeenCalledWith('testSection2', 1, ['testSection1', 'testSection2']);
                });

                it('should return the correct sections for the flow', function () {
                    expect(articlesDataService.getSectionsForFlow('testFlow')).toEqual([sections.testSection1, sections.testSection2]);
                });

            });

        });

    });

}(window.angular));
