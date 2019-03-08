/**
 * @fileoverview Update docs index script
 * @author kazuya kawaguchi (a.k.a. kazupon)
 * Forked by https://github.com/mysticatea/eslint-plugin-eslint-comments/tree/master/scripts/update-docs-index.js
 */
'use strict'

const { writeFileSync } = require('fs')
const { resolve } = require('path')
const { withCategories } = require('./lib/rules')

function toTableRow (rule) {
  const mark = `${rule.recommended ? '🌟' : ''}${rule.fixable ? '✒️' : ''}`
  const link = `[vue-i18n/<wbr>${rule.name}](./${rule.name}.html)`
  const description = rule.description || '(no description)'
  return `| ${link} | ${description} | ${mark} |`
}

function toCategorySection ({ category, rules }) {
  return `## ${category}

| Rule ID | Description |    |
|:--------|:------------|:---|
${rules.map(toTableRow).join('\n')}
`
}

writeFileSync(
  resolve(__dirname, '../docs/rules/README.md'), `# Available Rules

- :star: mark: the rule which is enabled by \`vue-i18n/recommended\` preset.
- :black_nib: mark: the rule which is fixable by \`eslint --fix\` command.

${withCategories.map(toCategorySection).join('\n')}
`
)
