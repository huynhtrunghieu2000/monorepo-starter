"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var vitest_1 = require("vitest");
var react_1 = require("@testing-library/react");
var matchers_1 = require("@testing-library/jest-dom/matchers");
// extends Vitest's expect method with methods from react-testing-library
vitest_1.expect.extend(matchers_1.default);
// runs a cleanup after each test case (e.g. clearing jsdom)
(0, vitest_1.afterEach)(function () {
    (0, react_1.cleanup)();
});
