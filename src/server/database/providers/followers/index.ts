import * as Create from "./Create"; 
import * as GetAll from "./GetAll";
import * as GetById from "./GetById";
import * as UpdateById from "./UpdateById";
import * as DeleteById from "./DeleteById";
import * as Count from "./Count";  

export const FollowerProvider = {
  ...Create,
  ...GetAll,
  ...GetById,
  ...UpdateById,
  ...DeleteById,
  ...Count,
};