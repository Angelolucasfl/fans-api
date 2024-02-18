import { IArtist } from "../../models";

declare module "knex/types/tables" {
  interface Tables {
    artist: IArtist
    //follower: IFollower
    //user: IUser
  }
}