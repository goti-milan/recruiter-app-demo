
// utils/auth.ts
export function getAuthorizedUserId(): string | null {

  const userId = localStorage.getItem("x-user-id");

  if (!userId) {
    console.warn("Unauthorized: No user ID found");
    return '5733c87a-3bef-49b7-a248-4b4c54c7b781'; // for testing purspose only (truthy condidtion is : return null)
  }

  return userId;
}
