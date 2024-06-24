import { v4 as uuidv4 } from 'uuid';

/**
 * Generates a unique slug for a meeting.
 * The slug consists of three groups of four characters separated by hyphens.
 *
 * @returns {string} The generated slug.
 */
export function generateSlug(): string {
  const uuid = uuidv4().replace(/-/g, ''); // Remove hyphens from the UUID
  const slug = `${uuid.slice(0, 4)}-${uuid.slice(4, 8)}-${uuid.slice(8, 12)}`;
  return slug;
}
