import { Injectable } from '@angular/core';

export type Review = { user: string; comment: string; stars: number };
export type Book = {
  id: number; title: string; author: string; category: string;
  pages: number; rating: number; year: number; country: string;
  emoji: string; description: string; reviews: Review[];
};

@Injectable({ providedIn: 'root' })
export class BookService {
  categories = ['Toutes','Classique','Science-Fiction','Fantasy','Philosophie','Romance','Histoire','Développement','Psychologie'];

  books: Book[] = [
    { id:1, title:"L'Alchimiste", author:"Paulo Coelho", category:"Philosophie", pages:224, rating:4.8, year:1988, country:"Brésil", emoji:"🌟", description:"Un jeune berger andalou part à la découverte d'un trésor. Un conte philosophique sur l'accomplissement de sa légende personnelle.", reviews:[{user:"Aicha M.",comment:"Un livre qui change la vie !",stars:5},{user:"Youssef B.",comment:"Très inspirant.",stars:4}] },
    { id:2, title:"1984", author:"George Orwell", category:"Science-Fiction", pages:328, rating:4.7, year:1949, country:"Royaume-Uni", emoji:"👁️", description:"Dans un monde totalitaire dominé par Big Brother, Winston Smith tente de résister au Parti.", reviews:[{user:"Sara K.",comment:"Effrayant et prophétique.",stars:5}] },
    { id:3, title:"Le Petit Prince", author:"Antoine de Saint-Exupéry", category:"Classique", pages:96, rating:4.9, year:1943, country:"France", emoji:"🌹", description:"Un conte poétique sur l'amour, l'amitié et la perte de l'innocence.", reviews:[{user:"Meryem H.",comment:"Un chef-d'œuvre intemporel.",stars:5}] },
    { id:4, title:"Dune", author:"Frank Herbert", category:"Science-Fiction", pages:896, rating:4.6, year:1965, country:"États-Unis", emoji:"🏜️", description:"Sur la planète Arrakis, Paul Atreides lutte pour sa survie dans une guerre épique.", reviews:[{user:"Karim T.",comment:"La science-fiction à son meilleur.",stars:5}] },
    { id:5, title:"Harry Potter", author:"J.K. Rowling", category:"Fantasy", pages:320, rating:4.9, year:1997, country:"Royaume-Uni", emoji:"🧙", description:"Harry Potter découvre qu'il est un sorcier et intègre Poudlard, une école de magie.", reviews:[{user:"Sophia A.",comment:"Mon livre préféré !",stars:5},{user:"Wiam M.",comment:"La magie pure !",stars:5}] },
    { id:6, title:"Sapiens", author:"Yuval Noah Harari", category:"Histoire", pages:512, rating:4.5, year:2011, country:"Israël", emoji:"🦴", description:"Une histoire de l'humanité depuis les premiers hominidés jusqu'à nos jours.", reviews:[{user:"Hamza L.",comment:"Fascinant.",stars:4}] },
    { id:7, title:"Atomic Habits", author:"James Clear", category:"Développement", pages:320, rating:4.6, year:2018, country:"États-Unis", emoji:"🔄", description:"Un guide pratique pour construire de bonnes habitudes.", reviews:[{user:"Omar N.",comment:"A changé ma routine !",stars:5}] },
    { id:8, title:"L'Étranger", author:"Albert Camus", category:"Philosophie", pages:159, rating:4.4, year:1942, country:"France/Algérie", emoji:"☀️", description:"Un roman existentialiste sur l'absurde et la condition humaine.", reviews:[{user:"Ines B.",comment:"Dérangeant mais brillant.",stars:4}] },
    { id:9, title:"Les Misérables", author:"Victor Hugo", category:"Classique", pages:1232, rating:4.8, year:1862, country:"France", emoji:"⚖️", description:"À travers Jean Valjean, Hugo dresse un tableau de la société française du XIXe siècle.", reviews:[{user:"Fatima R.",comment:"Un monument de la littérature.",stars:5}] },
    { id:10, title:"Le Seigneur des Anneaux", author:"J.R.R. Tolkien", category:"Fantasy", pages:1178, rating:4.9, year:1954, country:"Royaume-Uni", emoji:"💍", description:"Frodon et ses compagnons partent détruire l'Anneau Unique pour sauver la Terre du Milieu.", reviews:[{user:"Bilal C.",comment:"L'œuvre maîtresse de la fantasy.",stars:5}] },
  ];

  getBooks(): Book[] { return this.books; }
  getCategories(): string[] { return this.categories; }

  addReview(bookId: number, review: Review): void {
    const book = this.books.find(b => b.id === bookId);
    if (book) {
      book.reviews.push(review);
      const avg = book.reviews.reduce((s, r) => s + r.stars, 0) / book.reviews.length;
      book.rating = Math.round(avg * 10) / 10;
    }
  }
}