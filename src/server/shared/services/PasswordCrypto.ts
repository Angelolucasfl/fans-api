import { hash, genSalt, compare } from "bcryptjs";


const SALT_RAMDOMS = 8;
const hashPassword = async(password: string) => {

  const saltGenerated = await genSalt(SALT_RAMDOMS);
  return await hash(password, saltGenerated);
};

const verifyPassword = async(password: string, hashedPassword: string) => {
  return compare(password, hashedPassword);
};

export const PasswordCrypto = {
  hashPassword,
  verifyPassword
};