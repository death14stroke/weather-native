import { apiAddBookmark } from '@api';
import { City } from '@models';
import _ from 'lodash';
import { QueryClient, useMutation, useQueryClient } from 'react-query';

export const useBookmarkMutations = () => {
	const queryClient = useQueryClient();
	const { mutate: addCity } = useMutation<unknown, unknown, City, City[]>(
		city => apiAddBookmark(city),
		{
			onMutate: city => updateBookmarks(queryClient, city),
			onError: (err, _city, context) => {
				queryClient.setQueryData('bookmarks', context);
				console.error('useBookmarkMutations: ', err);
			}
		}
	);

	return [addCity];
};

const updateBookmarks = (queryClient: QueryClient, city: City) => {
	const prevData = queryClient.getQueryData<City[]>('bookmarks');
	queryClient.setQueryData<City[]>('bookmarks', old =>
		_.unionWith<City>(old, [city], (a, b) => a._id === b._id)
	);

	return prevData;
};
