/*
import { HCESession, NFCTagType4NDEFContentType, NFCTagType4 } from 'react-native-hce';
import NfcManager, { Ndef, NfcTech } from 'react-native-nfc-manager';
import { Platform } from 'react-native';
import { captureError } from '../sentry';

const TNF_MAP = {
  EMPTY: 0x0,
  WELL_KNOWN: 0x01,
  MIME_MEDIA: 0x02,
  ABSOLUTE_URI: 0x03,
  EXTERNAL_TYPE: 0x04,
  UNKNOWN: 0x05,
  UNCHANGED: 0x06,
  RESERVED: 0x07,
};

const RTD_MAP = {
  TEXT: 'T', // [0x54]
  URI: 'U', // [0x55]
  SMART_POSTER: 'Sp', // [0x53, 0x70]
  ALTERNATIVE_CARRIER: 'ac', // [0x61, 0x63]
  HANDOVER_CARRIER: 'Hc', // [0x48, 0x63]
  HANDOVER_REQUEST: 'Hr', // [0x48, 0x72]
  HANDOVER_SELECT: 'Hs', // [0x48, 0x73]
};
function tnfValueToName(value) {
  for (const name in TNF_MAP) {
    if (value === TNF_MAP[name]) {
      return name;
    }
  }
  return null;
}

function rtdValueToName(value) {
  value = value.reduce((acc, byte) => acc + String.fromCharCode(byte), '');
  for (const name in RTD_MAP) {
    if (value === RTD_MAP[name]) {
      return name;
    }
  }
  return value;
}

export default class NFC {
  public static read = async (techRequest: NfcTech | NfcTech[]) => {
    try {
      const supported = await NfcManager.isSupported();
      if (supported) {
        await NfcManager.start();
        await NfcManager.requestTechnology(techRequest);
        let tag = await NfcManager.getTag();
        while (!tag.ndefMessage) {
          if (Platform.OS === 'ios') {
            await NfcManager.setAlertMessageIOS('Reading... Keep your device NFC chip aligned');
            await NfcManager.restartTechnologyRequestIOS();
          }

          tag = await NfcManager.getTag();
        }
        if (tag.ndefMessage) {
          if (Platform.OS === 'ios') {
            await NfcManager.setAlertMessageIOS('Success');
          }
          await NfcManager.cancelTechnologyRequest();
        }

        const records = tag.ndefMessage.map((record) => {
          const tnfName = tnfValueToName(record.tnf);
          const rtdName = rtdValueToName(record.type);
          let data;
          if (rtdName === 'URI') {
            data = Ndef.uri.decodePayload(record.payload as any);
          } else if (rtdName === 'TEXT') {
            data = Ndef.text.decodePayload(record.payload as any);
          } else if (tnfName === 'EXTERNAL_TYPE') {
            data = Buffer.from(record.payload).toString('base64');
          } else {
            data = JSON.parse(Buffer.from(record.payload).toString());
          }
          return { data, rtdName, tnfName };
        });
        return records;
      }
    } catch (error) {
      if (error.toString() === 'Error') {
        // ignore when nfc is dismissed
        throw error;
      } else {
        captureError(error);
        if (Platform.OS === 'ios') {
          await NfcManager.invalidateSessionWithErrorIOS('Something went wrong!');
        }
        await NfcManager.cancelTechnologyRequest();
        throw error;
      }
    }
  };

  public static send = async (techRequest: NfcTech | NfcTech[], bytes: number[]) => {
    try {
      const supported = await NfcManager.isSupported();
      if (supported) {
        await NfcManager.start();
        await NfcManager.requestTechnology(techRequest);

        if (Platform.OS === 'ios') {
          await NfcManager.setAlertMessageIOS('Hold your device steady...');
        }

        while (true) {
          try {
            const data = await NfcManager.ndefHandler.writeNdefMessage(bytes);
            if (Platform.OS === 'ios') {
              await NfcManager.setAlertMessageIOS('Success');
            }
            await NfcManager.cancelTechnologyRequest();
            return { data };
          } catch (writeError) {
            if (writeError.toString() === 'Error') {
              if (Platform.OS === 'ios') {
                await NfcManager.setAlertMessageIOS('Please align the NFC reader...');
              }
              // Small delay before retry
              await new Promise((resolve) => setTimeout(resolve, 500));
              continue;
            }
            throw writeError;
          }
        }
      }
    } catch (error) {
      console.log('NFC write error:', error);
      if (Platform.OS === 'ios') {
        await NfcManager.invalidateSessionWithErrorIOS('Something went wrong!');
      }
      await NfcManager.cancelTechnologyRequest();
      throw error;
    }
  };

  public static encodeTextRecord = (message) => Ndef.encodeMessage([Ndef.textRecord(message)]);

  public static isNFCSupported = async () => NfcManager.isSupported();

  public static showiOSMessage = async (message: string) => NfcManager.setAlertMessageIOS(message);

  public static showiOSErrorMessage = async (message: string) =>
    NfcManager.invalidateSessionWithErrorIOS(message);

  public static cancelRequest = async () => {
    const isEnabled = await NfcManager.isEnabled();
    if (isEnabled) NfcManager.cancelTechnologyRequest();
  };

  public static startTagSession = async ({
    session,
    content,
    writable = false,
  }: {
    session: HCESession;
    content: string;
    writable?: boolean;
  }) => {
    const tag = new NFCTagType4({
      type: NFCTagType4NDEFContentType.Text,
      content,
      writable,
    });
    await session.setApplication(tag);
    await session.setEnabled(true);
  };

  public static stopTagSession = async (session) => {
    try {
      await session.setEnabled(false);
    } catch (e) {}
  };
}
*/
