/* global beforeEach, afterEach */
(function (angular) {

    'use strict';

    beforeEach(function () {

        window.articlesBackendMock = {};

        // Mock all the required methods for the backend, otherwise the module
        // will error during tests.
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
        angular.forEach(requiredMethods, function (method) {
            window.articlesBackendMock[method] = angular.noop;
        });

    });

    afterEach(function () {
        window.articlesBackendMock = null;
    });

}(window.angular));
