from mutagen.mp3 import MP3
import os

files = ["sbnr_hook.mp3", "sbnr_ritual1.mp3", "sbnr_ritual2.mp3", "sbnr_ritual3.mp3", "sbnr_closing.mp3"]

for file in files:
    path = os.path.join("public", file)
    if os.path.exists(path):
        audio = MP3(path)
        print(f"{file}: {audio.info.length}")
    else:
        print(f"{file} not found")
