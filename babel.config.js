module.exports = {
	presets: ['module:metro-react-native-babel-preset'],
	plugins: [
		['transform-remove-console', { exclude: ['error', 'warn'] }],
		[
			'module-resolver',
			{
				root: ['.'],
				extensions: [
					'.ios.ts',
					'.android.ts',
					'.ts',
					'.ios.tsx',
					'.android.tsx',
					'.tsx',
					'.jsx',
					'.js',
					'.json'
				],
				alias: {
					'@app/screens': './src/screens',
					'@app/components': './src/components',
					'@app/hooks': './src/hooks',
					'@app/models': './src/models',
					'@app/styles': './src/stylings',
					'@app/context': './src/context',
					'@app/assets': './assets',
					'@app/navigation': './src/navigation',
					'@app/api': './src/api',
					'@app/data': './src/data',
					'@app/utils': './src/utils'
				}
			}
		],
		'react-native-reanimated/plugin'
	]
};
