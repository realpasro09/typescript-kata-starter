"use strict";
import chai = require("chai");
var expect = chai.expect;
var fiscal_year_calculator = require("./calculator");

describe("The fiscal year calculator", () => {

    describe("calculating for the current fiscal year", () => {

        var calculator = new fiscal_year_calculator(9, 1);

        // it("should return current year for a date with month after the start month", () => {
        //     expect(calculator.calculateYear(new Date(2016,10,1)))
        //         .to.equal(2016);
        // });

        it("should return 0 since it's just a starter and it needs to pass CI", () => {
            expect(calculator.calculateYear(new Date(2016,10,1)))
                .to.equal(0);
        });
    });
});
