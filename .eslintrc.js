module.exports = {
	extends: ['eslint-config-airbnb', 'prettier', 'prettier/react'],
	parser: 'babel-eslint',
	parserOptions: {
		ecmaVersion: 7,
		sourceType: 'module',
		ecmaFeatures: {
			classes: true,
			experimentalObjectRestSpread: true,
			impliedStrict: true,
			jsx: true,
			modules: true,
		},
	},
	plugins: [
		'filenames',
		'json',
		'prefer-object-spread',
		'@salesforce/slds-react',
	],
	env: {
		browser: true,
	},
	overrides: [
		{
			// Storybook and site examples
			files: [
				'**/__examples__/**/*.{js,jsx}',
				'**/__docs__/**/*.{js,jsx}',
				'**/site-stories.js',
			],
			rules: {
				// devDependencies are used
				'import/no-extraneous-dependencies': 'off',
				// console is used in examples
				'no-console': 'off',
				// TODO: This should be removed.
				'no-unused-vars': 'off',
			},
		},
		{
			// Utility scripts
			files: ['./*.js', 'preset/*.js', 'scripts/*.js', '**/site-stories.js'],
			rules: {
				// devDependencies are used
				'import/no-extraneous-dependencies': 'off',
				// Utility scripts use many types of loaders
				'import/no-webpack-loader-syntax': 'off',
				// console is used in scripts
				'no-console': 'off',
			},
		},
		{
			// Test files
			files: ['**/__tests__/**/*.{js,jsx}', 'tests/*.{js,jsx}'],
			env: {
				browser: true,
				jest: true,
				mocha: true,
			},
			globals: {
				chai: true,
				jest: true,
				sinon: true,
			},
			rules: {
				// devDependencies are used
				'import/no-extraneous-dependencies': 'off',
				// console is used in tests
				'no-console': 'off',
				// TODO: This should be removed.
				'no-unused-expressions': 'off',
				// TODO: This should be removed.
				'no-unused-vars': 'off',
				// TODO: This should be removed.
				'prefer-arrow-callback': 'off',
				// TODO: This should be removed.
				'react/display-name': 'off',
			},
		},
		{
			// ESLint Plugin
			files: ['eslint-plugin/**/*.js'],
			rules: {
				'import/no-extraneous-dependencies': 'off',
				'@salesforce/slds-react/no-double-dash-modifier': 'off',
			},
		},
	],
	// Please review Prettier settings for style linting
	rules: {
		'linebreak-style': [
			2,
			process.env.OS && process.env.OS.match(/Windows/) ? 'windows' : 'unix',
		],
		// Creates consistent filename case: "kabob case"
		'filenames/match-regex': [2, '^[a-z\\-\\.]+$', true],
		// All imported files are JSX or JS
		'import/extensions': 'off',
		// `~` is used by examples for "root" npm package in documentation site
		'import/no-unresolved': [2, { ignore: ['^[~]'] }],
		'no-multi-spaces': [
			2,
			{
				// allows "column spacing." Following key names are Abstract Syntax Tree types
				exceptions: {
					VariableDeclarator: true,
					Property: true,
					ImportDeclaration: true,
					AssignmentExpression: true,
					JSXAttribute: true,
				},
			},
		],
		// javascript:void(0) is present in SLDS markup
		'no-script-url': 'off',
		// _ is not really private.
		'no-underscore-dangle': ['error', { allowAfterThis: true }],
		//
		'prefer-object-spread/prefer-object-spread': [2, 'always'],

		'max-lines': ['error', 500],

		// Can't be used because it doesn't currently recognize props used in functions
		'react/no-unused-prop-types': 'off',

		//
		// THE FOLLOWING RULES NEED REVIEW IN THE FUTURE (and possibly removed)
		//
		// When someone is ready to tackle these issues, feel free to tighten
		// the following rules. Do not push a change that causes lint errors/warnings
		// to start appearing. All lint warnings errors should be meaningful, and
		// therefore, there should never intentionally be any.

		// static class properties/method is still too low of a babel stage
		'class-methods-use-this': 'warn',
		// We are open to changing this to always use a trailing comma,
		// in order to make re-sorting easier
		'comma-dangle': [2, 'only-multiline'],
		// TODO: Should be removed
		'func-names': 'off',
		// May consider removing
		'function-paren-newline': 'off',
		// currently used in older files, this should be removed
		'no-param-reassign': [
			2,
			{
				props: false,
			},
		],
		// currently used in older files
		'no-plusplus': 'off',
		// Should be removed in the future. `event` is the main global used now.
		'no-restricted-globals': 'off',
		// Would prefer all mixed operators as errors, but this conflicts
		// with Prettier
		'no-mixed-operators': [
			'error',
			{
				groups: [
					// ["+", "-", "*", "/", "%", "**"], // imcompatible with prettier
					['&', '|', '^', '~', '<<', '>>', '>>>'],
					['==', '!=', '===', '!==', '>', '>=', '<', '<='],
					['&&', '||'],
					['in', 'instanceof'],
				],
				allowSamePrecedence: true,
			},
		],
		// May consider removing
		'object-curly-newline': 'off',
		// May consider removing
		'prefer-destructuring': 'off',

		// May consider removing. Would be unable to test for undefined props.
		'react/default-props-match-prop-types': 'off',
		// TODO: Should be removed
		'react/no-unused-state': 'off',
		// TODO: Should be removed
		'react/prop-types': 'off',
		// Used to prevent usage of any, array, and object but may be too strict currently
		'react/forbid-prop-types': 'off',
		// TODO: Should be removed
		'react/no-multi-comp': 'off',
		// Don't throw errors when explicit defaults aren't set
		'react/require-default-props': 'off',
		// Components that are top-level should be classes, so the DOM ref exists
		'react/prefer-stateless-function': 'off',
		// Prevent multiple component definition per file
		'react/no-multi-comp': 'off',

		// javascript:void(0) is present in SLDS markup
		'jsx-a11y/anchor-is-valid': 'off',
		'jsx-a11y/aria-activedescendant-has-tabindex': 2,
		'jsx-a11y/interactive-supports-focus': 2,
		'jsx-a11y/no-autofocus': 2,
		'jsx-a11y/no-interactive-element-to-noninteractive-role': 2,
		'jsx-a11y/no-noninteractive-element-interactions': 2,
		'jsx-a11y/no-noninteractive-tabindex': 2,
		'jsx-a11y/no-redundant-roles': 2,
		'jsx-a11y/role-has-required-aria-props': 2,
		// Many labels have htmlFor, but are still errors
		'jsx-a11y/label-has-for': 'off',
		// TODO: Should be removed. All mouse interactions should be able
		// to be done with the keyboard.
		'jsx-a11y/click-events-have-key-events': 'off',

		// Enforce single underscore modifiers for BEM class names
		'@salesforce/slds-react/no-double-dash-modifier': 'error',
	},
};
