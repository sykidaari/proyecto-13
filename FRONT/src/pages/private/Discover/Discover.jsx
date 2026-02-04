import backend from '@/api/config/axios.js';
import useAppContext from '@/contexts/App/hooks/useAppContext.js';
import useServerProblemtext from '@/contexts/App/hooks/useServerProblemText.js';
import useText from '@/contexts/App/hooks/useText.js';
import MediaSection from '@c/features/media/MediaSection/MediaSection.jsx';
import SearchBar from '@c/ui/SearchBar/SearchBar.jsx';
import SectionBox from '@c/ui/SectionBox/SectionBox.jsx';
import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';

const Discover = () => {
  const searchSuggestions = useText('pages.private.discover.searchSuggestions');
  const {
    state: { language, country }
  } = useAppContext();
  const errorText = useServerProblemtext();

  const [placeholderText] = useState(() => {
    const i = Math.floor(Math.random() * searchSuggestions.length);
    return searchSuggestions[i];
  });

  const [query, setQuery] = useState('');
  const keyword = query.trim();

  const { data, isPending, error } = useQuery({
    queryKey: ['discoverMedia', keyword, country, language],
    queryFn: async () => {
      const params = {
        countryCode: country,
        languageCode: language,
        ...(keyword && { keyword })
      };

      const { data } = await backend.get('/media/fetch', { params });
      return data;
    },
    staleTime: Infinity,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    refetchOnMount: false
  });

  useEffect(() => {
    console.log('data', data, 'isPending', isPending, 'error', error);
  }, [data, isPending, error]);

  return (
    <SectionBox>
      <SearchBar
        mode='submit'
        placeholder={placeholderText}
        error={error && errorText}
        onSearch={setQuery}
      />
      <MediaSection
        shows={data?.shows}
        swipeDirection='y'
        specifyShowType
      ></MediaSection>
    </SectionBox>
  );
};

export default Discover;
