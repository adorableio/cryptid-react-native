# cryptid-react-native

Javascript react-native client to cryptid analytics.

This library should be used to integrate Cryptid Analytics into react-native
applications.

For browser-based javascript projects (including React, Vue, etc.), use
cryptid, which will gather browser information rather than device information.

## Install

First, install the package to your React Native project

```bash
npm install cryptid-react-native --save
```

This should install the module along with its main dependency,
[react-native-device-info](https://github.com/rebeccahughes/react-native-device-info).
You'll then need to follow the configuration instructions of
`react-native-device-info`, available at the preceding link but reproduced
here.

```bash
react-native link react-native-device-info
```

_Note: The above command works for recent versions of RN. If you need to deal
with an older version of the framework or if you desire to manually link the
dependency into your application, please follow [the directions
here](https://github.com/rebeccahughes/react-native-device-info)._

## Configure

Create a new `Tracker` using the `trackerId` of the property you're tracking.

```javascript
import Tracker from 'cryptid-react-native';

const tracker = new Tracker('mobile|C8BB8D97-CA6E-49B7-89A3-56EB0A671480');
```

You may also supply additional options as a second argument. These will be
passed through to the underlying `fetch` call.

There are also two callbacks you may define: `beforeFetch`, which is passed the
url and options that will be used in the `fetch`, and `afterFetch` which is
passed the response.

```javascript
import Tracker from 'cryptid-react-native';

const tracker = new Tracker('mobile|C8BB8D97-CA6E-49B7-89A3-56EB0A671480', {
  beforeFetch: (url, options) => console.log('before', url, options),
  afterFetch: (response) => console.log('response', response),
});
```

## Use

**`Tracker` has one method: `send`**, which is used to send an event to the cryptid
service. When you call `send` the library gathers device metadata to include
with the event data you supply. All of this metadata may be overridden by
fields you include on the event object (see the Events section below.)

Simple example:

```javascript
tracker.send({eventValue: 'login-successful'});
```

More complex:

```javascript
tracker.send({
  eventCategory: 'authentication',
  eventAction: 'signup',
  eventLabel: 'signup-method',
  eventValue: 'facebook',
  timezone: '',
  latitude: '',
  logintude: '',
  elevation: ''
});
```

### Events

List of fields that can be included in the event object.

| Field | Description | Required? | Example |
|-------|-------------|-----------|---------|
| `eventCategory` | Category of the event | No | `authentication` |
| `eventAction` | Action or workflow the event occured during | No | `login` |
| `eventLabel` | Label of the event | No | `form-submission` |
| `eventValue` | Value of the event | Yes | `button-click` or `enter-key` |
| `customField_1` | Custom data | No | |
| `customField_2` | Custom data | No | |
| `customField_3` | Custom data | No | |
| `customField_4` | Custom data | No | |
| `customField_5` | Custom data | No | |
| `timezone` | Timezone the device resides in | No | `America/Chicago` |
| `latitude` | Latitude of the device | No | `43.0731` |
| `longitude` | Longitude of the device | No | `89.4012` |
| `elevation` | Elevation of the device | No | 741 |

**You may use the Category, Action, Label and Value event fields any way that
you'd like in your application**; they exist merely to allow for an event
taxonomy that works for you. The simplest way to use them is to only supply an
event value such as `login-successful`. If you don't need anything more
complicated, you may omit the rest of the fields.

Likewise, the `customField` values are there to log supplemental application
information that may bes useful to you, but are not required by the `send`
event or the service.

**Note that the geospatial data is NOT collected automatically** by the
library. This is because different platforms require specific permission to be
given to collect such information, and it's not up to cryptid whether you
enable the collection (and thus user opt-in) for this data. Therefore, if you
already have these permissions or choose to enable them then this data can be
included in the event payload.

List of device metadata fields that are automatically collected and may be
overridden by including them in the event object:

| Field | Description | Exammple |
|-------|-------------|----------|
| `deviceManufacturer` | Device manufacturer | `Apple` |
| `deviceBrand` | Device brand | `Apple`, `htc`, `Xiaomi` |
| `deviceModel` | Device model | `iPhone 6` |
| `deviceId` | Device ID | `iPhone7,2` |
| `deviceLocale` | Device locale | `en-US` |
| `deviceCountry` | Device country | `US` |
| `deviceName` | Device name | `Zach's iPhone 6` |
| `systemName` | System name | `iPhone OS` |
| `systemVersion` | System version | `9.0` |
| `bundleId` | Bundle ID | `com.cardiganapp` |
| `buildNumber` | Build number | `89` |
| `appVersion` | Applicatino version | `1.1.0` |
| `appVersionReadable` | Application version | `1.1.0.89` |
| `appInstanceId` | Application instance ID | (Android only) |
| `userAgent` | User agent | `Dalvik/2.1.0 (Linux; U; Android 5.1; Google Nexus 4 - 5.1.0 - API 22 - 768x1280 Build/LMY47D)` |
| `isEmulator` | Is the app running in an emulator? | `true` |
| `isTablet` | Is the app running on a tablet | `false` |

