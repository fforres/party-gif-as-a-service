export type YeetGifOptions =
  | "quiet"
  | "pad"
  | "write-meta"
  | "raw"
  | "delay-ms";

type RollCommand = {
  command: "roll";
  options?: {
    /** default 1 */
    revolutions?: number;
    /** default 1 */
    scale?: number;
    /** default 0 */
    phase?: number;
    /** default 1 */
    "crop-scale"?: number;
  };
  arguments?: {};
};

type WobbleCommand = {
  command: "wobble";
  options?: {
    /** default 1 */
    frequency?: number;
    /** default 20 */
    amplitude?: number;
    /** default 0 */
    phase?: number;
    /** default 'sine */
    type?: "sine" | "snap" | "saw" | "sticky";
  };
  arguments?: {};
};

type PulseCommand = {
  command: "pulse";
  options?: {
    /** default 0.9 */
    from?: number;
    /** default 1 */
    to?: number;
    /** default 1 */
    frequency?: number;
    /** default 0 */
    phase?: number;
  };
  arguments?: {};
};

type ZoomCommand = {
  command: "zoom";
  options?: {
    /**
     * e.g. 1.0,1.5 to zoom from 100% to 150%
     * default []
     */
    ZOOM_LEVELS_CSV?: string[]; // ?? figure out if this is correct. maybe its a [number, number]55
  };
  arguments?: {};
};

type ShakeCommand = {
  command: "shake";
  options?: {
    /** default 1 */
    frequency?: number;
    /** default 7 */
    amplitude?: number;
    /** default 0.75 */
    random?: number;
  };
  arguments?: {};
};

type WokeCommand = {
  command: "woke";
  options?: {
    /** default true */
    clip?: boolean;
    /** default full */
    type?: "full";
    /** default 0.9 */
    scale?: number;
    /** default 0.8 */
    hue?: number;
    /** default 1 */
    lightness?: number;
    /** default 0.8 */
    alpha?: number;
    /** default 2 */
    "alpha-pow"?: number;
    /** default 0.15 */
    "alpha-threshold"?: number;
    /** default 0.5 */
    random?: number;
  };
  // TODO: Implement argments
  arguments?: {
    POINTS: [[number, number], [number, number]];
  };
};

type FriedCommand = {
  command: "fried";
  options?: {
    /** default true */
    clip?: boolean;
    /** default 10 */
    walk?: number;
    /** default 1 */
    iterations?: number;
    /** 🅰️: default [0.33] */
    a?: [number];
    /** 🅱️: default [0.33] */
    b?: [number];
    /** 🆑: default [0.33] */
    c?: [number];
    /** default [1] */
    noise?: [number];
    /** default [0.02] */
    noise1?: [number];
    /** default [0.5] */
    noise2?: [number];
    /** default [0.1] */
    noise3?: [number];
    /** default [84] (From 0 to 100) */
    jpeg?: [number];
    /** default [3] */
    saturation?: [number];
    /** default [6]*/
    contrast?: [number];
    /** default [0.4]*/
    tint?: [number];
  };
  arguments?: {};
};

type HueCommand = {
  command: "hue";
  options?: {
    /** default 1 */
    frequency?: number;
    /** default 0.1 */
    amplitude?: number;
    /** default [1] */
    x?: [number];
    /** default [1] */
    y?: [number];
    /** default 'add' */
    mode?: "mul" | "add" | "sub" | "pow" | "sin";
  };
  arguments?: {
    HUE_OFFSETS_CSV: number[];
  };
};

type TintCommand = {
  command: "tint";
  options?: {
    /** default 1 */
    frequency?: number;
    /** default 0.1 */
    amplitude?: number;
    /** default [1] */
    x?: [number];
    /** default [1] */
    y?: [number];
    /** default 'add' */
    mode?: "mul" | "add" | "sub" | "pow" | "sin";
    /** default 0.8608454902138696 */
    center?: number;
  };
  arguments?: {
    TINT_HUE_CSV: number[];
  };
};

type ResizeCommand = {
  command: "resize";
  options?: {
    /** default 1 */
    scale?: number;
    /** default 0 */
    width?: number;
    /** default 0 */
    height?: number;
  };
  arguments?: {};
};

type CropCommand = {
  command: "command";
  options?: {
    /** default 0 */
    threshold?: number;
  };
  arguments?: {};
};

type OptimizeCommand = {
  command: "optimize";
  options?: {
    /** default 128 */
    kb?: number;
    /** default true */
    "no-resize"?: boolean;
    /** default 0 */
    width?: number;
    /** default 0 */
    height?: number;
  };
  arguments?: {};
};

type CrowdCommand = {
  command: "crowd";
  options: {
    /** Crowd size - default 3 */
    n?: number;
    /** default true */
    flip?: boolean;
    /** default 0.5 */
    x?: number;
    /** default 0.5 */
    y?: number;
    /** from 0.0 to 1.0 - default 0.25 */
    scale?: number;
    /** from 0.0 to 1.0 - default 0.1 */
    rotate?: number;
    /** from 0.0 to 1.0 - default 0 */
    alpha?: number;
    /** from 0.0 to 1.0 - default 1 */
    offset?: number;
  };
  arguments?: {};
};

type EraseCommand = {
  command: "erase";
  options?: {
    /** default 3 */
    "sample-x"?: number;
    /** default 3 */
    "sample-y"?: number;
    /** default 0.2 */
    tolerance?: number;
    /** default 1 */
    u?: number;
    /** default 0.5 */
    s?: number;
    /** default 1 */
    l?: number;
  };
  arguments?: {};
};

type ChopCommand = {
  command: "chop";
  options?: {};
  arguments?: {
    COMMAND: "shuffle" | "duplicate" | "drop" | "reverse";
  };
};

type TextCommand = {
  command: "text";
  options?: {
    /** default 0.7 */
    "background-alpha"?: number;
    /** default 18.5 */
    "font-size"?: number;
    /** default 0.3 */
    "text-y"?: number;
    /** default 3 */
    "background-padding"?: number;
  };
  arguments?: {
    COMMAND: string;
  };
};

// type RainCommand = {}; // Not supported
// type CatCommand = {}; // Not supported
// type MetaCommand = {}; // Not supported
// type ComposeCommand = {}; // Not supported

export type YeetGifCommand =
  | RollCommand
  | WobbleCommand
  | PulseCommand
  | ZoomCommand
  | ShakeCommand
  | WokeCommand
  | FriedCommand
  | HueCommand
  | TintCommand
  | ResizeCommand
  | CropCommand
  | OptimizeCommand
  | CrowdCommand
  | EraseCommand
  | ChopCommand
  | TextCommand;

export type YeetGifSettings = {
  options?: YeetGifOptions[];
  commands: YeetGifCommand[];
};
