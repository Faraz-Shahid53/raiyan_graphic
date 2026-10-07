"use client";

/** Small shared state so sections can wait for the preloader to finish. */

export const uiEvents = new EventTarget();

let ready = false;

export function isUiReady() {
  return ready;
}

export function markUiReady() {
  if (ready) return;
  ready = true;
  uiEvents.dispatchEvent(new Event("ready"));
}

/** Run fn once the intro is allowed to start (immediately if already ready). */
export function onUiReady(fn: () => void) {
  if (ready) {
    fn();
    return () => {};
  }
  uiEvents.addEventListener("ready", fn, { once: true });
  return () => uiEvents.removeEventListener("ready", fn);
}
