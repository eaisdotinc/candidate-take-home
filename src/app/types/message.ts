export interface Message {
  id: string;
  from: "user" | "bot";
  text: string;
}
