export function generateMessageVariations(baseMessage: string): string[] {
  const variations: string[] = [];
  const words = baseMessage.split(' ');

  // Swap words around
  for (let i = 0; i < words.length; i++) {
    for (let j = i + 1; j < words.length; j++) {
      const newMessage = [...words];
      [newMessage[i], newMessage[j]] = [newMessage[j], newMessage[i]];
      variations.push(newMessage.join(' '));
    }
  }

  // Synonym replacements
  const synonyms: Record<string, string[]> = {
    hello: ['hi', 'hey'],
    thanks: ['thank you', 'thx'],
  };
  words.forEach((word, index) => {
    const syns = synonyms[word.toLowerCase()];
    if (syns) {
      syns.forEach((syn) => {
        const newWords = [...words];
        newWords[index] = syn;
        variations.push(newWords.join(' '));
      });
    }
  });

  // Common prefixes/suffixes
  variations.push(baseMessage + '!');
  variations.push('Hey! ' + baseMessage);
  variations.push('Just a reminder: ' + baseMessage);
  variations.push('Quick note: ' + baseMessage);

  return Array.from(new Set([baseMessage, ...variations]));
}
