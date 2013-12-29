'use strict';

var IsArray = require('../../lib/matchers/IsArray')
	, Description = require('../../lib/Description')
	, __ = require('../../lib/hamjest')
	, assertTrue = require('../asserts').assertTrue
	, assertFalse = require('../asserts').assertFalse
	;

describe('IsArray', function () {

	describe('array', function () {
		var array = IsArray.array;
		var sut;

		beforeEach(function () {
			sut = array();
		});

		it('should return a matcher', function () {
			assertTrue(__.isMatcher(sut));
		});

		it('should match any array', function () {
			assertTrue(sut.matches([]));
			assertTrue(sut.matches(['an element']));
		});

		it('should not match non-arrays', function () {
			assertFalse(sut.matches(7));
			assertFalse(sut.matches({}));
			assertFalse(sut.matches('a string'));
		});

		describe('description', function () {
			var description;

			beforeEach(function () {
				description = new Description();
			});

			it('should be nice', function () {
				var description = new Description();

				sut.describeTo(description);

				__.assertThat(description.get(), __.equalTo('an array'));
			});

			it('should contain non-array values', function () {
				var description = new Description();

				sut.describeMismatch({an: 'object'}, description);

				__.assertThat(description.get(), __.equalTo('was a object ({"an":"object"})'));
			});
		});
	});
});