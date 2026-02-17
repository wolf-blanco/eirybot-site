// src/lib/paths.ts
import { collection } from "firebase/firestore";
import { db } from "@/lib/firebaseClient";

// Colección "pública" del sitio según tus reglas
const siteEnv = "prod"; // tus reglas solo permiten prod

export const colWebLeads     = () => collection(db, "eirybot_site", siteEnv, "web_leads");
export const colUnsubscribes = () => collection(db, "eirybot_site", siteEnv, "unsubscribes");
export const colEiryScan     = () => collection(db, "eirybot_site", siteEnv, "eiryscan_results");
export const colSiteEvents   = () => collection(db, "eirybot_site", siteEnv, "site_events");
export const colErrorLog     = () => collection(db, "eirybot_site", siteEnv, "error_log");
