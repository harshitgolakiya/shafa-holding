"use client";

import { useEffect, useRef } from "react";
import { setSubmissionStatusAction } from "../../../actions";

/** Marks an inquiry as read once it has actually been opened (not when a link is prefetched). */
export function MarkAsRead({ id }: { id: number }) {
  const done = useRef(false);
  useEffect(() => {
    if (done.current) return;
    done.current = true;
    void setSubmissionStatusAction(id, "read");
  }, [id]);
  return null;
}
