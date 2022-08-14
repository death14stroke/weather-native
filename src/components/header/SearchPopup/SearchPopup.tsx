import React, { FC, memo, useEffect, useState } from 'react';
import { ListRenderItem, TouchableOpacity, View } from 'react-native';

import { Icon, SearchBar } from '@rneui/themed';
import { FlatList } from 'react-native-gesture-handler';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useDebounce } from 'use-debounce';

import { CityItem } from '@app/components/listitem';
import { ListEmpty, ListSeparator } from '@app/components/loader';
import { useAddBookmarkMutation, useSearchCitiesQuery } from '@app/hooks';
import { City } from '@app/models';
import { Colors } from '@app/styles';
import { fs } from '@app/utils';

import { useStyles } from './styles';

interface Props {
	onClose: () => void;
}

const SearchPopup: FC<Props> = ({ onClose }) => {
	const styles = useStyles(useSafeAreaInsets());
	const [rawQuery, setRawQuery] = useState('');
	const query = useDebounce(rawQuery, 1000)[0].trim().toLowerCase();

	const { data, isLoading, refetch } = useSearchCitiesQuery(query);
	const { mutate: addCity } = useAddBookmarkMutation();

	const onSelectCity = (city: City) => {
		onClose();
		addCity(city);
	};

	useEffect(() => {
		if (query.length >= 3) {
			refetch();
		} else {
			console.info('Query must be atleast 3 characters!');
		}
	}, [query, refetch]);

	const renderCity: ListRenderItem<City> = ({ item }) => (
		<CityItem city={item} onSelect={onSelectCity} />
	);

	return (
		<View style={styles.container}>
			<View style={styles.appBar}>
				<SearchBar
					placeholder='Search'
					value={rawQuery}
					onChangeText={setRawQuery}
					showLoading={isLoading && !!query}
				/>
				<TouchableOpacity onPress={onClose}>
					<Icon type='ionicon' name='close' color={Colors.black} size={fs(20)} />
				</TouchableOpacity>
			</View>
			<FlatList
				data={data}
				keyExtractor={(city: City) => city._id}
				renderItem={renderCity}
				contentContainerStyle={styles.contentContainer}
				ItemSeparatorComponent={ListSeparator}
				ListFooterComponent={ListSeparator}
				ListEmptyComponent={<ListEmpty message='No cities found' />}
			/>
		</View>
	);
};

export default memo(SearchPopup);
