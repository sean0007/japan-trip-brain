/**
 * Japan travel facts for agents and humans.
 * Only well-established, recurring patterns. Exact event dates and bloom forecasts
 * change every year, so every event carries a typical window and should be verified.
 */

export type Traveler = "solo" | "couple" | "family" | "budget" | "luxury" | "nightlife";
export const TRAVELERS: Traveler[] = ["solo", "couple", "family", "budget", "luxury", "nightlife"];

export type Area = { name: string; goodFor: Traveler[]; price: "$" | "$$" | "$$$"; why: string; downside: string };
export type Event = { name: string; months: number[]; when: string; what: string };
export type City = {
  id: string;
  name: string;
  region: string;
  summary: string;
  areas: Area[];
  doAnytime: string[];
  events: Event[];
  seasonal: Partial<Record<number, string>>;
  peakMonths: number[];
};
export type MonthInfo = {
  month: number;
  name: string;
  season: string;
  weather: string;
  crowds: "low" | "medium" | "high";
  notes: string[];
};

export const MONTHS: MonthInfo[] = [
  { month: 1, name: "January", season: "winter", weather: "Cold and mostly dry on Honshu; snowy in Hokkaido; mild in Okinawa.", crowds: "medium", notes: ["Jan 1–3 is New Year: many shops, restaurants, and museums close, while major shrines are packed for first visits (hatsumode).", "After the first week, crowds drop and hotel prices are often lower."] },
  { month: 2, name: "February", season: "winter", weather: "Coldest month on the mainland; peak snow in Hokkaido.", crowds: "low", notes: ["One of the quietest months in Kyoto and Tokyo.", "Plum blossoms (ume) start in late February in many mainland cities."] },
  { month: 3, name: "March", season: "spring", weather: "Cool, warming through the month.", crowds: "medium", notes: ["Cherry blossoms usually open in late March in Tokyo, Kyoto, Osaka, and Hiroshima. Forecasts come out each year; check them before booking.", "Late March is Japanese school spring break, so domestic travel rises."] },
  { month: 4, name: "April", season: "spring", weather: "Mild and pleasant.", crowds: "high", notes: ["Early April is often still cherry blossom peak on Honshu; Kyoto hotels book out early.", "Golden Week starts around April 29: the busiest domestic travel period of the year, with high prices and packed trains."] },
  { month: 5, name: "May", season: "spring", weather: "Warm and mostly dry; green and comfortable.", crowds: "medium", notes: ["Golden Week runs to about May 5. After it, crowds drop sharply and May becomes one of the best months to visit.", "Okinawa's rainy season usually starts in May."] },
  { month: 6, name: "June", season: "rainy season", weather: "Rainy season (tsuyu) on most of Honshu, humid with frequent rain; Hokkaido largely avoids it.", crowds: "low", notes: ["Fewer tourists and good prices, but pack for rain.", "Hydrangeas are the seasonal flower; Hokkaido is at its best."] },
  { month: 7, name: "July", season: "summer", weather: "Rainy season usually ends mid to late July on Honshu, then it turns hot and very humid.", crowds: "medium", notes: ["Summer festival and fireworks season begins.", "Midday heat can be dangerous; plan outdoor sightseeing for mornings and evenings."] },
  { month: 8, name: "August", season: "summer", weather: "Hottest, most humid month; typhoons possible, especially in the south.", crowds: "high", notes: ["Obon week in mid-August is a peak domestic travel time; trains and flights fill up.", "Typhoon season runs roughly August to October; keep plans flexible, especially for Okinawa."] },
  { month: 9, name: "September", season: "early autumn", weather: "Still hot early, cooling late; peak typhoon risk.", crowds: "medium", notes: ["Some years have a holiday cluster (Silver Week) that brings domestic crowds.", "Typhoons can cancel flights and ferries; build in a buffer day."] },
  { month: 10, name: "October", season: "autumn", weather: "Comfortable and mostly dry.", crowds: "medium", notes: ["One of the best months for weather.", "Autumn leaves start in Hokkaido and the mountains."] },
  { month: 11, name: "November", season: "autumn", weather: "Cool, clear days.", crowds: "high", notes: ["Autumn leaves usually peak mid to late November in Kyoto and Tokyo, and Kyoto gets as crowded as cherry blossom season.", "Book Kyoto hotels well ahead for the second half of the month."] },
  { month: 12, name: "December", season: "winter", weather: "Cold and dry on Honshu; snow season starts in Hokkaido.", crowds: "medium", notes: ["Early December can still have autumn color in Kyoto and Tokyo.", "Winter illuminations light up many cities.", "From late December into New Year, many businesses close and domestic travel spikes."] },
];

