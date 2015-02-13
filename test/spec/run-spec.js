/* global beforeEach, module, inject, describe, it, expect, jasmine */
(function (angular) {

    'use strict';

    describe('Unit: articles run', function () {

        var run;

        beforeEach(function () {

            module('articles');

            run = function () {
                // Trigger the module's run method.
                inject(angular.noop);
            };

        });

        it('should error when a backend is not provided', function () {

            module(function ($provide) {
                $provide.value('articlesBackend', null);
            });

            // Run the module and ensure an error is thrown.
            expect(run).toThrowError('articles: articlesBackend must be provided. See source code for example.');
        });

        it('should error when some backend methods are not provided', function () {

            var $logMock = jasmine.createSpyObj('$log', [
                'error'
            ]);

            module(function ($provide) {
                // Provide an empty backend and a mocked $log service.
                $provide.value('$log', $logMock);
                $provide.decorator('articlesBackend', function ($delegate) {
                    $delegate.getArticles = angular.noop;
                    $delegate.getArticle = angular.noop;
                    return $delegate;
                });
            });

            // Run the module and ensure an error is thrown.
            expect(run).toThrowError('articles: articlesBackend is not providing required methods.');

            // Ensure $log was called with each specific method missing.
            var requiredMethods = [
                'getSections',
                'getSection',
                'getFlows',
                'getFlow',
                'getArticlesForSection',
                'getSectionsForFlow'
            ];
            angular.forEach(requiredMethods, function (method) {
                expect($logMock.error).toHaveBeenCalledWith('articles: articlesBackend must provide a ' + method + ' method.');
            });

            var providedMethods = [
                'getArticles',
                'getArticle'
            ];
            angular.forEach(providedMethods, function (method) {
                expect($logMock.error).not.toHaveBeenCalledWith('articles: articlesBackend must provide a ' + method + ' method.');
            });

        });

    });

}(window.angular));
