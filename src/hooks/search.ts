import { useState } from 'react';
import _ from 'lodash';
import axios, { AxiosResponse, CancelTokenSource } from 'axios';

type DebouncedCall = _.DebouncedFunc<(value: string) => Promise<void>>;
type DebouncedSearchApi<T> = (
	query: string,
	tokenSource: CancelTokenSource
) => Promise<AxiosResponse<T[]>>;

export const useDebouncedSearch = <T extends any>(
	searchApi: DebouncedSearchApi<T>
) => {
	const [query, setQuery] = useState('');
	const [_searchQuery, setSearchQuery] = useState<DebouncedCall>();
	const [results, setResults] = useState<T[]>([]);
	const [error, setError] = useState('');
	const [loading, setLoading] = useState(false);
	const [tokenSource, setTokenSource] = useState<CancelTokenSource>();

	const _onChangeQuery = (newQuery: string) => {
		setQuery(newQuery);
		if (newQuery.length < 3) {
			return;
		}

		const search = _.debounce(sendQuery, 400);
		setSearchQuery((prevSearch: DebouncedCall | undefined) => {
			prevSearch?.cancel();
			return search;
		});

		search(newQuery);
	};

	const sendQuery = async (value: string) => {
		const { cancelPrevQuery, result, error } = await callSearchApi(value);

		if (cancelPrevQuery) {
			return;
		}
		if (error === undefined) {
			setResults(result);
			setError('');
		} else {
			setResults([]);
			setError(error);
		}
	};

	const callSearchApi = async (
		query: string
	): Promise<{
		result: T[];
		cancelPrevQuery: boolean;
		error?: string;
	}> => {
		try {
			if (tokenSource !== undefined) {
				tokenSource.cancel('Operation canceled due to new request.');
			}

			let token = axios.CancelToken.source();
			setTokenSource(token);
			setLoading(true);

			let { data } = await searchApi(query, token);
			setLoading(false);

			return { result: data, cancelPrevQuery: false };
		} catch (err: any) {
			if (axios.isCancel(err)) {
				return { cancelPrevQuery: true, result: [] };
			}
			return { error: err, result: [], cancelPrevQuery: false };
		}
	};

	return { query, results, error, _onChangeQuery, loading };
};
