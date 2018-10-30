"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.isAnyPartOfElementInViewport = isAnyPartOfElementInViewport;
exports.isElementInViewport = isElementInViewport;
function isAnyPartOfElementInViewport(el) {
	if (!el) return false;

	var rect = el.getBoundingClientRect();
	// DOMRect { x: 8, y: 8, width: 100, height: 100, top: 8, right: 108, bottom: 108, left: 8 }
	var windowHeight = window.innerHeight || document.documentElement.clientHeight;
	var windowWidth = window.innerWidth || document.documentElement.clientWidth;

	var vertInView = rect.top <= windowHeight && rect.top + rect.height >= 0;
	var horInView = rect.left <= windowWidth && rect.left + rect.width >= 0;

	return vertInView && horInView;
}

function isElementInViewport(el) {
	if (!el) return false;

	var rect = el.getBoundingClientRect();
	return rect.top >= 0 && rect.left >= 0 && rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) && rect.right <= (window.innerWidth || document.documentElement.clientWidth);
}