// utils.ts
export function formatTime(createdAt: string) {
    const now = new Date();
    const postDate = new Date(createdAt);
  
    const timeDiff = now.getTime() - postDate.getTime();
    const seconds = Math.floor(timeDiff / 1000); // Sekunde
    const minutes = Math.floor(seconds / 60); // Minute
    const hours = Math.floor(minutes / 60); // Sati
    const days = Math.floor(hours / 24); // Dani
  
    // Manje od minute
    if (seconds < 60) {
      return `${seconds}s`;
    }
  
    // Manje od 1h
    if (minutes < 60) {
      return `${minutes}m`;
    }
  
    // Manje od 1 dana
    if (hours < 24) {
      return `${hours}h`;
    }
  
    // Preko 1 dana - prikazivanje dana u formatu dd/MM
    const day = postDate.getDate();
    const month = postDate.getMonth() + 1; // Meseci su 0-indexirani
    const year = postDate.getFullYear();
    
    return `${day}/${month}/${year}`;
  }
  