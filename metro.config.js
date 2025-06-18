/**
 * Metro configuration workaround for Firebase Auth with Expo SDK 53 / React Native 0.79
 */
const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);

// Fix: temporarily disable package exports enforcement
config.resolver.unstable_enablePackageExports = false;

module.exports = config;