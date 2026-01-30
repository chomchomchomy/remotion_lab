import asyncio
import edge_tts
import os

topics = [
    {
        "id": "sbnr_hook",
        "text": "まだ、スマホから一日を始めてる？心が整う、最高の朝の儀式を教えるね。"
    },
    {
        "id": "sbnr_ritual1",
        "text": "一つ目。朝一番の、静寂を飲む。何も考えず、ただ今の自分を感じる。それだけで心は満たされる。"
    },
    {
        "id": "sbnr_ritual2",
        "text": "二つ目。窓を開け、光と呼吸を合わせる。太陽の光は、あなたの魂を磨く天然のサプリメント。"
    },
    {
        "id": "sbnr_ritual3",
        "text": "三つ目。自分を祝う、一杯の白湯。今日という奇跡を、丁寧な一口から始める。"
    },
    {
        "id": "sbnr_closing",
        "text": "今日は、あなたという光を放とう。保存して、明日の朝から始めてみてね。"
    }
]

VOICE = "ja-JP-NanamiNeural"

async def generate_voices():
    if not os.path.exists("public"):
        os.makedirs("public")
        
    for topic in topics:
        print(f"Generating {topic['id']}...")
        output_path = f"public/{topic['id']}.mp3"
        communicate = edge_tts.Communicate(topic['text'], VOICE)
        await communicate.save(output_path)
    print("SBNR voices generated!")

if __name__ == "__main__":
    asyncio.run(generate_voices())
