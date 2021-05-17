'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var React = require('react');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);

function createCommonjsModule(fn, module) {
	return module = { exports: {} }, fn(module, module.exports), module.exports;
}

var classnames = createCommonjsModule(function (module) {
/*!
  Copyright (c) 2018 Jed Watson.
  Licensed under the MIT License (MIT), see
  http://jedwatson.github.io/classnames
*/
/* global define */

(function () {

	var hasOwn = {}.hasOwnProperty;

	function classNames() {
		var classes = [];

		for (var i = 0; i < arguments.length; i++) {
			var arg = arguments[i];
			if (!arg) continue;

			var argType = typeof arg;

			if (argType === 'string' || argType === 'number') {
				classes.push(arg);
			} else if (Array.isArray(arg)) {
				if (arg.length) {
					var inner = classNames.apply(null, arg);
					if (inner) {
						classes.push(inner);
					}
				}
			} else if (argType === 'object') {
				if (arg.toString === Object.prototype.toString) {
					for (var key in arg) {
						if (hasOwn.call(arg, key) && arg[key]) {
							classes.push(key);
						}
					}
				} else {
					classes.push(arg.toString());
				}
			}
		}

		return classes.join(' ');
	}

	if (module.exports) {
		classNames.default = classNames;
		module.exports = classNames;
	} else {
		window.classNames = classNames;
	}
}());
});

var Icon = function (_a) {
    var name = _a.name, _b = _a.size, size = _b === void 0 ? "medium" : _b, className = _a.className;
    var iconClass = classnames("material-icons", "customized-icon-" + size, className);
    return React__default['default'].createElement("i", { className: iconClass }, name);
};

// react
var InputText = function (_a) {
    var className = _a.className, classNameInput = _a.classNameInput, _b = _a.variant, variant = _b === void 0 ? "outline" : _b, // standard || outline
    multiple = _a.multiple, value = _a.value, error = _a.error, name = _a.name, label = _a.label, key = _a.key, placeholder = _a.placeholder, type = _a.type, _c = _a.rows, rows = _c === void 0 ? 5 : _c, cols = _a.cols, disabled = _a.disabled, onChange = _a.onChange, onBlur = _a.onBlur;
    var container = classnames("d-input-text__container", className);
    var labelClass = classnames("text-x-small", "d-input-text__label");
    var inputClass = classnames("text-x-small", "d-input-text__input", "d-input-text__input-" + variant, {
        "d-input-text__input-disabled": disabled,
        "d-input-text__error": !!error,
    }, classNameInput);
    var textAreaClass = classnames("d-input-area__input", "d-input-area__input-" + variant, {
        "d-input-area__input-disabled": disabled,
        "d-input-text__error": !!error,
    });
    var errorTextClass = classnames("text-x-small", "text-error", "ml-1");
    var renderInput = function () {
        if (multiple) {
            return (React__default['default'].createElement("textarea", { value: value, onChange: onChange, rows: rows, name: name, className: textAreaClass, cols: cols, disabled: disabled }));
        }
        return (React__default['default'].createElement("input", { value: value, onChange: onChange, className: inputClass, name: name, required: true, key: key, placeholder: placeholder, onBlur: onBlur, type: type, disabled: disabled }));
    };
    return (React__default['default'].createElement("div", { className: container },
        label && (React__default['default'].createElement("label", { htmlFor: name, className: labelClass },
            React__default['default'].createElement("span", null, label))),
        renderInput(),
        error && (React__default['default'].createElement("div", { className: "flex-center-y mt-1" },
            React__default['default'].createElement(Icon, { name: "error_outline", className: "text-error", size: "small" }),
            React__default['default'].createElement("text", { className: errorTextClass }, error)))));
};

exports.InputText = InputText;
//# sourceMappingURL=index.cjs.js.map
