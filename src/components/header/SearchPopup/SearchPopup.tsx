import React, { FC, useState } from 'react';
import {
	View,
	ListRenderItem,
	Keyboard,
	ActivityIndicator
} from 'react-native';
import { Icon, Input } from 'react-native-elements';
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useQuery } from 'react-query';
import { useDebounce } from 'use-debounce/lib';
import { useTheme } from '@hooks/theme';
import { Text } from '@components/theme';
import { ListEmptyText } from '@components/list';
import { City } from '@models';
import { Colors } from '@styles';
import { apiSearchCities } from '@api';
import { useStyles } from './styles';

interface Props {
	onClose: () => void;
	onSelect: (item: City) => void;
}

const SearchPopup: FC<Props> = ({ onClose, onSelect }) => {
	const styles = useStyles(useTheme(), useSafeAreaInsets());
	const [rawQuery, setRawQuery] = useState('');
	const [query] = useDebounce(rawQuery, 1000);

	const { data, isLoading } = useQuery<City[]>(
		['search', query],
		({ signal }) => apiSearchCities(query, signal),
		{ staleTime: 30 * 60 * 1000 }
	);

	const closePopup = () => {
		Keyboard.dismiss();
		onClose();
	};

	const renderCity: ListRenderItem<City> = ({ item }) => {
		return (
			<TouchableOpacity
				onPress={() => {
					Keyboard.dismiss();
					onSelect(item);
				}}
				style={{ marginVertical: 8 }}>
				<Text style={styles.locationItem}>{item.name}</Text>
			</TouchableOpacity>
		);
	};

	return (
		<View style={styles.container}>
			<View style={styles.appBar}>
				<Input
					placeholder="Search"
					value={rawQuery}
					onChangeText={setRawQuery}
					inputStyle={styles.input}
					inputContainerStyle={styles.inputContainer}
					containerStyle={{ height: 55 }}
					leftIcon={{
						type: 'feather',
						name: 'search',
						color: 'black'
					}}
					autoCompleteType="off"
					leftIconContainerStyle={styles.leftIcon}
					rightIcon={
						<View style={{ flexDirection: 'row' }}>
							{isLoading && (
								<ActivityIndicator
									color={Colors.fuchsiaPink}
									style={styles.activityIndicator}
								/>
							)}
							<TouchableOpacity onPress={closePopup}>
								<Icon
									type="ionicon"
									name="close"
									tvParallaxProperties={undefined}
								/>
							</TouchableOpacity>
						</View>
					}
				/>
			</View>
			<FlatList
				data={data}
				keyExtractor={(city: City) => city._id}
				renderItem={renderCity}
				contentContainerStyle={styles.contentContainer}
				ListEmptyComponent={
					<ListEmptyText>No cities found</ListEmptyText>
				}
			/>
		</View>
	);
};

export { SearchPopup };
