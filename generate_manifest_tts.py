import asyncio
import edge_tts
import os

topics = [
    {
        "id": "law_intro",
        "text": "人生が劇的に変わる。引き寄せの法則、最強ランキングTOP3。"
    },
    {
        "id": "law_rank3",
        "text": "第3位、感謝の先取り。すでに叶ったかのように「ありがとう」と口に出す。これが宇宙への予約票になります。"
    },
    {
        "id": "law_rank2",
        "text": "第2位、違和感に従う。心が少しでもNOと言ったものは手放す。空いたスペースに、本物が舞い込みます。"
    },
    {
        "id": "law_rank1",
        "text": "第1位、自己一致。自分の心の声と行動を完全に一致させること。これが最強の磁石になります。"
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
    print("Manifestation voices generated!")

if __name__ == "__main__":
    asyncio.run(generate_voices())
