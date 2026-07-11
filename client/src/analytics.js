import ReactGA from "react-ga4";

export const initGA = () => {
  ReactGA.initialize("G-S6GX5TWQ72");
};

export const trackPageView = () => {
  ReactGA.send({
    hitType: "pageview",
    page: window.location.pathname + window.location.search,
  });
};
