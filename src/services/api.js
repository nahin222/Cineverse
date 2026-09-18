const BASE_URL = 'https://api.tvmaze.com';

/**
 * Normalizes a raw TVMaze item (handles both /shows format and /search/shows { score, show } format)
 */
export function normalizeShow(item) {
  if (!item) return null;
  const show = item.show ? item.show : item;
  return {
    id: show.id,
    name: show.name || 'Untitled Show',
    summary: show.summary || '',
    genres: Array.isArray(show.genres) ? show.genres : [],
    status: show.status || 'Unknown',
    premiered: show.premiered || null,
    ended: show.ended || null,
    rating: show.rating?.average ?? null,
    image: {
      medium: show.image?.medium || null,
      original: show.image?.original || null,
    },
    runtime: show.runtime || show.averageRuntime || null,
    language: show.language || 'English',
    officialSite: show.officialSite || null,
    network: show.network?.name || show.webChannel?.name || 'N/A',
    type: show.type || 'Show',
  };
}

/**
 * Fetches all default shows from TVMaze API (/shows)
 */
export async function getShows() {
  try {
    const response = await fetch(`${BASE_URL}/shows`, {
      headers: { Accept: 'application/json' },
    });
    if (!response.ok) {
      throw new Error(`API error: ${response.status} ${response.statusText}`);
    }
    const data = await response.json();
    return data.map(normalizeShow).filter(Boolean);
  } catch (error) {
    console.error('Failed to fetch shows from TVMaze:', error);
    // Return sample offline fallback if network is unreachable
    return FALLBACK_SHOWS.map(normalizeShow);
  }
}

/**
 * Searches shows by query from TVMaze API (/search/shows?q=)
 */
export async function searchShows(query) {
  if (!query || !query.trim()) {
    return getShows();
  }
  try {
    const response = await fetch(
      `${BASE_URL}/search/shows?q=${encodeURIComponent(query.trim())}`,
      { headers: { Accept: 'application/json' } }
    );
    if (!response.ok) {
      throw new Error(`API error: ${response.status} ${response.statusText}`);
    }
    const data = await response.json();
    return data.map(normalizeShow).filter(Boolean);
  } catch (error) {
    console.error(`Failed to search shows for "${query}":`, error);
    // Local search filter on fallback shows if offline
    const q = query.toLowerCase();
    return FALLBACK_SHOWS
      .filter((s) => s.name.toLowerCase().includes(q) || s.genres.some((g) => g.toLowerCase().includes(q)))
      .map(normalizeShow);
  }
}

/**
 * Fetches single show details by ID
 */
export async function getShowById(id) {
  try {
    const response = await fetch(`${BASE_URL}/shows/${id}`);
    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }
    const data = await response.json();
    return normalizeShow(data);
  } catch (error) {
    console.error(`Failed to fetch show ${id}:`, error);
    const found = FALLBACK_SHOWS.find((s) => s.id === Number(id));
    return found ? normalizeShow(found) : null;
  }
}

/**
 * High-quality fallback shows in case the client is offline or network fails
 */
