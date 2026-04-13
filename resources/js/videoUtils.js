/**
 * Constructs a public S3-compatible URL for a media file stored in the Railway bucket.
 * Supports both video (mp4) and audio (mp3) files.
 *
 * Expected environment variables (set in Railway):
 *   VITE_BUCKET_ENDPOINT  – e.g. "bucket.railway.app" or a custom domain
 *   VITE_BUCKET_NAME      – e.g. "persona-videos"
 *
 * Resulting URL format:
 *   https://{ENDPOINT}/{BUCKET}/videos/{filename}
 *
 * @param {string} filename – e.g. "main1.mp3"
 * @returns {string} Full URL to the media file
 */
export function getVideoUrl(filename) {
  const endpoint = import.meta.env.VITE_BUCKET_ENDPOINT;
  const bucket = import.meta.env.VITE_BUCKET_NAME;
  return `https://${endpoint}/${bucket}/videos/${filename}`;
}