const VERIFY = "Typical timing; confirm this year's dates with the official organizer before booking.";

export const CITIES: City[] = [
  {
    id: "tokyo", name: "Tokyo", region: "Kanto",
    summary: "Huge, safe, and easy to get around by train. Pick a base near a major JR or Metro line.",
    areas: [
      { name: "Shinjuku", goodFor: ["solo", "nightlife", "budget", "couple"], price: "$$", why: "Biggest transport hub, endless food, and nightlife in Kabukicho and Golden Gai.", downside: "The station is a maze and the area is busy and loud at night." },
      { name: "Shibuya", goodFor: ["solo", "couple", "nightlife"], price: "$$", why: "Young energy, shopping, the famous crossing, and good bars.", downside: "Very crowded, and hotels near the station cost more." },
      { name: "Asakusa", goodFor: ["family", "budget", "couple"], price: "$", why: "Old Tokyo feel near Senso-ji, with good-value hotels and hostels.", downside: "Quiet at night and farther from west-side sights." },
      { name: "Ginza / Tokyo Station", goodFor: ["luxury", "couple", "family"], price: "$$$", why: "Upscale hotels, department stores, and direct shinkansen access.", downside: "Pricey, with little nightlife after dark." },
      { name: "Ueno", goodFor: ["family", "budget"], price: "$", why: "Parks, museums, a zoo, and direct trains to Narita airport.", downside: "Less polished, and fewer upscale options." },
    ],
    doAnytime: ["Senso-ji temple in Asakusa", "Meiji Jingu shrine and Harajuku", "Shibuya Crossing and an observation deck", "Tsukiji Outer Market food stalls", "Ueno Park museums", "A day trip to Kamakura or Nikko"],
    events: [
      { name: "Hatsumode at Meiji Jingu", months: [1], when: "January 1–3", what: "Millions make the year's first shrine visit. It's a huge crowd but very atmospheric." },
      { name: "Sanja Matsuri", months: [5], when: "Usually the third weekend of May", what: "One of Tokyo's biggest festivals, with portable shrines carried through Asakusa." },
      { name: "Sumidagawa Fireworks", months: [7], when: "Usually the last Saturday of July", what: "Tokyo's most famous fireworks over the Sumida River. Arrive very early." },
    ],
    seasonal: { 1: "New Year shrine visits, then quiet streets.", 2: "Plum blossoms at Yushima Tenjin and other gardens.", 3: "Cherry blossoms at Ueno Park, Chidorigafuchi, and Meguro River (usually late March).", 4: "Early April blossoms, then Golden Week crowds.", 5: "Sanja Matsuri and comfortable weather.", 6: "Hydrangeas; rainy season.", 7: "Fireworks and summer festivals.", 8: "Festivals and summer heat; Obon is quieter in the city.", 9: "Fewer tourists, but still hot.", 10: "Great walking weather and Halloween in Shibuya.", 11: "Ginkgo leaves on Icho Namiki Avenue and autumn gardens.", 12: "Winter illuminations in Marunouchi, Roppongi, and elsewhere." },
    peakMonths: [3, 4, 11],
  },
  {
    id: "kyoto", name: "Kyoto", region: "Kansai",
    summary: "Temples, gardens, and old streets. It's compact but crowded at peak seasons, so book early for spring and autumn.",
    areas: [
      { name: "Kyoto Station", goodFor: ["family", "budget", "solo"], price: "$$", why: "Easiest arrival, with buses and trains everywhere and day trips to Nara and Osaka.", downside: "Modern and less charming than central Kyoto." },
      { name: "Kawaramachi / Shijo", goodFor: ["solo", "couple", "nightlife"], price: "$$", why: "Central, walkable, and close to Nishiki Market and Pontocho restaurants.", downside: "Busy shopping streets, and rooms are small." },
      { name: "Gion / Higashiyama", goodFor: ["couple", "luxury"], price: "$$$", why: "Traditional streets, ryokan, and walking distance to major temples.", downside: "Expensive and very crowded in the daytime." },
      { name: "Arashiyama", goodFor: ["couple", "luxury"], price: "$$$", why: "Scenic ryokan by the river and the bamboo grove early in the morning.", downside: "Far from the rest of Kyoto, and quiet at night." },
    ],
    doAnytime: ["Fushimi Inari's torii gates (go early or late)", "Kiyomizu-dera and the Higashiyama streets", "Kinkaku-ji (Golden Pavilion)", "Arashiyama bamboo grove", "Nishiki Market", "A day trip to Nara's deer park"],
    events: [
      { name: "Aoi Matsuri", months: [5], when: "May 15", what: "A Heian-era costume procession between the imperial palace and the Kamo shrines." },
      { name: "Gion Matsuri", months: [7], when: "All of July; float processions on July 17 and 24", what: "Kyoto's biggest festival. The evenings before each procession have street stalls and lit floats." },
      { name: "Gozan no Okuribi", months: [8], when: "August 16", what: "Giant bonfire characters lit on the mountains around the city to end Obon." },
      { name: "Jidai Matsuri", months: [10], when: "October 22", what: "A procession of costumes from across Japanese history." },
    ],
    seasonal: { 1: "Hatsumode at Fushimi Inari and Yasaka Shrine.", 2: "Quietest month, with plum blossoms at Kitano Tenmangu.", 3: "Cherry blossoms start, usually late March.", 4: "Cherry blossom peak in early April at the Philosopher's Path and Maruyama Park.", 5: "Aoi Matsuri and fresh greenery.", 6: "Moss gardens are vivid in the rain.", 7: "Gion Matsuri all month.", 8: "Gozan no Okuribi on August 16; very hot.", 9: "Moon-viewing events and fewer crowds.", 10: "Jidai Matsuri and pleasant weather.", 11: "Peak autumn leaves at Tofuku-ji, Eikan-do, and Arashiyama, usually mid to late November.", 12: "Late autumn color early in the month, then quiet streets." },
    peakMonths: [3, 4, 11],
  },
  {
    id: "osaka", name: "Osaka", region: "Kansai",
    summary: "Food city with a fun, loud personality. A good, often cheaper base for Kyoto, Nara, and Kobe.",
    areas: [
      { name: "Namba", goodFor: ["solo", "nightlife", "budget", "couple"], price: "$$", why: "Dotonbori food and neon, with a direct train to Kansai Airport.", downside: "Noisy and crowded late into the night." },
      { name: "Umeda", goodFor: ["luxury", "couple", "family"], price: "$$$", why: "Big hotels, department stores, and fast trains to Kyoto and Kobe.", downside: "Huge stations, and it feels more business than fun." },
      { name: "Shin-Osaka", goodFor: ["budget", "solo"], price: "$", why: "Shinkansen station, ideal for short stays and early departures.", downside: "Little to do in the area." },
      { name: "Tennoji", goodFor: ["family", "budget"], price: "$", why: "Good value near Abeno Harukas, the zoo, and the Shinsekai district.", downside: "Rougher edges in parts of the area." },
    ],
    doAnytime: ["Dotonbori street food at night", "Osaka Castle park", "Kuromon Market", "Universal Studios Japan", "Shinsekai and kushikatsu", "Day trips to Nara, Kobe, or Kyoto"],
    events: [
      { name: "Tenjin Matsuri", months: [7], when: "July 24–25", what: "One of Japan's three great festivals, with a boat procession on the river and fireworks on the 25th." },
    ],
    seasonal: { 1: "Hatsumode and Tōka Ebisu (around January 9–11).", 3: "Cherry blossoms around Osaka Castle, usually late March.", 4: "Cherry blossoms at the Mint Bureau's lane, usually mid-April.", 7: "Tenjin Matsuri.", 8: "Summer fireworks around the city.", 11: "Autumn color at Osaka Castle and Minoo Park.", 12: "Illuminations in Midosuji and Nakanoshima." },
    peakMonths: [3, 4, 11],
  },
  {
    id: "sapporo", name: "Sapporo", region: "Hokkaido",
    summary: "Snow capital in winter, cool and fresh in summer. Seasons run a few weeks behind the mainland.",
    areas: [
      { name: "Susukino", goodFor: ["nightlife", "solo", "couple", "budget"], price: "$$", why: "Ramen Alley, bars, and the city's main nightlife.", downside: "A rowdy late-night scene." },
      { name: "Sapporo Station", goodFor: ["family", "solo", "luxury"], price: "$$", why: "Airport trains and easy day trips to Otaru.", downside: "Less atmosphere at night." },
      { name: "Odori", goodFor: ["couple", "family"], price: "$$", why: "Central, between the station and Susukino, and the Snow Festival venue.", downside: "Prices jump during festivals." },
    ],
    doAnytime: ["Miso ramen and soup curry", "Nijo Market seafood", "Mt. Moiwa night view", "Day trip to Otaru's canal", "Sapporo Beer Museum"],
    events: [
      { name: "Sapporo Snow Festival", months: [2], when: "Early February, about a week", what: "Huge snow and ice sculptures in Odori Park and Susukino. Hotels fill months ahead." },
      { name: "YOSAKOI Soran Festival", months: [6], when: "Early to mid-June", what: "Energetic team dance performances across the city." },
      { name: "Sapporo Autumn Fest", months: [9], when: "Most of September", what: "Hokkaido food and drink stalls along Odori Park." },
    ],
    seasonal: { 1: "Deep snow and nearby ski resorts.", 2: "Snow Festival and peak winter.", 4: "Late snow melt; cherry blossoms usually late April to early May.", 5: "Cherry blossoms and lilacs.", 6: "Fresh, rain-light summer start; YOSAKOI.", 7: "Cool escape from mainland heat; lavender in Furano nearby.", 8: "Summer beer gardens.", 9: "Autumn Fest food stalls.", 10: "Autumn leaves, earlier than the rest of Japan.", 11: "First snow possible.", 12: "Ski season starts and the White Illumination." },
    peakMonths: [2, 7, 8],
  },
  {
    id: "hiroshima", name: "Hiroshima", region: "Chugoku",
    summary: "Peace Memorial Park, okonomiyaki, and Miyajima island nearby. One or two nights is common.",
    areas: [
      { name: "Hiroshima Station", goodFor: ["budget", "family", "solo"], price: "$", why: "Shinkansen access and good value.", downside: "A tram ride from the main sights." },
      { name: "Hondori / Peace Park", goodFor: ["couple", "solo", "nightlife"], price: "$$", why: "Walk to the Peace Park, the arcades, and the restaurants.", downside: "Fewer big-chain upscale options." },
      { name: "Miyajima", goodFor: ["couple", "luxury"], price: "$$$", why: "Stay on the island after day-trippers leave and see the torii lit at night.", downside: "Limited, pricey rooms and a ferry ride each way." },
    ],
    doAnytime: ["Peace Memorial Park and Museum", "Itsukushima Shrine's floating torii on Miyajima", "Hiroshima-style okonomiyaki", "Shukkeien Garden"],
    events: [
      { name: "Hiroshima Flower Festival", months: [5], when: "May 3–5", what: "Parades and stages along Peace Boulevard during Golden Week." },
      { name: "Peace Memorial Ceremony", months: [8], when: "August 6", what: "A solemn ceremony, with lantern floating on the river in the evening." },
    ],
    seasonal: { 3: "Cherry blossoms in Peace Park, usually late March.", 4: "Early April blossoms.", 5: "Flower Festival.", 8: "Peace Memorial Ceremony.", 11: "Autumn leaves at Momijidani Park on Miyajima." },
    peakMonths: [3, 4, 11],
  },
  {
    id: "naha", name: "Naha (Okinawa)", region: "Okinawa",
    summary: "Subtropical islands with a separate culture and climate. Beaches are best from about April to October, outside typhoons.",
    areas: [
      { name: "Kokusai-dori", goodFor: ["solo", "nightlife", "budget", "couple"], price: "$$", why: "The main street, with food, shops, and the market.", downside: "Touristy and noisy." },
      { name: "Asahibashi / port area", goodFor: ["family", "solo"], price: "$$", why: "Monorail and bus terminal access, and the port for island ferries.", downside: "Fewer sights in the area itself." },
    ],
    doAnytime: ["Shurijo Castle park (main hall lost in a 2019 fire and being rebuilt; check what is open)", "Makishi Public Market", "Kokusai-dori food", "Island-hop to the Kerama Islands", "Churaumi Aquarium (a long drive north)"],
    events: [
      { name: "Naha Hari dragon boat race", months: [5], when: "Around Golden Week", what: "Traditional dragon boat races at the port." },
      { name: "Naha Great Tug-of-War", months: [10], when: "Around mid-October", what: "A huge rope pulled by thousands on Route 58." },
    ],
    seasonal: { 1: "Cherry blossoms, the earliest in Japan (late January to February).", 2: "Mild weather and pro baseball spring camps.", 4: "Beach season starts.", 5: "Rainy season usually starts.", 6: "Rainy season usually ends late June.", 7: "Peak beach season.", 8: "Beaches, with typhoon risk.", 9: "Typhoon risk is highest.", 10: "Tug-of-war and still warm.", 12: "Mild winter escape." },
    peakMonths: [7, 8],
  },
];

export const EVENT_NOTE = VERIFY;
