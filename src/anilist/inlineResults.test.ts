import { assertEquals } from "testing/asserts.ts";
import getInlineResults from "./inlineResults.ts";

Deno.test("inline result (anime)", async () => {
  const result = await getInlineResults("boku no pico");
  assertEquals(result, {
    Page: {
      pageInfo: {
        total: 5,
        currentPage: 1,
        lastPage: 1,
        hasNextPage: false,
        perPage: 25,
      },
      media: [
        {
          id: 1639,
          idMal: 1639,
          title: {
            romaji: "Boku no Pico",
            english: null,
          },
          isAdult: true,
          studios: {
            nodes: [
              {
                name: "Natural High",
              },
            ],
          },
          coverImage: {
            medium:
              "https://s4.anilist.co/file/anilistcdn/media/anime/cover/small/1639.jpg",
          },
          genres: ["Hentai"],
          description:
            "During summer vacation, Tamotsu is on break from work happens to visit a particular café. It is at this café that Tamotsu meets Pico, who works there for his grandfather. Tamotsu instantly falls for Pico, believing that Pico is a girl because of his feminine appearance. However, to his disbelief, Pico claims he actually is a guy. Undeterred, Tamotsu pursues a sexual relationship with Pico, to an extent where he even persuades Pico into wearing girl clothes. When Pico asks what is he to Tamotsu, he finds himself unable to answer...<br><br>\r\n[Written by MAL Rewrite]",
          averageScore: 34,
          status: "FINISHED",
          format: "OVA",
          trailer: null,
        },
        {
          id: 5391,
          idMal: 5391,
          title: {
            romaji: "Pico to Chico",
            english: null,
          },
          isAdult: true,
          studios: {
            nodes: [
              {
                name: "Natural High",
              },
            ],
          },
          coverImage: {
            medium:
              "https://s4.anilist.co/file/anilistcdn/media/anime/cover/small/5391.jpg",
          },
          genres: ["Hentai"],
          description:
            "The crisp rays of summer sun find the effeminate Pico embroiled in yet another heated and lustful fling. While out biking, Pico meets and befriends Chico—a lively boy not much younger than him, but leagues behind in the affairs of the flesh. After the innocent Chico shows his sister in the midst of self-pleasure to Pico, Pico takes it upon himself to educate this confused youth.<br>\n<br>\n(Source: MAL Rewrite)",
          averageScore: 36,
          status: "FINISHED",
          format: "OVA",
          trailer: null,
        },
        {
          id: 4866,
          idMal: 4866,
          title: {
            romaji: "Pico x CoCo x Chico",
            english: null,
          },
          isAdult: true,
          studios: {
            nodes: [
              {
                name: "Natural High",
              },
            ],
          },
          coverImage: {
            medium:
              "https://s4.anilist.co/file/anilistcdn/media/anime/cover/small/4866.jpg",
          },
          genres: ["Hentai"],
          description:
            "The third installment of the Boku no Pico series, which takes sometime after the second OVA, Pico to Chico.<br><br>\nPico and Chico meet a mysterious young boy named CoCo, whom Pico at first believes is a girl. The three of them become friends, but soon CoCo believes he is becoming a strain on Pico and Chico's relationship and decides to distance himself from them. The three of them rekindle their friendship by the end of the OVA.",
          averageScore: 36,
          status: "FINISHED",
          format: "OVA",
          trailer: null,
        },
        {
          id: 6546,
          idMal: 6546,
          title: {
            romaji: "Pico: Boku no Chiisana Natsu Monogatari",
            english: null,
          },
          isAdult: false,
          studios: {
            nodes: [
              {
                name: "Natural High",
              },
            ],
          },
          coverImage: {
            medium:
              "https://s4.anilist.co/file/anilistcdn/media/anime/cover/small/6546.jpg",
          },
          genres: [],
          description:
            "An edited version of the first OVA titled pico~ Boku no Chiisana Natsu Monogatari (pico: My Little Summer Story) was released on November 11, 2007. It is a re-edited version of the animation seen in the Boku no Pico OVA set to a new script, featuring content that is more appropriate for viewers under the age of 18.<br>\n<br>\n(Source: nekoshota.com)",
          averageScore: 40,
          status: "FINISHED",
          format: "OVA",
          trailer: null,
        },
        {
          id: 109004,
          idMal: 32240,
          title: {
            romaji:
              "Code Geass: Boukoku no Akito 4 - Nikushimi no Kioku Kara Picture Drama",
            english: null,
          },
          isAdult: false,
          studios: {
            nodes: [
              {
                name: "Sunrise",
              },
            ],
          },
          coverImage: {
            medium:
              "https://s4.anilist.co/file/anilistcdn/media/anime/cover/small/b109004-NGx9qAjTVboI.jpg",
          },
          genres: ["Mecha"],
          description: null,
          averageScore: 56,
          status: "FINISHED",
          format: "SPECIAL",
          trailer: null,
        },
      ],
    },
  });
});

Deno.test("inline result (manga)", async () => {
  assertEquals(await getInlineResults("Tokyo Revengers", "MANGA"), {
    Page: {
      pageInfo: {
        total: 2,
        currentPage: 1,
        lastPage: 1,
        hasNextPage: false,
        perPage: 25,
      },
      media: [
        {
          id: 102988,
          idMal: 104565,
          title: { romaji: "Tokyo卍Revengers", english: "Tokyo Revengers" },
          isAdult: false,
          studios: { nodes: [] },
          coverImage: {
            medium:
              "https://s4.anilist.co/file/anilistcdn/media/manga/cover/small/bx102988-OoVJxQCH6fbR.jpg",
          },
          genres: ["Action", "Drama", "Romance", "Supernatural"],
          description:
            "Hanagaki Takemichi was once a low-life punk, but after biting off more than he could chew with a gang in middle school, he ran away from his old life. Now that he’s an adult, the gang that once terrorized him has grown into the largest gang in Tokyo, and they’ve started killing people–including his old girlfriend! After learning this news, a mysterious force on a train platform shoves Takemichi right in front of an approaching train. As his life flashes before his eyes, he blinks to find himself transported back to middle school, before he fled from the gang! Now he has the chance to right what went wrong all those years ago. Can he save his girlfriend’s life in the future–and what else might he change if he’s rewriting the past?\n<br><br>\n(Source: Seven Seas Entertainment)\n<br><br>\n<i>Notes:<br>\n- Winner of the Shounen Manga category of the 44th annual Kodansha Manga Awards.<br>\n- Includes 1 extra chapter.</i>",
          averageScore: 82,
          status: "RELEASING",
          format: "MANGA",
          trailer: null,
        },
        {
          id: 114523,
          idMal: null,
          title: { romaji: "Baki Gaiden: Revenge Tokyo", english: null },
          isAdult: false,
          studios: { nodes: [] },
          coverImage: {
            medium:
              "https://s4.anilist.co/file/anilistcdn/media/manga/cover/small/bx114523-AmEswBWBw0dc.png",
          },
          genres: ["Action"],
          description: null,
          averageScore: 54,
          status: "FINISHED",
          format: "MANGA",
          trailer: null,
        },
      ],
    },
  });
});
