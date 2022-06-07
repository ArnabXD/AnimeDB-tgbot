import ava from 'ava';
import getMedia from './getMedia';

ava('fetch anime information', async (test) => {
  test.deepEqual(await getMedia(20), {
    Media: {
      id: 20,
      idMal: 20,
      title: {
        romaji: 'NARUTO',
        english: 'Naruto',
        native: 'NARUTO -ナルト-'
      },
      genres: ['Action', 'Comedy'],
      studios: {
        nodes: [
          {
            name: 'Studio Pierrot'
          },
          {
            name: 'TV Tokyo'
          },
          {
            name: 'Aniplex'
          },
          {
            name: 'Viz Media'
          },
          {
            name: 'Shueisha'
          },
          {
            name: 'KSS'
          },
          {
            name: 'SME Visual Works'
          },
          {
            name: 'Rakuonsha'
          }
        ]
      },
      description:
        "Naruto Uzumaki, a hyperactive and knuckle-headed ninja, lives in Konohagakure, the Hidden Leaf village. Moments prior to his birth, a huge demon known as the Kyuubi, the Nine-tailed Fox, attacked Konohagakure and wreaked havoc. In order to put an end to the Kyuubi's rampage, the leader of the village, the 4th Hokage, sacrificed his life and sealed the monstrous beast inside the newborn Naruto. <br><br>\nShunned because of the presence of the Kyuubi inside him, Naruto struggles to find his place in the village. He strives to become the Hokage of Konohagakure, and he meets many friends and foes along the way. <br><br>\n(Source: MAL Rewrite)",
      averageScore: 79,
      status: 'FINISHED',
      format: 'TV',
      trailer: null
    }
  });
});

ava('fetch manga information', async (test) => {
  test.deepEqual(await getMedia(102988, 'MANGA'), {
    Media: {
      id: 102988,
      idMal: 104565,
      title: {
        romaji: 'Tokyo卍Revengers',
        english: 'Tokyo Revengers',
        native: '東京卍リベンジャーズ'
      },
      genres: ['Action', 'Drama', 'Romance', 'Supernatural'],
      studios: {
        nodes: []
      },
      description:
        'Hanagaki Takemichi was once a low-life punk, but after biting off more than he could chew with a gang in middle school, he ran away from his old life. Now that he’s an adult, the gang that once terrorized him has grown into the largest gang in Tokyo, and they’ve started killing people–including his old girlfriend! After learning this news, a mysterious force on a train platform shoves Takemichi right in front of an approaching train. As his life flashes before his eyes, he blinks to find himself transported back to middle school, before he fled from the gang! Now he has the chance to right what went wrong all those years ago. Can he save his girlfriend’s life in the future–and what else might he change if he’s rewriting the past?\n<br><br>\n(Source: Seven Seas Entertainment)\n<br><br>\n<i>Notes:<br>\n- Winner of the Shounen Manga category of the 44th annual Kodansha Manga Awards.<br>\n- Includes 1 extra chapter.</i>',
      averageScore: 82,
      status: 'RELEASING',
      format: 'MANGA',
      trailer: null
    }
  });
});
