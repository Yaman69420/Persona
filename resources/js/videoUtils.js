/**
 * Constructs a public S3-compatible URL for a video stored in the Railway bucket.
 *
 * Expected environment variables (set in Railway):
 *   VITE_BUCKET_ENDPOINT  – e.g. "bucket.railway.app" or a custom domain
 *   VITE_BUCKET_NAME      – e.g. "persona-videos"
 *
 * Resulting URL format:
 *   https://{ENDPOINT}/{BUCKET}/videos/{filename}
 *
 * @param {string} filename – e.g. "Mainn.mp4"
 * @returns {string} Full URL to the video file
 */
export function getVideoUrl(filename) {
  // Use local fallback for development
  if (import.meta.env.DEV) {
    return `/videos/${filename}`;
  }

  const bucket = import.meta.env.VITE_BUCKET_NAME;
  return `https://${bucket}.t3.tigrisbucket.io/videos/${filename}`;
}
