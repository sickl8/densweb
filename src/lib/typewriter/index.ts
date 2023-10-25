import { TW } from "./class";
import type { Options, TypewriterClass } from "typewriter-effect";

export type Typewriter = TypewriterClass;
export const Typewriter = (TW as any) as new (container: string | HTMLElement, options: Options) => Typewriter