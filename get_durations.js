const { getAudioDurationInSeconds } = require("@remotion/media-utils");
const path = require("path");

async function main() {
    const files = ["london_intro.mp3", "london_topic1.mp3", "london_topic2.mp3"];
    for (const file of files) {
        const filePath = path.join(__dirname, "public", file);
        try {
            const duration = await getAudioDurationInSeconds(filePath);
            console.log(`${file}: ${duration}`);
        } catch (e) {
            console.error(`Error for ${file}:`, e);
        }
    }
}

main();
