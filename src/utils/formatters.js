export function stripHtml(html) {
  if (!html) return 'No description available.';
  const text = html.replace(/<[^>]*>?/gm, '').trim();
  return text
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#039;/g, "'")
    .replace(/&nbsp;/g, ' ');
}

export function getReleaseYear(dateStr) {
  if (!dateStr) return 'N/A';
  const year = dateStr.split('-')[0];
  return year || 'N/A';
}

export function formatRating(rating) {
  const score = typeof rating === 'object' && rating !== null ? rating.average : rating;
  if (score === null || score === undefined || isNaN(score)) {
    return 'N/A';
  }
  return Number(score).toFixed(1);
}

export const PLACEHOLDER_POSTER = 
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='450' viewBox='0 0 300 450' fill='%231a2234'%3E%3Crect width='300' height='450' fill='%231a2234'/%3E%3Ctext x='50%25' y='46%25' font-family='sans-serif' font-size='42' fill='%23e50914' dominant-baseline='middle' text-anchor='middle'%3E🎬%3C/text%3E%3Ctext x='50%25' y='56%25' font-family='sans-serif' font-size='15' font-weight='bold' fill='%239ca3af' dominant-baseline='middle' text-anchor='middle'%3ENo Poster Available%3C/text%3E%3C/svg%3E";

export const PLACEHOLDER_BACKDROP =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='800' height='450' viewBox='0 0 800 450' fill='%23111827'%3E%3Crect width='800' height='450' fill='%23111827'/%3E%3Ctext x='50%25' y='46%25' font-family='sans-serif' font-size='56' fill='%23e50914' dominant-baseline='middle' text-anchor='middle'%3E🎬%3C/text%3E%3Ctext x='50%25' y='58%25' font-family='sans-serif' font-size='18' font-weight='bold' fill='%239ca3af' dominant-baseline='middle' text-anchor='middle'%3ECineVerse%3C/text%3E%3C/svg%3E";
