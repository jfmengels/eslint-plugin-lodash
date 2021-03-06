'use strict'

// ------------------------------------------------------------------------------
// Requirements
// ------------------------------------------------------------------------------

const rule = require('../../../src/rules/no-double-unwrap')
const RuleTester = require('eslint').RuleTester

// ------------------------------------------------------------------------------
// Tests
// ------------------------------------------------------------------------------

const ruleTester = new RuleTester()

ruleTester.run('no-double-unwrap', rule, {
    valid: [
        'var x = _(a).map(f).reduce(g)',
        'var x = _(a).map(f).value()',
        'var x = _.chain(a).reduce(f).value()',
        'var x = something.value()',
        '_(a).filter(f).forEach(g);'
    ],
    invalid: [{
        code: 'var x = _(a).some(f).value();',
        errors: [{message: 'Do not use .value() after chain-ending method some'}],
        output: 'var x = _(a).some(f);'
    }]
})
