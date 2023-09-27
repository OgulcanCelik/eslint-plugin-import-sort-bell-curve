module.exports = {
    rules: {
        'sort-imports-bell-curve': require('./rules/sort-imports-bell-curve')
    },
    configs: {
        recommended: {
            rules: {
                'import-sort-bell-curve/sort-imports-bell-curve': 2
            }
        }
    }
};
