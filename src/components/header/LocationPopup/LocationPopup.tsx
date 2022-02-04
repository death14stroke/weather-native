import React, { FC, useContext } from 'react';
import { View, ListRenderItem } from 'react-native';
import { Icon } from 'react-native-elements';
import { TouchableOpacity, FlatList } from 'react-native-gesture-handler';
import { PreferenceContext } from '@context';
import { City } from '@models';
import { Text } from '@components/theme';
import { ListEmptyText } from '@components/list';
import { styles } from './styles';

interface Props {
	onSearch?: () => void;
}

const LocationPopup: FC<Props> = ({ onSearch }) => {
	const {
		state: { bookmarks, current },
		actions: { updateCurrent }
	} = useContext(PreferenceContext);

	const renderCity: ListRenderItem<City> = ({ item }) => {
		return (
			<TouchableOpacity
				onPress={() => updateCurrent(item)}
				style={styles.itemTouch}>
				<Text style={styles.locationItem}>{item.name}</Text>
			</TouchableOpacity>
		);
	};

	return (
		<View style={styles.container}>
			<FlatList
				data={bookmarks.filter(city => {
					if (current !== undefined) {
						return city._id !== current._id;
					} else {
						return true;
					}
				})}
				keyExtractor={(city: City) => city._id}
				renderItem={renderCity}
				contentContainerStyle={styles.contentContainer}
				ListEmptyComponent={<ListEmptyText>No cities</ListEmptyText>}
			/>
			<TouchableOpacity onPress={onSearch}>
				<View style={styles.addContainer}>
					<Icon
						type="entypo"
						name="plus"
						tvParallaxProperties={undefined}
					/>
					<Text style={styles.addLocationText}>Add new location</Text>
				</View>
			</TouchableOpacity>
		</View>
	);
};

export { LocationPopup };
