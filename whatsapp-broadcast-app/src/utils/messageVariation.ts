export function generateMessageVariations(baseMessage: string): string[] {
    const variations: string[] = [];
    
    // Simple variations by changing the order of words
    const words = baseMessage.split(' ');
    for (let i = 0; i < words.length; i++) {
        for (let j = i + 1; j < words.length; j++) {
            const newMessage = [...words];
            [newMessage[i], newMessage[j]] = [newMessage[j], newMessage[i]];
            variations.push(newMessage.join(' '));
        }
    }

    // Adding some common variations
    variations.push(baseMessage + '!');
    variations.push('Hey! ' + baseMessage);
    variations.push('Just a reminder: ' + baseMessage);
    variations.push('Quick note: ' + baseMessage);
    
    // Remove duplicates
    return Array.from(new Set(variations));
}