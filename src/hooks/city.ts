import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import _ from 'lodash';

import {
	apiAddBookmark,
	apiGetBookmarks,
	apiGetCurrentCity,
	apiRemoveBookmark,
	apiSearchCities,
	apiUpdateCurrentCity
} from '@app/api';
import { City } from '@app/models';

export const useCurrentCityQuery = () => useQuery(['city'], apiGetCurrentCity);

export const useCurrentCityMutation = () => {
	const queryClient = useQueryClient();

	return useMutation<unknown, unknown, City>(apiUpdateCurrentCity, {
		onSuccess: (_, city) => {
			queryClient.setQueryData(['city'], () => city);
		}
	});
};

export const useBookmarksQuery = () => useQuery(['bookmarks'], apiGetBookmarks);

export const useAddBookmarkMutation = () => {
	const queryClient = useQueryClient();

	return useMutation<unknown, unknown, City, City[]>(apiAddBookmark, {
		onSuccess: (_data, city) => {
			const bookmarks = queryClient.getQueryData<City[]>(['bookmarks']);
			const result = _.uniqBy([...(bookmarks ?? []), city], c => c._id);
			queryClient.setQueryData(['bookmarks'], result);
		}
	});
};

export const useRemoveBookmarkMutation = () => {
	const queryClient = useQueryClient();

	return useMutation<unknown, unknown, City, City[]>(apiRemoveBookmark, {
		onSuccess: (_data, city) => {
			const bookmarks = queryClient.getQueryData<City[]>(['bookmarks']);
			const result = _.filter(bookmarks, c => c._id !== city._id);
			queryClient.setQueryData(['bookmarks'], result);
		}
	});
};

export const useSearchCitiesQuery = (query: string) =>
	useQuery(['search', query], ({ signal }) => apiSearchCities(query, signal), { enabled: false });
