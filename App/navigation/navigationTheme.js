const { DefaultTheme } = require("@react-navigation/native");
const { default: colors } = require("../config/colors");
const { Background } = require("@react-navigation/elements");

export default {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: colors.errorRed,
    background: colors.lightWarmBackground,
  },
};
