import asyncio
import edge_tts
import os

topics = [
    {
        "id": "re_intro",
        "text": "東京の空を、あなたのリビングに。THE HERITAGE 麻布台。"
    },
    {
        "id": "re_feature1",
        "text": "180度のパノラマビュー。移ろう四季と都会の灯りを、特等席で。"
    },
    {
        "id": "re_feature2",
        "text": "細部まで計算されたミニマリズム。ここは、美意識が呼吸する場所。"
    },
    {
        "id": "re_cta",
        "text": "限定3邸。静謐という名の贅沢を。詳細はプロフィールから。"
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
    print("Real estate voices generated!")

if __name__ == "__main__":
    asyncio.run(generate_voices())
