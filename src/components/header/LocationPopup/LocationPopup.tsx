import React, { FC, memo } from 'react';
import { ListRenderItem, TouchableOpacity, View } from 'react-native';

import { Icon, Text } from '@rneui/themed';
import _ from 'lodash';
import { FlatList } from 'react-native-gesture-handler';

import { CityItem } from '@app/components/listitem';
import { ListEmpty, ListSeparator } from '@app/components/loader';
import {
	useBookmarksQuery,
	useCurrentCityMutation,
	useCurrentCityQuery,
	useRemoveBookmarkMutation
} from '@app/hooks';
import { City } from '@app/models';

import { useStyles } from './styles';

interface Props {
	onSearch?: () => void;
}

const LocationPopup: FC<Props> = ({ onSearch }) => {
	const styles = useStyles();
	const { data: current } = useCurrentCityQuery();
	const { data: bookmarks } = useBookmarksQuery();
	const { mutate: updateCurrent } = useCurrentCityMutation();
	const { mutate: removeCity } = useRemoveBookmarkMutation();

	const renderCity: ListRenderItem<City> = ({ item }) => (
		<CityItem city={item} onSelect={updateCurrent} onDelete={removeCity} />
	);

	const cities = _.filter(bookmarks, city => {
		if (current !== undefined) {
			return city._id !== current._id;
		}
		return true;
	});

	return (
		<View style={styles.container}>
			<FlatList
				data={cities}
				keyExtractor={(city: City) => city._id}
				renderItem={renderCity}
				ItemSeparatorComponent={ListSeparator}
				contentContainerStyle={styles.contentContainer}
				ListFooterComponent={ListSeparator}
				ListEmptyComponent={<ListEmpty message='No cities' />}
			/>
			<TouchableOpacity onPress={onSearch}>
				<View style={styles.addContainer}>
					<Icon type='entypo' name='plus' />
					<Text style={styles.addLocationText}>Add new location</Text>
				</View>
			</TouchableOpacity>
		</View>
	);
};

export default memo(LocationPopup);
