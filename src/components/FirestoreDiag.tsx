"use client";

import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import { db } from "@/lib/firebaseClient";
import { useState } from "react";

export default function FirestoreDiag() {
  const [last, setLast] = useState<string>("");

  const testWrite = async () => {
    try {
      const id = "diag-" + Date.now();
      await setDoc(
        doc(db, "eirybot-site/root/site_events", id),
        { ts: serverTimestamp(), what: "diag" },
        { merge: true }
      );
      setLast(`OK: eirybot-site/root/site_events/${id}`);
      alert("Diag write OK");
    } catch (e: any) {
      console.error("Diag write FAILED:", e);
      setLast(`ERROR: ${e?.message ?? String(e)}`);
      alert("Diag write FAILED");
    }
  };

  return (
    <div className="grid gap-3">
      <button className="btn-flat primary" onClick={testWrite}>
        Test Firestore write
      </button>
      {last && <code className="text-xs text-gray-600">{last}</code>}
    </div>
  );
}
