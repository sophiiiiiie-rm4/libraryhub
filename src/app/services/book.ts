import { Injectable } from '@angular/core';

export type Review = { user: string; comment: string; stars: number };

export type Book = {
  id: number;
  title: string;
  author: string;
  isbn: string;
  category: string;
  coverUrl: string;
  quantity: number;
  availableCopies: number;
  pages: number;
  rating: number;
  year: number;
  country: string;
  description: string;
  reviews: Review[];
};

@Injectable({ providedIn: 'root' })
export class BookService {
  private nextId = 11;

  categories = [
    'Toutes','Classique','Science-Fiction','Fantasy',
    'Philosophie','Romance','Histoire','Developpement','Psychologie'
  ];

  private books: Book[] = [
    {
      id: 1, title: "L'Alchimiste", author: "Paulo Coelho",
      isbn: "978-2-2533-0298-3", category: "Philosophie",
      coverUrl: "", quantity: 3, availableCopies: 2,
      pages: 224, rating: 4.8, year: 1988, country: "Bresil",
      description: "Un jeune berger andalou part a la decouverte d'un tresor. Un conte philosophique sur l'accomplissement de sa legende personnelle.",
      reviews: [{ user: "Aicha M.", comment: "Un livre qui change la vie !", stars: 5 }, { user: "Youssef B.", comment: "Tres inspirant.", stars: 4 }]
    },
    {
      id: 2, title: "1984", author: "George Orwell",
      isbn: "978-2-0703-6822-8", category: "Science-Fiction",
      coverUrl: "", quantity: 2, availableCopies: 2,
      pages: 328, rating: 4.7, year: 1949, country: "Royaume-Uni",
      description: "Dans un monde totalitaire domine par Big Brother, Winston Smith tente de resister au Parti.",
      reviews: [{ user: "Sara K.", comment: "Effrayant et prophetique.", stars: 5 }]
    },
    {
      id: 3, title: "Le Petit Prince", author: "Antoine de Saint-Exupery",
      isbn: "978-2-0704-0850-4", category: "Classique",
      coverUrl: "", quantity: 5, availableCopies: 5,
      pages: 96, rating: 4.9, year: 1943, country: "France",
      description: "Un conte poetique sur l'amour, l'amitie et la perte de l'innocence.",
      reviews: [{ user: "Meryem H.", comment: "Un chef-d'oeuvre intemporel.", stars: 5 }]
    },
    {
      id: 4, title: "Dune", author: "Frank Herbert",
      isbn: "978-2-2210-5725-5", category: "Science-Fiction",
      coverUrl: "", quantity: 2, availableCopies: 1,
      pages: 896, rating: 4.6, year: 1965, country: "Etats-Unis",
      description: "Sur la planete Arrakis, Paul Atreides lutte pour sa survie dans une guerre epique.",
      reviews: [{ user: "Karim T.", comment: "La science-fiction a son meilleur.", stars: 5 }]
    },
    {
      id: 5, title: "Harry Potter", author: "J.K. Rowling",
      isbn: "978-2-0706-1327-5", category: "Fantasy",
      coverUrl: "", quantity: 4, availableCopies: 4,
      pages: 320, rating: 4.9, year: 1997, country: "Royaume-Uni",
      description: "Harry Potter decouvre qu'il est un sorcier et integre Poudlard, une ecole de magie.",
      reviews: [{ user: "Sophia A.", comment: "Mon livre prefere !", stars: 5 }, { user: "Wiam M.", comment: "La magie pure !", stars: 5 }]
    },
    {
      id: 6, title: "Sapiens", author: "Yuval Noah Harari",
      isbn: "978-2-2260-2933-4", category: "Histoire",
      coverUrl: "", quantity: 3, availableCopies: 3,
      pages: 512, rating: 4.5, year: 2011, country: "Israel",
      description: "Une histoire de l'humanite depuis les premiers hominides jusqu'a nos jours.",
      reviews: [{ user: "Hamza L.", comment: "Fascinant.", stars: 4 }]
    },
    {
      id: 7, title: "Atomic Habits", author: "James Clear",
      isbn: "978-0-7352-1129-2", category: "Developpement",
      coverUrl: "", quantity: 3, availableCopies: 3,
      pages: 320, rating: 4.6, year: 2018, country: "Etats-Unis",
      description: "Un guide pratique pour construire de bonnes habitudes.",
      reviews: [{ user: "Omar N.", comment: "A change ma routine !", stars: 5 }]
    },
    {
      id: 8, title: "L'Etranger", author: "Albert Camus",
      isbn: "978-2-0704-0024-9", category: "Philosophie",
      coverUrl: "", quantity: 4, availableCopies: 4,
      pages: 159, rating: 4.4, year: 1942, country: "France/Algerie",
      description: "Un roman existentialiste sur l'absurde et la condition humaine.",
      reviews: [{ user: "Ines B.", comment: "Derangeant mais brillant.", stars: 4 }]
    },
    {
      id: 9, title: "Les Miserables", author: "Victor Hugo",
      isbn: "978-2-2530-0440-3", category: "Classique",
      coverUrl: "", quantity: 2, availableCopies: 2,
      pages: 1232, rating: 4.8, year: 1862, country: "France",
      description: "A travers Jean Valjean, Hugo dresse un tableau de la societe francaise du XIXe siecle.",
      reviews: [{ user: "Fatima R.", comment: "Un monument de la litterature.", stars: 5 }]
    },
    {
      id: 10, title: "Le Seigneur des Anneaux", author: "J.R.R. Tolkien",
      isbn: "978-2-2670-1534-8", category: "Fantasy",
      coverUrl: "", quantity: 3, availableCopies: 3,
      pages: 1178, rating: 4.9, year: 1954, country: "Royaume-Uni",
      description: "Frodon et ses compagnons partent detruire l'Anneau Unique pour sauver la Terre du Milieu.",
      reviews: [{ user: "Bilal C.", comment: "L'oeuvre maitresse de la fantasy.", stars: 5 }]
    },
  ];

  getBooks(): Book[] { return this.books; }
  getCategories(): string[] { return this.categories; }

  getById(id: number): Book | undefined {
    return this.books.find(b => b.id === id);
  }

  add(book: Omit<Book, 'id' | 'reviews' | 'rating'>): Book {
    const newBook: Book = {
      ...book,
      id: this.nextId++,
      rating: 0,
      reviews: []
    };
    this.books.push(newBook);
    return newBook;
  }

  update(id: number, changes: Partial<Omit<Book, 'id' | 'reviews' | 'rating'>>): void {
    const idx = this.books.findIndex(b => b.id === id);
    if (idx !== -1) {
      this.books[idx] = { ...this.books[idx], ...changes };
    }
  }

  delete(id: number): void {
    this.books = this.books.filter(b => b.id !== id);
  }

  addReview(bookId: number, review: Review): void {
    const book = this.books.find(b => b.id === bookId);
    if (book) {
      book.reviews.push(review);
      const avg = book.reviews.reduce((s, r) => s + r.stars, 0) / book.reviews.length;
      book.rating = Math.round(avg * 10) / 10;
    }
  }

  decrementAvailability(bookId: number): void {
    const book = this.books.find(b => b.id === bookId);
    if (book && book.availableCopies > 0) book.availableCopies--;
  }

  incrementAvailability(bookId: number): void {
    const book = this.books.find(b => b.id === bookId);
    if (book && book.availableCopies < book.quantity) book.availableCopies++;
  }
}
