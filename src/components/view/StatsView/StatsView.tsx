import React, { FC } from 'react';
import { View } from 'react-native';
import { Icon } from 'react-native-elements';
import { FontFamily } from '@styles';
import { Text } from '@components/theme';
import { styles } from './styles';

interface Props {
	title: string;
	value: string;
	icon: { name: string; type: string };
}

const StatsView: FC<Props> = ({ title, value, icon }) => {
	return (
		<View>
			<Text style={{ fontFamily: FontFamily.QUICKSAND_BOLD }}>
				{title}
			</Text>
			<View style={{ flexDirection: 'row' }}>
				<Icon
					tvParallaxProperties={undefined}
					{...icon}
					color="white"
					style={styles.icon}
				/>
				<Text style={{ fontSize: 16 }}>{value}</Text>
			</View>
		</View>
	);
};

export { StatsView };
