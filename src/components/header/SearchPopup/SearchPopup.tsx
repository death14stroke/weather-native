import React, { FC } from 'react';
import {
	View,
	ListRenderItem,
	Keyboard,
	ActivityIndicator
} from 'react-native';
import { Icon, Input } from 'react-native-elements';
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from '@hooks/theme';
import { useDebouncedSearch } from '@hooks/search';
import { Text } from '@components/theme';
import { ListEmptyText } from '@components/list';
import { City } from '@models';
import { Colors } from '@styles';
import { weatherApi } from '@api';
import { useStyles } from './styles';

interface Props {
	onClose: () => void;
	onSelect: (item: City) => void;
}

const SearchPopup: FC<Props> = ({ onClose, onSelect }) => {
	const styles = useStyles(useTheme(), useSafeAreaInsets());
	const { _onChangeQuery, query, results, loading } = useDebouncedSearch(
		(query, tokenSource) => {
			return weatherApi.get<City[]>('/search', {
				params: { query: query.toLowerCase() },
				cancelToken: tokenSource.token
			});
		}
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
					value={query}
					onChangeText={_onChangeQuery}
					inputStyle={styles.input}
					inputContainerStyle={styles.inputContainer}
					containerStyle={{ height: 55 }}
					leftIcon={{
						type: 'feather',
						name: 'search',
						color: 'black'
					}}
					leftIconContainerStyle={styles.leftIcon}
					rightIcon={
						<View style={{ flexDirection: 'row' }}>
							{loading && (
								<ActivityIndicator
									color={Colors.fuchsiaPink}
									style={styles.activityIndicator}
								/>
							)}
							<TouchableOpacity onPress={closePopup}>
								<Icon type="ionicon" name="close" />
							</TouchableOpacity>
						</View>
					}
				/>
			</View>
			<FlatList
				data={results}
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
