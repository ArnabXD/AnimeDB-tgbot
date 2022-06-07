import ava from 'ava';
import search from './search';

ava('search anime', async (test) => {
  test.deepEqual(await search('Boku no Pico', 'ANIME'), {
    Page: {
      pageInfo: {
        total: 5,
        currentPage: 1,
        lastPage: 1,
        hasNextPage: false,
        perPage: 10
      },
      media: [
        {
          id: 1639,
          title: {
            romaji: 'Boku no Pico',
            english: null
          }
        },
        {
          id: 5391,
          title: {
            romaji: 'Pico to Chico',
            english: null
          }
        },
        {
          id: 4866,
          title: {
            romaji: 'Pico x CoCo x Chico',
            english: null
          }
        },
        {
          id: 6546,
          title: {
            romaji: 'Pico: Boku no Chiisana Natsu Monogatari',
            english: null
          }
        },
        {
          id: 109004,
          title: {
            romaji:
              'Code Geass: Boukoku no Akito 4 - Nikushimi no Kioku Kara Picture Drama',
            english: null
          }
        }
      ]
    }
  });
});

ava('search manga', async (test) => {
  test.deepEqual(await search('Tokyo Revengers', 'MANGA'), {
    Page: {
      pageInfo: {
        total: 2,
        currentPage: 1,
        lastPage: 1,
        hasNextPage: false,
        perPage: 10
      },
      media: [
        {
          id: 102988,
          title: {
            romaji: 'Tokyo卍Revengers',
            english: 'Tokyo Revengers'
          }
        },
        {
          id: 114523,
          title: {
            romaji: 'Baki Gaiden: Revenge Tokyo',
            english: null
          }
        }
      ]
    }
  });
});
