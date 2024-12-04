import Dexie, { type EntityTable } from "dexie";

interface TToken {
  id: number;
  token: string;
}

export type { TToken };

export const db = new Dexie("tokenDB") as Dexie & {
  token: EntityTable<TToken, "id">;
};

db.version(1).stores({
  token: "++id, token",
});
