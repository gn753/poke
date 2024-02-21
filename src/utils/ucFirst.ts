export default function ucFirst(str: string | null) {
  if (!str) return str;

  return str[0].toUpperCase() + str.slice(1);
}
