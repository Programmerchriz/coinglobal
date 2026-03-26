
const adjectives = [
  "swift",
  "silent",
  "clever",
  "cosmic",
  "brave",
  "lucky",
];

const animals = [
  "tiger",
  "wolf",
  "panda",
  "otter",
  "falcon",
  "lynx",
];

const MAX_BASE_LENGTH = 20;

function random(arr: string[]) {
  return arr[Math.floor(Math.random() * arr.length)];
}

export async function generateUsername(email: string) {
  const emailBase = email
    .split("@")[0]
    .toLowerCase()
    .replace(/[^a-z0-9]/g, "")
    .slice(0, 8);

  return (
    `${emailBase}${random(adjectives)}${random(animals)}${Math.floor(
      Math.random() * 1000
    )}`.slice(0, MAX_BASE_LENGTH)
  );
};
