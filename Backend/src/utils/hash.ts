import crypto from "crypto";

export const genHash = (length: number): string => {
    return crypto.randomBytes(length).toString("hex")
};
