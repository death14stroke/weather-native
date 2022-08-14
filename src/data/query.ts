import AsyncStorage from '@react-native-async-storage/async-storage';
import { createAsyncStoragePersister } from '@tanstack/query-async-storage-persister';
import { QueryClient } from '@tanstack/react-query';

// max-age = 30 minutes
const CACHE_MAX_AGE = 30 * 60 * 1000;
// max-stale = 7 days
const CACHE_MAX_STALE = 7 * 24 * 60 * 60 * 1000;

export const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			networkMode: 'offlineFirst',
			cacheTime: CACHE_MAX_AGE,
			staleTime: CACHE_MAX_STALE
		}
	}
});

export const asyncStoragePersister = createAsyncStoragePersister({
	storage: AsyncStorage
});
