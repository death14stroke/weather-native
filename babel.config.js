module.exports = {
	presets: ['module:metro-react-native-babel-preset'],
	plugins: [
		'react-native-reanimated/plugin',
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
					'@screens': './src/screens',
					'@components': './src/components',
					'@hooks': './src/hooks',
					'@models': './src/models',
					'@styles': './src/stylings',
					'@context': './src/context',
					'@assets': './assets',
					'@navigation': './src/navigation',
					'@api': './src/api'
				}
			}
		]
	]
};
