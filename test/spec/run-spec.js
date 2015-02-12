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
                // Provide the default backend to override the backend-mock.
                $provide.value('articlesBackend', angular.noop);
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
                $provide.value('articlesBackend', {});
                $provide.value('$log', $logMock);
            });

            // Run the module and ensure an error is thrown.
            expect(run).toThrowError('articles: articlesBackend is not providing required methods.');

            // Ensure $log was called with each specific method missing.
            var requiredMethods = [
                'getArticles',
                'getArticle',
                'getSections',
                'getSection',
                'getFlows',
                'getFlow'
            ];
            angular.forEach(requiredMethods, function (method) {
                expect($logMock.error).toHaveBeenCalledWith('articles: articlesBackend must provide a ' + method + ' method.');
            });

        });

    });

}(window.angular));
