import asyncio
import edge_tts
import os

topics = [
    {
        "id": "london_intro",
        "text": "19世紀、霧に包まれたロンドン。産業革命の鼓動と、路地裏に潜む影が交差する時代。"
    },
    {
        "id": "london_topic1",
        "text": "ガス灯が照らす石畳の道。馬車の音が響き、紳士と労働者が行き交う、光と闇の境界線。"
    },
    {
        "id": "london_topic2",
        "text": "テムズ川のほとり、立ち並ぶ煙突。絶え間なく吐き出される煙は、大英帝国の繁栄と代償を物語っています。"
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
    print("London voices generated!")

if __name__ == "__main__":
    asyncio.run(generate_voices())
