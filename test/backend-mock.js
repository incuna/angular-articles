/* global beforeEach, module */
(function (angular) {

    'use strict';

    beforeEach(function () {
        module('articles');

        var articlesBackendMock = {};

        // Mock all the required methods for the backend, otherwise the module
        // will error.
        var requiredMethods = [
            'getArticles',
            'getArticle',
            'getSections',
            'getSection',
            'getFlows',
            'getFlow'
        ];
        angular.forEach(requiredMethods, function (method) {
            articlesBackendMock[method] = angular.noop;
        });

        module(function ($provide) {
            $provide.value('articlesBackend', articlesBackendMock);
        });

    });

}(window.angular));
