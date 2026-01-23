import asyncio
import edge_tts
import os

topics = [
    {
        "id": "intro",
        "text": "本日のダイジェストニュースです。"
    },
    {
        "id": "topic1",
        "text": "最初のトピック、財政赤字の拡大についてです。2026年度の基礎的財政収支は8000億円の赤字見通しとなり、当初の黒字予想から悪化しました。"
    },
    {
        "id": "topic2",
        "text": "次に、新党、中道改革同盟、の結成です。1月22日に結党大会を開催し、2月8日の衆議院選挙に向けた勢力拡大を目指しています。"
    },
    {
        "id": "topic3",
        "text": "最後に、柏崎刈羽原発6号機の再稼働です。14年ぶりに再稼働プロセスが開始され、電力供給の安定化に向けた大きな一歩となります。"
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
    print("All voices generated!")

if __name__ == "__main__":
    asyncio.run(generate_voices())
