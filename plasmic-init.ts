import { initPlasmicLoader } from "@plasmicapp/loader-nextjs";

export const PLASMIC = initPlasmicLoader({
  projects: [
    {
      id: "kFir9ZJnBri18MmPNi2Wph",
      token: "yGdfRhmCvCYiHeHmrFt4cKs8bUYZcwkdWl5MzjyrgMQOKcm0BMQcd3dEfwpJoQ9xrOGUtdGLgyvZAQb2XfQPGQ",
    },
  ],

  // By default Plasmic will use the last published version of your project.
  // For development, you can set preview to true, which will use the unpublished
  // project, allowing you to see your designs without publishing.  Please
  // only use this for development, as this is significantly slower.
  preview: true,
});

// You can register any code components that you want to use here; see
// https://docs.plasmic.app/learn/code-components-ref/
// And configure your Plasmic project to use the host url pointing at
// the /plasmic-host page of your nextjs app (for example,
// http://localhost:3000/plasmic-host).  See
// https://docs.plasmic.app/learn/app-hosting/#set-a-plasmic-project-to-use-your-app-host

// PLASMIC.registerComponent(...);

import { ScrollProvider } from "./components/ScrollContext";
PLASMIC.registerGlobalContext(ScrollProvider, {
  name: "ScrollProvider",
  providesData: true,
  props: {},
});

import ScrollableContainer from "./components/ScrollableContainer";

PLASMIC.registerComponent(ScrollableContainer, {
  name: "Scrollable Container",
  providesData: true,
  props: {
children: {
      type: "slot",
    }
},
});


import { Parallax } from "./components/ParallaxText";

PLASMIC.registerComponent(Parallax, {
  name: "Parallax",
  props: {
    children: "slot",
className: 'string',
    from: "number", 
    to: "number",
    stiffness: "number",
    damping: "number",
  },
  providesData: true,
});


import NumberTickerComponent from "./components/number-ticker";

PLASMIC.registerComponent(NumberTickerComponent, {
  name: "Number Ticker",
  props: {
  value: "number",
delay: "number",
  direction: "string",
decimals: "number",
  className: "string",
},
});

import { CustomMarquee } from "./components/Marquee";
PLASMIC.registerComponent(CustomMarquee, {
  name: "Custom Marquee",
  props: {
    className: "string",
    style: "object",
    autoFill: "boolean",
    play: "boolean",
    pauseOnHover: "boolean",
    pauseOnClick: "boolean",
    direction: {
      type: "choice",
      options: ["left", "right", "up", "down"]
    },
    speed: "number",
    delay: "number",
    loop: "number",
    gradient: "boolean",
    gradientColor: "string",
    gradientWidth: {
      type: "number",
      displayName: "Gradient Width",
      description: "Width of the gradient on either side"
    },
    onFinish: {
      type: "eventHandler",
      argTypes: []
    },
    onCycleComplete: {
      type: "eventHandler",
      argTypes: []
    },
    onMount: {
      type: "eventHandler",
      argTypes: []
    },
    children: {
      type: "slot",
      defaultValue: [
        {
          type: "text",
          value: "I can be a React component, multiple React components, or just some text."
        }
      ]
    }
  },
});