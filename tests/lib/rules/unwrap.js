'use strict'

// ------------------------------------------------------------------------------
// Requirements
// ------------------------------------------------------------------------------

const rule = require('../../../src/rules/unwrap')
const RuleTester = require('eslint').RuleTester

// ------------------------------------------------------------------------------
// Tests
// ------------------------------------------------------------------------------

const ruleTester = new RuleTester()
const toErrorObject = require('../testUtil/optionsUtil').fromMessage('Missing unwrapping at end of chain')
ruleTester.run('unwrap', rule, {
    valid: [
        'var x = _(a).map(f).reduce(g)',
        'var x = _(a).map(f).filter(g).value()',
        'var x = _.chain(a).map(f).value()',
        'var stillWrapped = _(a).forEach(f).commit();'
    ],
    invalid: [
        'var x = _(a).map(f);',
        'var x = _.chain(a).map(f)',
        'var x = _.chain(a).map(f).reduce(g)'
    ].map(toErrorObject)
})
