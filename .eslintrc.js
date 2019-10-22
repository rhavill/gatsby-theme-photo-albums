module.exports = {
    'env': {
        'browser': true,
        'es6': true,
        'jest': true,
        'node': true,
    },
    'extends': [
        'eslint:recommended',
        'plugin:react/recommended'
      ],
    'globals': {
        'Atomics': 'readonly',
        'SharedArrayBuffer': 'readonly'
    },
    'parserOptions': {
        'ecmaFeatures': {
            'jsx': true
        },
        'ecmaVersion': 2018,
        'sourceType': 'module'
    },
    'plugins': [
        'react'
    ],
    'rules': {
        'indent': [
            'error',
            2
        ],
        'linebreak-style': [
            'error',
            'unix'
        ],
        'quotes': [
            'error',
            'single'
        ],
        'react/jsx-uses-react': 'error',
        'react/jsx-uses-vars': 'error',
        'semi': [
            'error',
            'never'
        ]
    },
    settings: {
        'react': {
            // Regex for Component Factory to use,default to 'createReactClass'
            'createClass': 'createReactClass',
            // Pragma to use, default to 'React' React version. 'detect' 
            // automatically picks the version you have installed.  You can 
            // also use `16.0`, `16.3`, etc, if you want to override the 
            // detected value. default to latest and warns if missing It will 
            // default to 'detect' in the future
            'pragma': 'React', 
            'version': 'detect',
            'flowVersion': '0.53' // Flow version
        },
        // The names of any function used to wrap propTypes, e.g. 
        // `forbidExtraProps`. If this isn't set, any propTypes wrapped in a 
        // function will be skipped.
        'propWrapperFunctions': [
            'forbidExtraProps',
            {'property': 'freeze', 'object': 'Object'},
            {'property': 'myFavoriteWrapper'}
        ],
        'linkComponents': [
            // Components used as alternatives to <a> for linking, eg. <Link to={ url } />
            'Hyperlink',
            {'name': 'Link', 'linkAttribute': 'to'}
        ]    
    }
}