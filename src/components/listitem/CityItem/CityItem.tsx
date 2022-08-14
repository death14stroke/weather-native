import React, { FC, memo } from 'react';
import { Keyboard, TouchableOpacity, View } from 'react-native';

import { Icon, Text } from '@rneui/themed';

import { City } from '@app/models';

import { useStyles } from './styles';

interface Props {
	city: City;
	onSelect: (item: City) => void;
	onDelete?: (item: City) => void;
}

const CityItem: FC<Props> = ({ onSelect, city, onDelete }) => {
	const styles = useStyles();

	const onSelectCity = () => {
		Keyboard.dismiss();
		onSelect(city);
	};

	const onDeleteCity = () => {
		onDelete?.(city);
	};

	return (
		<View style={styles.root}>
			<TouchableOpacity onPress={onSelectCity}>
				<Text style={styles.locationItem}>{city.name}</Text>
			</TouchableOpacity>
			{onDelete && (
				<TouchableOpacity onPress={onDeleteCity}>
					<Icon type='ionicon' name='trash-outline' {...styles.delete} />
				</TouchableOpacity>
			)}
		</View>
	);
};

export default memo(CityItem, (prevProps, nextProps) => prevProps.city._id === nextProps.city._id);
