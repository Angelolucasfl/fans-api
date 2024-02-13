import * as create from "./artist.create"; 
import * as getAll from "./artist.getAll";

export const ArtistController = {
  ...create,
  ...getAll
};