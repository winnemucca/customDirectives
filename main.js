angular.module('myApp', [])
	.controller('FunCtrl',FunCtrl)
	.directive('entering', function() {
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
	})

	.directive('zoomit', function() {
		return {
			link: function(scope, elem, attr) {
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
	})

	.directive('fadeit', function() {
		return {
			link: function(scope, elem, attr) {
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
	})

	

	.directive('leaving', function() {
		return function(scope, element, attrs) {
			element.bind('mouseleave', function() {
				console.log(element);
				console.log('mouse has left the div');
				element.removeClass(attrs.leaving);
				console.log('leaving', attrs.leaving)
				scope.$apply(attrs.leaving)
			})
		}
	})

	.directive('welcome', function() {
		return {
			restrict: 'E',
			scope: {},
			controller: function($scope) {
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
			},
			link: function(scope, element) {
				element.bind('mouseenter', function() {

					console.log(scope.words);
				})
			}
		}
	})


	.directive("hello", function() {
	  return {
	    require: "welcome",
	    link: function (scope, element, attrs, welcomeCtrl) {
	      welcomeCtrl.sayHowdy();
	    }
	  };
 	})

 	.directive("hi", function() {
	  	return {
		    require: "welcome",
		    link: function (scope, element, attrs, welcomeCtrl) {
		      welcomeCtrl.sayHi();
		    }
		}
	 })

 	.directive('trans', function() {
 		return {
 			restrict: 'E',
 			scope: {},
 			transclude: true,
 			template: "<div>This is the welcome component</div><ng-transclude></ng-transclude>"
 		}
 	})

 	.directive("clock", function() {
 		return {
 			restrict: "E",
 			scope: {
 				timezone: "@"
 			},
 			template: "<div>12:00pm {{timezone}} </div>"
 		}
 	})

 	.directive("panel", function() {
 		return {
 			restrict: "E",
 			transclude: true,
 			scope: {
 				title: "@"
 			},
 			template: "<div class='styled'>"+ "<div class='alert-box'>{{title}}</div>"+"<div ng-transclude></div>" + "</div"
 		}
 	})

 	.directive('myBox', function() {
 		return {
 			transclude: true,
 			restrict: 'E',
 			scope: {title: '@', bwidth: '@bwidth'},
 			template: "<div><span class='titleBar'>{{title}}"+ "</span> <div ng-transclude></div></div>",
 			link:function(scope, elem, attr, controller, transclude) {
 				console.log('scope', scope.$parent)
 				console.log('controller', controller);
 				elem.append('<span class="footer">'+ scope.$parent.title + '</span>');
 				elem.css('border', '2px ridge black');
 				elem.css('display', 'block');
 				elem.css('width', scope.bwidth);
 			}
 		}
 	})


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