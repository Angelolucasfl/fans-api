import * as Create from "./Create"; 
import * as GetAll from "./GetAll";
import * as GetById from "./GetById";
// import * as updateById from "./updateById";
// import * as deleteById from "./deleteById";

export const ArtistProvider = {
  ...Create,
  ...GetAll,
  ...GetById,
  // ...updateById,
  // ...deleteById
};