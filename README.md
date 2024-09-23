## Bazzinga Cooper

````markdown
# Bazzinga Cooper

Bazzinga Cooper is a web application that allows users to transcribe audio files from their microphone or upload MP3 files, and translate the transcription into more than 100 languages. All transcription and translation processes happen directly in the user's browser using machine learning models, without relying on external APIs.

## Features

- **Audio Input**: Users can either record audio using their microphone or upload an MP3 file.
- **Transcription**: Converts speech from the audio input into text using the machine learning model **"openai/whisper-tTiny.en"**, available on Hugging Face.
- **Translation**: The transcribed text can be translated into 100+ languages using the **"Xenova/nllb-200-distilled-600M"** model, also available on Hugging Face.
- **User-Friendly Interface**: Intuitive design to ensure smooth user experience.
- **No API Usage**: All processes are handled locally in the browser using machine learning models, ensuring privacy and no reliance on third-party services.

## How It Works

1. **Audio Input**:
   - Record audio using the mic or upload an MP3 file.
2. **Transcription**:

   - The audio is processed using the **"openai/whisper-tiny.en"** model in the browser to convert spoken words into text.

3. **Translation**:
   - The transcription is translated into any supported language using the **"Xenova/nllb-200-distilled-600M"** model, without making any API calls.

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/bazzinga-cooper.git
   ```
````

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the application:

   ```bash
   npm start
   ```

## Usage

1. Open the application in your browser.
2. Select the audio input method (microphone or file upload).
3. Click the "Transcribe" button to get the text version of the audio.
4. Choose the desired language for translation, and the application will provide the translated text.

## Technologies Used

- **Frontend**: React, Tailwind CSS
- **Machine Learning Models**:
  - Transcription: [openai/whisper-tiny.en](https://huggingface.co/openai/whisper-tiny.en)
  - Translation: [Xenova/nllb-200-distilled-600M](https://huggingface.co/Xenova/nllb-200-distilled-600M)
- **Speech Recognition & Translation**: Handled locally using these models

## Contributing

Feel free to submit issues or pull requests. For major changes, please open an issue first to discuss what you would like to change.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

### Demo

You can view a live demo of the project [here](https://ryomenusukuna.github.io/bazzinga-cooper/).

```

May the Force Be With You
```
