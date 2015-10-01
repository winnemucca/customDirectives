angular.module('myApp', [])
	.controller('FunCtrl',FunCtrl)

	.directive('entering', entering)

	.directive('zoomit', zoomit)

	.directive('fadeit', fadeit)

	.directive('leaving', leaving)

	.directive('welcome', welcome)

	.directive("hello", hello)

 	.directive("hi", hi)

 	.directive('trans', trans)

 	.directive("clock", clock)

 	.directive("panel", panel)

 	.directive('myBox', myBox)


 	.directive('myPhotos', myPhotos)

 	.directive('myPhoto', myPhoto)

 	function myPhotos() {
 		var directive = {
 			restrict: 'E',
 			transclude: true,
 			scope: {},
 			controller: photosController,
 			templateUrl: 'my_photos.html'
 		}
 		return directive;

 			function photosController($scope) {
			var photos = $scope.photos = [];
			$scope.select = function(photo) {
				angular.forEach(photos, function() {
					photo.selected = false;
				})

				photo.selected = true;
			}
			this.addPhoto = function(photo) {
				photos.push(photo);
			}
 		}
 	}

 	function myPhoto() {

 		var directive = {
 			require: '^myPhotos',
 			restrict: 'E',
 			transclude: true,
 			scope: {title:'@'},
 			link:link,
 			template: '<div ng-show="selected" ng-transclude></div>'

 		}
 		return directive;

 		function link(scope, elem,attrs, photosController) {
 				photosController.addPhoto(scope);
 			}
 	}

 	function hi() {

 		var directive = {
 			require: "welcome",
		    link: link
 		}
	  	return directive;

	  	function link(scope, element, attrs, welcomeCtrl) {
			welcomeCtrl.sayHi();
		}
	 }

 	function hello() {
 		var directive = {
 			require: "welcome",
	    	link: link
 		}
	  	return directive;

	  	function link(scope, element, attrs, welcomeCtrl) {
	      	welcomeCtrl.sayHowdy();
	    }

 	}

 	function entering() {
		return function(scope, element, attrs) {
			element.bind('mouseenter', function() {
				console.log(element);
				console.log('mouse has the div',attrs);
				element.addClass(attrs.entering);
				// bad
				// scope.fun.start();
				scope.$apply(attrs.entering);
			})
		}
	}

	function clock() {
 		return {
 			restrict: "E",
 			scope: {
 				timezone: "@"
 			},
 			template: "<div>12:00pm {{timezone}} </div>"
 		}
 	}

	function zoomit() {

		var directive = {
			link: link
		}
		return directive;

		function link(scope, elem, attr) {
				var dragging = false;
				var lastX = 0;
				elem.on('mousedown', function(event) {
					console.log('event', event.pageX);
					lastX = event.PageX;
					event.preventDefault();
					dragging= true;

				});
				elem.on('mouseup', function() {
				console.log('event', event.pageX);

					dragging =false;
				});
				elem.on('mouseleave', function() {
					dragging= false;
				});
				elem.on('mousemove', function(event) {
					console.log(dragging)
					if(dragging) {
					console.log('move')
						var adjustment = null;
						if(event.pageX > lastX && elem.width() <300) {
							console.log('ok')
							adjustment = 1.1;
						} else if (elem.width() > 100){
							adjustment = 0.9;
						}

						if(adjustment) {
							console.log('in')
							elem.width(elem.width() *adjustment)
							elem.height(elem.height() *adjustment)

						}

						lastX = event.pageX;
					}
				})
			}
	}

	function fadeit() {

		var directive = {
			link: link
		}
		return directive;

		function link(scope, elem, attr) {
			var dragging = false;
			var lastY = 0;
			
			elem.on('mousedown', function(event){
			console.log('eventY', event.pageY);

				lastY = event.pageY;
				event.preventDefault();
				dragging = true;
			});
			elem.on('mouseup', function() {
				dragging =false;
			});
			elem.on('mouseleave', function() {
				dragging= false;
			});
			elem.on('mousemove', function() {
				if(dragging) {
					var adjustment = null;
					var currentOpacity = parseFloat(elem.css('opacity'));
					if(event.pageY > lastY && currentOpacity <1) {
						adjustment = 1.1;
					} else if (currentOpacity > 0.5){
						adjustment = 0.9;
					}

					if(adjustment) {
						elem.css('opacity', currentOpacity*adjustment);
					}

					lastY = event.pageY;
				}
			})
	}
	}

 	function trans() {
 		var directive = {
 			restrict: 'E',
 			scope: {},
 			transclude: true,
 			template: "<div>This is the welcome component</div><ng-transclude></ng-transclude>"
 		}

 		return directive;
 	}

 	function leaving() {
		return function(scope, element, attrs) {
			element.bind('mouseleave', function() {
				console.log(element);
				console.log('mouse has left the div');
				element.removeClass(attrs.leaving);
				console.log('leaving', attrs.leaving)
				scope.$apply(attrs.leaving)
			})
		}
	}

 	function panel() {

 		var directive = {
 			restrict: "E",
 			transclude: true,
 			scope: {
 				title: "@"
 			},
 			template: "<div class='styled'>"+ "<div class='alert-box'>{{title}}</div>"+"<div ng-transclude></div>" + "</div"
 		}
 		return directive;
 	}


 	function welcome() {
 		var directive = {
 			restrict: 'E',
			scope: {},
			controller: welcomeController,
			link: link
			// controllerAs: 'vm',
   //      	bindToController: true // because the scope is isolated
 		}
		return directive;

		function link(scope, element) {
			element.bind('mouseenter', function() {
			console.log(scope.words);
			})
		}

		function welcomeController($scope) {
				$scope.words = [];
				vm = this;

				vm.sayHello = function() {
					$scope.words.push('hello');
				}
				vm.sayHowdy = function() {
					$scope.words.push('howdy');
				}
				vm.sayHi = function() {
					$scope.words.push('hi');
				}
			}
	}

 	function myBox() {

 		var directive = {
 			transclude: true,
 			restrict: 'E',
 			scope: {title: '@', bwidth: '@bwidth'},
 			template: "<div><span class='titleBar'>{{title}}"+ "</span> <div ng-transclude></div></div>",
 			link:link
 		}
 		return directive;
 		
 		function link(scope, elem, attr, controller, transclude) {
 				elem.append('<span class="footer title">'  +scope.$parent.fun.title + '</span>');
 				elem.css('border', '2px ridge black');
 				elem.css('display', 'block');
 				elem.css('width', scope.bwidth);
 			}
 	}


	function FunCtrl() {
		var vm = this;

		vm.start = function() {
			console.log('fun times have started');
		}

		vm.end = function() {
			console.log('fun times have ended');
		}

		vm.title = "myApplication"
	}