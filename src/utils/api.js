import { initialMovies } from '../data/movies';

// Helper to get items from localStorage
export const fetchItemsFromStorage = () => {
  const saved = localStorage.getItem('homework_items');
  return saved ? JSON.parse(saved) : initialMovies;
};

// Helper to save items to localStorage
export const saveItemsToStorage = (items) => {
  localStorage.setItem('homework_items', JSON.stringify(items));
};

// Simulated Async API Call with random delays and occasional error chance
export const fakeApiCall = (action, payload) => {
  return new Promise((resolve, reject) => {
    const delay = Math.floor(Math.random() * 800) + 400; // 400ms - 1200ms delay

    setTimeout(() => {
      // Simulate a random 5% network error chance to test error states robustly
      if (Math.random() < 0.05) {
        reject(new Error("Network Error: Failed to communicate with server."));
        return;
      }

      let items = fetchItemsFromStorage();

      switch (action) {
        case 'GET_ALL':
          resolve(items);
          break;

        case 'GET_DETAILS':
          // Simulate fetching deep details for a specific item
          const item = items.find(i => i.id === payload.id);
          if (item) {
            resolve({
              ...item,
              detailedSynopsis: `Deep extended overview for ${item.title}. Directed by ${item.director}, released in ${item.year}. Critically acclaimed with a rating of ${item.rating}/10.`,
              studio: "Universal Cinematic Labs",
              budget: "$50,000,000",
              boxOffice: "$180,000,000"
            });
          } else {
            reject(new Error("Item not found."));
          }
          break;

        case 'CREATE':
          const newItem = { id: Date.now(), ...payload };
          items = [newItem, ...items];
          saveItemsToStorage(items);
          resolve(items);
          break;

        case 'UPDATE':
          items = items.map(i => i.id === payload.id ? { ...i, ...payload.updates } : i);
          saveItemsToStorage(items);
          resolve(items);
          break;

        case 'DELETE':
          items = items.filter(i => i.id !== payload.id);
          saveItemsToStorage(items);
          resolve(items);
          break;

        default:
          reject(new Error("Unknown API action."));
      }
    }, delay);
  });
};