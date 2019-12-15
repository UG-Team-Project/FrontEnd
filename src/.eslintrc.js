module.exports = {
    root: true,
    env: {
        node: true
    },
    extends: [
        'plugin:eslint-plugin/recommended',
        'plugin:vue-libs/recommended'
    ],
    plugins: [
        'eslint-plugin'
    ],
    rules: {
        'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
        'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',

        'eslint-plugin/report-message-format': ['error', '^[A-Z`\'{].*\\.$'],
        'eslint-plugin/prefer-placeholders': 'error',
        'eslint-plugin/consistent-output': 'error',
        'no-mixed-operators': 'error',

        'indent': ['error', 4],
        'semi': ['error', 'always'],
        'comma-spacing': [2, { 'before': false, 'after': true }]
    },
    overrides: [{
        files: ['lib/rules/*.js'],
        rules: {
            'consistent-docs-description': 'error',
            'no-invalid-meta': 'error',
            'eslint-plugin/require-meta-type': 'error',
            'require-meta-docs-url': ['error', {
                'pattern': `https://eslint.vuejs.org/rules/{{name}}.html`
            }],
            'vue/script-indent': ['error', 4, { 'baseIndent': 1 }],
            'indent': ['error', 4]
        }
    }],
    parserOptions: {
        parser: 'babel-eslint',
        ecmaVersion: '6'
    }
};