export const FALLBACK_SHOWS = [
  {
    id: 1,
    name: "Under the Dome",
    genres: ["Drama", "Science-Fiction", "Thriller"],
    status: "Ended",
    premiered: "2013-06-24",
    rating: { average: 6.6 },
    runtime: 60,
    language: "English",
    network: { name: "CBS" },
    officialSite: "http://www.cbs.com/shows/under-the-dome/",
    image: {
      medium: "https://static.tvmaze.com/uploads/images/medium_portrait/81/202627.jpg",
      original: "https://static.tvmaze.com/uploads/images/original_untouched/81/202627.jpg",
    },
    summary: "<p><b>Under the Dome</b> tells the story of the small town of Chester's Mill, where a massive, transparent, indestructible dome suddenly cuts off the citizens from the rest of the world.</p>",
  },
  {
    id: 2,
    name: "Person of Interest",
    genres: ["Action", "Crime", "Drama"],
    status: "Ended",
    premiered: "2011-09-22",
    rating: { average: 8.8 },
    runtime: 60,
    language: "English",
    network: { name: "CBS" },
    officialSite: "http://www.cbs.com/shows/person_of_interest/",
    image: {
      medium: "https://static.tvmaze.com/uploads/images/medium_portrait/163/407679.jpg",
      original: "https://static.tvmaze.com/uploads/images/original_untouched/163/407679.jpg",
    },
    summary: "<p>You are being watched. The government has a secret system, a machine that spies on you every hour of every day. An ex-CIA agent and a mysterious programmer save people from crimes before they happen.</p>",
  },
  {
    id: 3,
    name: "Bitten",
    genres: ["Drama", "Horror", "Romance"],
    status: "Ended",
    premiered: "2014-01-11",
    rating: { average: 7.4 },
    runtime: 60,
    language: "English",
    network: { name: "Space" },
    officialSite: "http://space.ca/Bitten",
    image: {
      medium: "https://static.tvmaze.com/uploads/images/medium_portrait/0/15.jpg",
      original: "https://static.tvmaze.com/uploads/images/original_untouched/0/15.jpg",
    },
    summary: "<p>Based on the critically acclaimed series of novels from Kelley Armstrong, <b>Bitten</b> centers on Elena Michaels, the world's only female werewolf.</p>",
  },
  {
    id: 4,
    name: "Arrow",
    genres: ["Drama", "Action", "Science-Fiction"],
    status: "Ended",
    premiered: "2012-10-10",
    rating: { average: 7.4 },
    runtime: 60,
    language: "English",
    network: { name: "The CW" },
    officialSite: "http://www.cwtv.com/shows/arrow",
    image: {
      medium: "https://static.tvmaze.com/uploads/images/medium_portrait/213/534017.jpg",
      original: "https://static.tvmaze.com/uploads/images/original_untouched/213/534017.jpg",
    },
    summary: "<p>After a violent shipwreck, billionaire playboy Oliver Queen was missing and presumed dead for five years before being discovered alive on a remote island in the North China Sea.</p>",
  },
  {
    id: 5,
    name: "True Detective",
    genres: ["Drama", "Crime", "Thriller"],
    status: "Running",
    premiered: "2014-01-12",
    rating: { average: 8.9 },
    runtime: 60,
    language: "English",
    network: { name: "HBO" },
    officialSite: "https://www.hbo.com/true-detective",
    image: {
      medium: "https://static.tvmaze.com/uploads/images/medium_portrait/490/1226057.jpg",
      original: "https://static.tvmaze.com/uploads/images/original_untouched/490/1226057.jpg",
    },
    summary: "<p>Touch darkness and darkness touches you back. An American anthology crime drama television series created and written by Nic Pizzolatto.</p>",
  },
  {
    id: 6,
    name: "The 100",
    genres: ["Action", "Drama", "Science-Fiction"],
    status: "Ended",
    premiered: "2014-03-19",
    rating: { average: 7.7 },
    runtime: 60,
    language: "English",
    network: { name: "The CW" },
    officialSite: "http://www.cwtv.com/shows/the-100",
    image: {
      medium: "https://static.tvmaze.com/uploads/images/medium_portrait/257/642675.jpg",
      original: "https://static.tvmaze.com/uploads/images/original_untouched/257/642675.jpg",
    },
    summary: "<p>Ninety-seven years ago, nuclear Armageddon decimated planet Earth. Ninety-seven years later, 100 juvenile delinquents are sent back to test Earth's habitability.</p>",
  },
  {
    id: 7,
    name: "Homeland",
    genres: ["Drama", "Thriller", "Espionage"],
    status: "Ended",
    premiered: "2011-10-02",
    rating: { average: 8.2 },
    runtime: 60,
    language: "English",
    network: { name: "Showtime" },
    officialSite: "http://www.sho.com/homeland",
    image: {
      medium: "https://static.tvmaze.com/uploads/images/medium_portrait/230/575652.jpg",
      original: "https://static.tvmaze.com/uploads/images/original_untouched/230/575652.jpg",
    },
    summary: "<p>The winner of 6 Emmy Awards including Outstanding Drama Series, <b>Homeland</b> is an edge-of-your-seat sensation following CIA officer Carrie Mathison.</p>",
  },
  {
    id: 8,
    name: "Glee",
    genres: ["Drama", "Music", "Comedy"],
    status: "Ended",
    premiered: "2009-05-19",
    rating: { average: 6.6 },
    runtime: 60,
    language: "English",
    network: { name: "FOX" },
    officialSite: "http://www.fox.com/glee",
    image: {
      medium: "https://static.tvmaze.com/uploads/images/medium_portrait/0/73.jpg",
      original: "https://static.tvmaze.com/uploads/images/original_untouched/0/73.jpg",
    },
    summary: "<p><b>Glee</b> is a musical comedy about a group of ambitious and talented kids who try to escape the harsh realities of high school by joining a glee club.</p>",
  }
];
