angular.module('app')
    .factory('utilityService', ['$http', '$rootScope', '$uibModal', '$q', '$filter', '$interval', 'myUrl', '$cookies',
        function utilityService($http, $rootScope, $uibModal, $q, $filter, $interval, myUrl, $cookies) {
            var service = {
                showMessages: showMessages,
                callHttp: callHttp,
                openModal: openModal,
                showGenericMessage: showGenericMessage,
                showSummaryMessages: showSummaryMessages
            };

            return service;

            function modalDraggable() {
                setTimeout(function () {
                    $(".modal-content").draggable({
                        handle: ".modal-header",
                        opacity: 0.85,
                        distance: 10,
                        scroll: true,
                        stop: function () { },
                        drag: function (e, ui) {
                            var w = $(ui.helper[0]).width();
                            if (ui.offset.left < 1 || ui.offset.left > window.innerWidth - w) {
                                ui.position.left = ui.originalPosition.left;
                            }
                            else {
                                ui.originalPosition.left = ui.position.left;
                            }

                            var h = $(ui.helper[0]).height();
                            if (ui.offset.top < 1 || ui.offset.top > window.innerHeight - h) {
                                ui.position.top = ui.originalPosition.top;
                            }
                            else {
                                ui.originalPosition.top = ui.position.top;
                            }

                        }
                    });
                    $(".modal-header").css("cursor", "move");
                }, 150);
            };

            function openModal(modalConfig) {
                var callConfig = {
                    animation: true,
                    backdrop: 'static',
                    keyboard: false,
                    size: 'medium',
                    isHisOwnCrud: true
                };

                $.extend(callConfig, modalConfig);

                var makeTitle = function () {
                    var title = "";
                    if (!callConfig.isHisOwnCrud) {
                        title = title + callConfig.entity + " > ";
                    }

                    var action = "create";
                    if (callConfig.action) {
                        action = callConfig.action;
                    }
                    else if (callConfig.resolve.items().action) {
                        action = callConfig.resolve.items().action;
                    }

                    if (action == "edit") {
                        title = title + $filter('translate')('generic.button.edit');
                    }
                    else if (action == "create") {
                        title = title + $filter('translate')('generic.button.new');
                    }
                    else if (action == "show") {
                        title = title + modalConfig.route.Show;
                    }
                    else if (action == "delete") {
                        title = title + $filter('translate')('generic.button.delete');
                    }

                    return title;
                }


                var title = makeTitle();
                var resolve;

                //si no tiene la accion en esta instancia, deberia estar ya embebida en el resolve
                if (callConfig.action) {
                    //si dispone de validaciones embebidas en el resolve
                    if (callConfig.resolve.validations) {
                        resolve = {
                            items: function () {
                                var objectCollection = $.extend(callConfig.resolve.items(), { action: callConfig.action }, { MessageTittle: title });

                                return objectCollection;
                            },
                            validations: callConfig.resolve.validations

                        }
                    }
                    else {
                        resolve = {
                            items: function () {
                                var objectCollection = $.extend(callConfig.resolve.items(), { action: callConfig.action }, { MessageTittle: title });

                                return objectCollection;
                            }
                        }
                    }
                }
                else {
                    if (callConfig.resolve.validations) {
                        resolve = {
                            items: function () {
                                var objectCollection = $.extend(callConfig.resolve.items(), { MessageTittle: title });
                                return objectCollection;
                            },
                            validations: callConfig.resolve.validations
                        }
                    }
                    else {
                        resolve = {
                            items: function () {
                                var objectCollection = $.extend(callConfig.resolve.items(), { MessageTittle: title });

                                return objectCollection;
                            }
                        }
                    }
                }

                var modalInstance = $uibModal.open({
                    animation: callConfig.animation,
                    backdrop: callConfig.backdrop,
                    keyboard: callConfig.keyboard,
                    size: callConfig.size,
                    templateUrl: callConfig.templateUrl,
                    controller: callConfig.controller,
                    resolve: resolve
                });

                modalDraggable();
                return modalInstance;
            };

            function showGenericMessage(key, translationData) {
                var displayType = $filter('translate')('messages.' + key + '.Display');
                var message = $filter('translate')('messages.' + key + '.Text', translationData);
                var messageTitle = $filter('translate')('messages.' + key + '.Title');
                var messageType = $filter('translate')('messages.' + key + '.Type');

                if (displayType == "Popup") {

                    var modal = $uibModal.open({
                        animation: true,
                        backdrop: 'static',
                        keyboard: false,
                        size: 'medium',
                        templateUrl: 'app/components/messages/message.html',
                        controller: 'messageController as mc',
                        resolve: {
                            items: function () {
                                return {
                                    MessageType: messageType,
                                    MessageTittle: messageTitle,
                                    Message: message
                                };
                            }
                        }
                    });

                    modalDraggable();
                    return modal;
                }
                else if (displayType == "Dismiss") {

                    var button = $("<button type='button' class='close' data-dismiss='alert' aria-label='Close'><span aria-hidden='true'>&times;</span></button>");

                    if (messageType == "Alert") {
                        var dismiss = $("<div class='alert alert-warning alert-dismissible' role='alert'></div>");
                    }
                    else if (messageType == "Error") {
                        var dismiss = $("<div class='alert alert-danger alert-dismissible' role='alert'></div>");
                    }
                    else if (messageType == "Info") {
                        var dismiss = $("<div class='alert alert-success alert-dismissible' role='alert'></div>");
                    }

                    dismiss.append(button);
                    dismiss.append("<strong>" + messageTitle + "</strong> " + message);

                    angular.element("#dismissContainer").append(dismiss);

                    $interval(function () {
                        angular.element("#dismissContainer").children().remove();
                    }, 5000, 1);
                }
            };

            function showMessages(title, message, vcancel, callbackSuccess, callbackError) {
                var modal = $uibModal.open({
                    animation: true,
                    backdrop: 'static',
                    keyboard: false,
                    size: 'medium',
                    templateUrl: 'app/components/messages/message.html',
                    controller: 'messageController as mc',
                    resolve: {
                        items: function () {
                            return {
                                MessageTittle: title,
                                Message: message,
                                ViewCancel: vcancel
                            };
                        }
                    }
                });

                var responseHandler = function (result) {
                    if (result == "ok" && callbackSuccess) {
                        callbackSuccess();
                    }
                    else if (callbackError) {
                        callbackError();
                    }
                };

                modal.result.then(
                //Close
                function (result) {
                    responseHandler(result);
                },
                //Dismiss
                function (result) {
                    responseHandler(result);
                });

                modalDraggable();
            };

            function showSummaryMessages(key, summary, additionalInfo) {
                var translationData = '';
                var displayType = $filter('translate')('messages.' + key + '.Display');
                var message = $filter('translate')('messages.' + key + '.Text', translationData) + '<BR/>';
                var messageTitle = $filter('translate')('messages.' + key + '.Title');
                var messageType = $filter('translate')('messages.' + key + '.Type');

                for (var i in summary) {
                    if (summary[i] != '') {
                        message += '<BR/> - ' + $filter('translate')(summary[i]);
                        if (additionalInfo[i] != '') {
                            message += '<BR/>' + additionalInfo[i];
                        }
                    }
                }

                var modal = $uibModal.open({
                    animation: true,
                    backdrop: 'static',
                    keyboard: false,
                    size: 'medium',
                    templateUrl: 'app/components/messages/message.html',
                    controller: 'messageController as mc',
                    resolve: {
                        items: function () {
                            return {
                                MessageType: messageType,
                                MessageTittle: messageTitle,
                                Message: message
                            };
                        }
                    }
                });

                modalDraggable();
                return modal;
            };

            function callHttp(httpCallConfig) {
                var callConfig = {
                    method: "GET",
                    host: myUrl.base,
                    url: "/api/entity/action",
                    callbackSuccess: function (response) { },
                    callbackError: function (response, status, headers, config) { },
                    runDefaultErrorHandler: true,
                    noblock: false,
                    data: null
                };

                $.extend(callConfig, httpCallConfig);

                $http({ noBlock: callConfig.noblock, method: callConfig.method, headers: { 'Content-Type': "application/json", 'User': $cookies.get("user") }, url: callConfig.host + callConfig.url, data: callConfig.data })
                    .then(function (response) {
                        callConfig.callbackSuccess(response);
                    }), function errorCallback(response, status, headers, config) {

                        callConfig.callbackError(response, status, headers, config);

                        if (callConfig.runDefaultErrorHandler) {
                            defaultErrorHandler(response, status, headers, config);
                        }
                    };

            };

            function defaultErrorHandler(response, status, headers, config) {
                if (status == 409) {
                    if (response.code == 1) {
                        showMessages("Error de integridad de datos", "Un registro obtenido desde la base de datos está corrupto. No se puede operar con él.", false);
                    }
                    else if (response.code == 2) {
                        showMessages("Error de concurrencia", "Alguien estuvo trabajando con este registro. Refresque la página para obtener la última versión.", false);
                    }
                }
            }

        }]);

