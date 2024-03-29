import { Knex } from "knex";
import { ETableNames } from "../ETableNames";



export const seed = async (Knex: Knex) => {
  const [{ count }] = await Knex(ETableNames.artist).count<[{ count: number }]>("* as count");
  if (!Number.isInteger(count) || Number(count) > 0) return;

  const artistToInsert = artists.map(nomeArtista => ({ nome: nomeArtista }));
  await Knex(ETableNames.artist).insert(artistToInsert);
};

const artists = [
  "Nirvana",
  "The Beatles",
  "Pink Floyd",
  "Led Zeppelin",
  "Queen",
  "Metallica",
  "Radiohead",
  "The Rolling Stones",
  "David Bowie",
  "U2",
  "AC/DC",
  "Bob Dylan",
  "Michael Jackson",
  "Elvis Presley",
  "Prince",
  "The Doors",
  "Guns N' Roses",
  "The Who",
  "Bob Marley",
  "The Beach Boys",
  "Johnny Cash",
  "Eminem",
  "The Cure",
  "Madonna",
  "Pearl Jam",
  "Black Sabbath",
  "Red Hot Chili Peppers",
  "Fleetwood Mac",
  "Coldplay",
  "Jay-Z",
  "The Clash",
  "Oasis",
  "The Police",
  "Jimi Hendrix",
  "Aerosmith",
  "R.E.M.",
  "The Smiths",
  "Pink",
  "Green Day",
  "Radiohead",
  "Kanye West",
  "Bruce Springsteen",
  "Foo Fighters",
  "Arcade Fire",
  "Queen",
  "Stevie Wonder",
  "Neil Young",
  "The Kinks",
  "Blur",
  "Depeche Mode",
  "Tupac Shakur",
  "System of a Down",
  "Beyoncé",
  "Elton John",
  "Genesis",
  "Johnny Cash",
  "Drake",
  "The Eagles",
  "Bon Jovi",
  "The Velvet Underground",
  "The Strokes",
  "The Smashing Pumpkins",
  "Lil Wayne",
  "Linkin Park",
  "N.W.A",
  "Black Eyed Peas",
  "Soundgarden",
  "Adele",
  "Metallica",
  "The Weeknd",
  "John Lennon",
  "Pink Floyd",
  "Billy Joel",
  "Radiohead",
  "Fleetwood Mac",
  "KISS",
  "Lynyrd Skynyrd",
  "Blink-182",
  "Arctic Monkeys",
  "Eagles",
  "Coldplay",
  "Maroon 5",
  "Def Leppard",
  "Radiohead",
  "Johnny Cash",
  "Gorillaz",
  "Talking Heads",
  "Creedence Clearwater Revival",
  "Queen",
  "Iron Maiden",
  "Lorde",
  "Rush",
  "AC/DC",
  "Janis Joplin",
  "Blur",
  "The Cure",
  "Prince"
];