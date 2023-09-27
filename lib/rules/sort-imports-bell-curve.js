module.exports = {
    meta: {
        type: "suggestion",
        docs: {
            description: "Sort imports in a bell curve pattern",
            category: "Stylistic Issues",
            recommended: false,
        },
        fixable: "code",
    },
    create: function(context) {
        return {
            'Program': function(node) {
                const sourceCode = context.getSourceCode();
                const imports = sourceCode.ast.body.filter(node => node.type === 'ImportDeclaration');

                if (!imports.length) return;

                // Sorting the imports based on their source value length
                const sortedImports = imports.slice().sort((a, b) => {
                    const aLength = context.getSourceCode().getText(a).length;
                    const bLength = context.getSourceCode().getText(b).length;
                    return bLength - aLength;
                });
                
                const bellCurveSorted = [];
                
                let top = [];
                let bottom = [];
                
                for (let i = 0; i < sortedImports.length; i++) {
                    if (i === 0) {
                        // Longest (middle) import
                        bottom.push(sortedImports[i]);
                    } else if (i % 2 === 0) {
                        // Even indexes (starting from 0) go to the top in reverse
                        top.unshift(sortedImports[i]);
                    } else {
                        // Odd indexes go to the bottom
                        bottom.push(sortedImports[i]);
                    }
                }
                
                // Concatenate top and bottom to get the final sorted imports
                bellCurveSorted.push(...top, ...bottom);
                
                // Check if there is any discrepancy between the current imports and the sorted imports
                let discrepancyFound = false;
                for (let i = 0; i < imports.length; i++) {
                    if (imports[i].source.value !== bellCurveSorted[i].source.value) {
                        discrepancyFound = true;
                        break;
                    }
                }

                if (discrepancyFound) {
                    context.report({
                        node: node,
                        message: 'Imports are not sorted in a bell curve pattern',
                        fix: (fixer) => {
                            const start = imports[0].range[0];
                            const end = imports[imports.length - 1].range[1];
                            const fixedCode = bellCurveSorted.map(importNode => sourceCode.getText(importNode)).join('\n');
                            return fixer.replaceTextRange([start, end], fixedCode);
                        }
                    });
                }
            }
        };
    }
};
