export const DATABASE_FETCH_ERROR_MESSAGE = "Unable to fetch data from database.";

export type SafeDbResult<T> = {
  data: T;
  databaseError: boolean;
};

export async function safeDbQuery<T>(
  query: () => Promise<T>,
  fallback: T,
): Promise<SafeDbResult<T>> {
  try {
    return { data: await query(), databaseError: false };
  } catch (error) {
    console.error("[safeDbQuery]", error);
    return { data: fallback, databaseError: true };
  }
}
