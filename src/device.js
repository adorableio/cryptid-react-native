import DeviceInfo from 'react-native-device-info';

export default function collectDeviceMetadata () {
  return {
    deviceManufacturer: DeviceInfo.getManufacturer(),
    deviceBrand: DeviceInfo.getBrand(),
    deviceModel: DeviceInfo.getModel(),
    deviceId: DeviceInfo.getUniqueID(),
    deviceLocale: DeviceInfo.getDeviceLocale(),
    deviceCountry: DeviceInfo.getDeviceCountry(),
    deviceName: DeviceInfo.getDeviceName(),
    systemName: DeviceInfo.getSystemName(),
    systemVersion: DeviceInfo.getSystemVersion(),
    bundleId: DeviceInfo.getBundleId(),
    buildNumber: DeviceInfo.getBuildNumber(),
    appVersion: DeviceInfo.getVersion(),
    appVersionReadable: DeviceInfo.getReadableVersion(),
    appInstanceId: DeviceInfo.getInstanceID(),
    userAgent: DeviceInfo.getUserAgent(),
    isEmulator: DeviceInfo.isEmulator(),
    isTablet: DeviceInfo.isTablet(),
  };
}
