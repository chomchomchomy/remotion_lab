const { getAudioDurationInSeconds } = require("@remotion/media-utils");
const path = require("path");

async function main() {
    const files = ["sbnr_hook.mp3", "sbnr_ritual1.mp3", "sbnr_ritual2.mp3", "sbnr_ritual3.mp3", "sbnr_closing.mp3"];
    for (const file of files) {
        const filePath = path.join(process.cwd(), "public", file);
        try {
            const duration = await getAudioDurationInSeconds(filePath);
            console.log(`${file}: ${duration}`);
        } catch (e) {
            console.error(`Error for ${file}:`, e);
        }
    }
}

main();
