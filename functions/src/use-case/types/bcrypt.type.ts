import { compareSync, hash } from 'bcrypt';

export type HashPassword = typeof hash;

export type ComparePassword = typeof compareSync;
