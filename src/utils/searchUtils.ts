
/**
 * Creates a debounced function that delays invoking the provided function
 * until after the specified wait time has elapsed since the last invocation.
 */
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: ReturnType<typeof setTimeout> | null = null;
  
  return function(...args: Parameters<T>) {
    const later = () => {
      timeout = null;
      func(...args);
    };
    
    if (timeout !== null) {
      clearTimeout(timeout);
    }
    timeout = setTimeout(later, wait);
  };
}

/**
 * Creates a trie data structure for efficient search operations
 */
export class Trie {
  private root: { [key: string]: any } = {};
  
  /**
   * Inserts a word into the trie with associated data
   */
  insert(word: string, data: any): void {
    let node = this.root;
    
    // Convert to lowercase for case-insensitive search
    const lowercaseWord = word.toLowerCase();
    
    for (const char of lowercaseWord) {
      if (!node[char]) {
        node[char] = {};
      }
      node = node[char];
    }
    
    // Mark the end of a word and store associated data
    node.isEndOfWord = true;
    node.data = data;
  }
  
  /**
   * Searches for words that start with the given prefix
   */
  search(prefix: string): any[] {
    let node = this.root;
    const results: any[] = [];
    
    // Convert to lowercase for case-insensitive search
    const lowercasePrefix = prefix.toLowerCase();
    
    // Navigate to the node representing the prefix
    for (const char of lowercasePrefix) {
      if (!node[char]) {
        return results; // Prefix not found
      }
      node = node[char];
    }
    
    // Find all words with the given prefix
    this.findAllWords(node, results);
    return results;
  }
  
  /**
   * Helper function to find all words from a given node
   */
  private findAllWords(node: { [key: string]: any }, results: any[]): void {
    if (node.isEndOfWord) {
      results.push(node.data);
    }
    
    for (const char in node) {
      if (char !== 'isEndOfWord' && char !== 'data') {
        this.findAllWords(node[char], results);
      }
    }
  }
}
