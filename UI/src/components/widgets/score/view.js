(function () {
    'use strict';

    angular
        .module(HygieiaConfig.module)
        .controller('scoreViewController', scoreViewController);

    scoreViewController.$inject = ['$scope', 'scoreData', '$q', '$uibModal', 'scoreDataService'];
    function scoreViewController($scope, scoreData, $q, $uibModal, scoreDataService) {
        /*jshint validthis:true */
        var ctrl = this;

        ctrl.rateItOptions = {
            readOnly : true,
            step : 0.1,
            starWidth : 44,
            starHeight : 44
        };

        ctrl.data = {};
        ctrl.load = load;

        function load() {
            var deferred = $q.defer();
            scoreData.details($scope.widgetConfig.componentId).then(function(data) {
                var result = data.result;
                processResponse(result);
                scoreDataService.addDashboardScore(result);
                deferred.resolve(data.lastUpdated);
            });
            return deferred.promise;
        }


        function processResponse(data) {
            ctrl.data = data;
            ctrl.rateItOptions.value = data.score;
        }

        ctrl.viewDetails = function() {
            $uibModal.open({
                templateUrl: 'app/dashboard/views/scoreComponentDetails.html',
                controller: 'ScoreComponentDetailsController',
                controllerAs: 'detail',
                size: 'lg',
                resolve: {
                    scoreComponent: function() {
                        return ctrl.data;
                    }
                }
            });
        };



    }
})();