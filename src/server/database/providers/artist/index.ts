import * as Create from "./Create"; 
import * as GetAll from "./GetAll";
// import * as getById from "./getById";
// import * as updateById from "./updateById";
// import * as deleteById from "./deleteById";

export const ArtistProvider = {
  ...Create,
  ...GetAll,
  // ...getById,
  // ...updateById,
  // ...deleteById
};