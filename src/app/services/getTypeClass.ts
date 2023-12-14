export function getTypeClass(type: string): string {
  if (type === 'Fire') {
    return 'fire-type';
  } else if (type === 'Water') {
    return 'water-type';
  } else if (type === 'Electric') {
    return 'electric-type';
  } else if (type === 'Rock') {
    return 'rock-type';
  } else {
    return '';
  }
}
