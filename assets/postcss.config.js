const { default: processTailwindFeatures } = require('tailwindcss/lib/processTailwindFeatures');

module.exports = {
    plugins: [
        require('tailwindcss')('./tailwind.config.js'),
        require('autoprefixer'),
    ],
};