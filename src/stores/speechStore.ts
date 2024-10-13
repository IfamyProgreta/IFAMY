import { defineStore } from "pinia";
import type { VoiceInfo } from "microsoft-cognitiveservices-speech-sdk";
import {
  AudioConfig,
  SpeakerAudioDestination,
  SpeechConfig,
  SpeechSynthesisOutputFormat,
  ResultReason,
  SpeechSynthesizer,
} from "microsoft-cognitiveservices-speech-sdk";

export const useSpeechStore = defineStore({
  id: "speech",
  state: () => ({
    subscriptionKey: import.meta.env.VITE_TTS_KEY,
    region: import.meta.env.VITE_TTS_REGION || "eastus",
    speechRecognitionLanguage: "zh-CN",
    speechSynthesisLanguage: "zh-CN",
    speechSynthesisVoiceName: "zh-CN-XiaoxiaoNeural",
    isPlaying: false,
    voiceEmotion: "",
    voiceRate: 1,
    voiceConfigDialog: false,
    localName: "kecil",
    styleList: [],
  }),

  persist: {
    enabled: true,
    strategies: [
      {
        storage: localStorage,
        paths: [
          "speechSynthesisLanguage",
          "speechSynthesisVoiceName",
          "localName",
          "voiceRate",
          "voiceEmotion",
        ],
      },
    ],
  },

  getters: {},
  actions: {
    async textToSpeech(text: string) {
      this.isPlaying = true;
      const speechConfig = SpeechConfig.fromSubscription(
        this.subscriptionKey,
        this.region
      );
      speechConfig.speechRecognitionLanguage = this.speechRecognitionLanguage;
      speechConfig.speechSynthesisLanguage = this.speechSynthesisLanguage;
      speechConfig.speechSynthesisVoiceName = this.speechSynthesisVoiceName;

      // Atur format audio keluaran
      speechConfig.speechSynthesisOutputFormat =
        SpeechSynthesisOutputFormat.Audio16Khz32KBitRateMonoMp3;

      // Tentukan akhir pemutaran melalui acara akhir pemutaran
      const player = new SpeakerAudioDestination();
      player.onAudioStart = function (_) {
        // Setel ke true sebelum memulai sintesis ucapan
      };
      let _this = this;
      player.onAudioEnd = function (_) {
        _this.isPlaying = false;
        console.log("playback finished");
      };

      const audioConfiga = AudioConfig.fromSpeakerOutput(player);

      // Buat penyintesis ucapan
      const synthesizer = new SpeechSynthesizer(speechConfig, audioConfiga);

      // Ubah teks menjadi ucapan
      try {
        const result = await new Promise((resolve, reject) => {
          synthesizer.speakTextAsync(
            text,
            (speechResult) => {
              if (
                speechResult.reason === ResultReason.SynthesizingAudioCompleted
              ) {
                resolve(speechResult);
              } else {
                _this.isPlaying = false;
                reject(
                  new Error(
                    `Speech synthesis failed with reason: ${speechResult.reason}`
                  )
                );
              }
            },
            (error) => {
              _this.isPlaying = false;
              reject(error);
            }
          );
        });

        // Memproses hasil sintesis ucapan, seperti memutar audio atau mengirimkannya ke klien
        console.log("Text-to-speech synthesis result:", result);
      } catch (error) {
        _this.isPlaying = false;
        console.error("Error during text-to-speech synthesis:", error);
      } finally {
        // Matikan penyintesis ucapan untuk mengosongkan sumber daya
        synthesizer.close();
      }
    },

    async ssmlToSpeak(text: string) {
      this.isPlaying = true;
      const speechConfig = SpeechConfig.fromSubscription(
        this.subscriptionKey,
        this.region
      );
      speechConfig.speechRecognitionLanguage = this.speechRecognitionLanguage;
      speechConfig.speechSynthesisLanguage = this.speechSynthesisLanguage;
      speechConfig.speechSynthesisVoiceName = this.speechSynthesisVoiceName;

      // Atur format audio keluaran
      speechConfig.speechSynthesisOutputFormat =
        SpeechSynthesisOutputFormat.Audio16Khz32KBitRateMonoMp3;

      // Tentukan akhir pemutaran melalui acara akhir pemutaran
      const player = new SpeakerAudioDestination();
      player.onAudioStart = function (_) {
      // Setel ke true sebelum memulai sintesis ucapan
      };
      let _this = this;
      player.onAudioEnd = function (_) {
        _this.isPlaying = false;
        console.log("playback finished");
      };

      const audioConfiga = AudioConfig.fromSpeakerOutput(player);

      // Buat penyintesis ucapan
      const synthesizer = new SpeechSynthesizer(speechConfig, audioConfiga);

      // Bangun SSML berdasarkan sentimen yang diinginkan
      const ssml = `
      <speak version="1.0" xmlns="http://www.w3.org/2001/10/synthesis" xmlns:mstts="https://www.w3.org/2001/mstts" xml:lang="${this.speechSynthesisLanguage}">
      <voice name="${this.speechSynthesisVoiceName}">
        <mstts:express-as type="${this.voiceEmotion}">
          <prosody rate="${this.voiceRate}">
            ${text}
          </prosody>
        </mstts:express-as>
      </voice>
    </speak>`;

      // Ubah ssml menjadi ucapan
      try {
        const result = await new Promise((resolve, reject) => {
          synthesizer.speakSsmlAsync(
            ssml,
            (speechResult) => {
              if (
                speechResult.reason === ResultReason.SynthesizingAudioCompleted
              ) {
                resolve(speechResult);
              } else {
                reject(
                  new Error(
                    `Speech synthesis failed with reason: ${speechResult.reason}`
                  )
                );
              }
            },
            (error) => {
              reject(error);
            }
          );
        });

      // Memproses hasil sintesis ucapan, seperti memutar audio atau mengirimkannya ke klien
        console.log("Text-to-speech synthesis result:", result);
      } catch (error) {
        console.error("Error during text-to-speech synthesis:", error);
      } finally {
      // Matikan penyintesis ucapan untuk mengosongkan sumber daya
        synthesizer.close();
      }
    },

    updateVoiceInfo(voiceInfo: VoiceInfo) {
      this.speechSynthesisVoiceName = voiceInfo.shortName;
      this.speechSynthesisLanguage = voiceInfo.locale;
      this.localName = voiceInfo.localName;
      if (voiceInfo?.styleList && voiceInfo.styleList.length > 0) {
        if (this.styleList.includes(this.voiceEmotion)) {
          return;
        } else {
          this.voiceEmotion = voiceInfo.styleList[0];
        }
      } else {
        this.styleList = [];
        this.voiceEmotion = "";
      }
    },
  },
});
