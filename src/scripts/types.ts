export function getEl<T extends HTMLElement = HTMLElement>(id: string): T | null {
  return document.getElementById(id) as T | null;
}

export function queryAll<T extends Element = Element>(sel: string): NodeListOf<T> {
  return document.querySelectorAll<T>(sel);
}
