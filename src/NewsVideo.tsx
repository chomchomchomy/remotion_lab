import { AbsoluteFill, interpolate, useCurrentFrame, useVideoConfig, Audio, staticFile, Series, spring, Easing } from 'remotion';
import React from 'react';

const topics = [
    {
        title: '財政赤字の拡大',
        detail: '2026年度の基礎的財政収支は8000億円の赤字見通し。当初の黒字予想から悪化。',
        audio: staticFile('topic1.mp3'),
        durationInSeconds: 16,
    },
    {
        title: '新党「中道改革同盟」結成',
        detail: '1月22日に結党大会を開催。2月8日の衆議院選挙に向けた勢力拡大を目指す。',
        audio: staticFile('topic2.mp3'),
        durationInSeconds: 16,
    },
    {
        title: '柏崎刈羽原発 6号機再稼働',
        detail: '14年ぶりに再稼働プロセスを開始。電力供給の安定化に向けた大きな一歩。',
        audio: staticFile('topic3.mp3'),
        durationInSeconds: 15,
    },
];

const introDuration = 3.5;

const Background: React.FC = () => {
    const frame = useCurrentFrame();
    const { width, height } = useVideoConfig();

    return (
        <AbsoluteFill style={{ backgroundColor: '#020617', overflow: 'hidden' }}>
            <div style={{
                position: 'absolute',
                top: -height * 0.2,
                left: -width * 0.2,
                width: width * 0.8,
                height: width * 0.8,
                background: 'radial-gradient(circle, rgba(30, 64, 175, 0.3) 0%, rgba(2, 6, 23, 0) 70%)',
                transform: `translate(${Math.sin(frame / 60) * 100}px, ${Math.cos(frame / 60) * 100}px)`,
            }} />
            <div style={{
                position: 'absolute',
                bottom: -height * 0.2,
                right: -width * 0.2,
                width: width * 0.6,
                height: width * 0.6,
                background: 'radial-gradient(circle, rgba(126, 34, 206, 0.2) 0%, rgba(2, 6, 23, 0) 70%)',
                transform: `translate(${Math.cos(frame / 50) * 80}px, ${Math.sin(frame / 50) * 80}px)`,
            }} />
            <div style={{
                position: 'absolute',
                inset: 0,
                backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.05) 1px, transparent 1px)',
                backgroundSize: '40px 40px',
                opacity: 0.5,
            }} />
        </AbsoluteFill>
    );
};

const IntroText: React.FC = () => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    const entry = spring({
        frame,
        fps,
        config: { stiffness: 100, damping: 10 },
    });

    const exit = spring({
        frame: frame - (introDuration * fps - 20),
        fps,
        config: { stiffness: 100, damping: 20 },
    });

    const scale = interpolate(entry, [0, 1], [0.8, 1]);
    const opacity = interpolate(entry, [0, 1], [0, 1]) - interpolate(exit, [0, 1], [0, 1]);

    return (
        <div style={{
            opacity,
            transform: `scale(${scale})`,
            fontSize: 160,
            fontWeight: '900',
            textAlign: 'center',
            letterSpacing: '-5px',
            textShadow: '0 20px 40px rgba(0,0,0,0.5)',
            background: 'linear-gradient(to bottom, #fff 30%, #94a3b8)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
        }}>
            DAILY<br />NEWS
        </div>
    );
};

const TopicCard: React.FC<{ topic: typeof topics[0], topicIndex: number }> = ({ topic, topicIndex }) => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();
    const durationInFrames = topic.durationInSeconds * fps;
    const spr = spring({
        frame,
        fps,
        config: { stiffness: 60, damping: 12 },
    });
    const exitOpacity = interpolate(frame, [durationInFrames - 15, durationInFrames], [1, 0], { extrapolateLeft: 'clamp' });

    return (
        <div style={{
            opacity: spr * exitOpacity,
            transform: `translateY(${interpolate(spr, [0, 1], [100, 0])}px)`,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            width: '100%',
            perspective: '1000px',
        }}>
            <div style={{
                backgroundColor: 'rgba(255, 255, 255, 0.03)',
                backdropFilter: 'blur(20px)',
                padding: '80px 100px',
                borderRadius: '60px',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                boxShadow: '0 40px 100px rgba(0,0,0,0.6)',
                maxWidth: '1200px',
                textAlign: 'center',
                transform: `rotateX(${interpolate(spr, [0, 1], [15, 0])}deg)`,
            }}>
                <div style={{ fontSize: 24, color: '#fbbf24', fontWeight: '900', textTransform: 'uppercase', letterSpacing: '8px', marginBottom: 40, opacity: 0.8 }}>
                    TOPIC — {topicIndex + 1}
                </div>
                <div style={{ fontSize: 96, fontWeight: '900', marginBottom: 50, lineHeight: 1.1, background: 'linear-gradient(135deg, #ffffff 0%, #cbd5e1 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', textShadow: '0 10px 30px rgba(0,0,0,0.3)' }}>
                    {topic.title}
                </div>
                <div style={{ fontSize: 48, lineHeight: 1.5, color: '#94a3b8', fontWeight: '500', maxWidth: '900px' }}>
                    {topic.detail}
                </div>
            </div>
        </div>
    );
};

export const NewsVideo: React.FC = () => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();
    const time = frame / fps;

    let currentTopicIndex = -1;
    if (time >= introDuration) {
        let accumulatedTime = introDuration;
        for (let i = 0; i < topics.length; i++) {
            if (time < accumulatedTime + topics[i].durationInSeconds) {
                currentTopicIndex = i;
                break;
            }
            accumulatedTime += topics[i].durationInSeconds;
        }
    }

    return (
        <AbsoluteFill style={{ fontFamily: '"Inter", sans-serif', color: 'white' }}>
            <Background />
            <Audio src={staticFile('bgm.mp3')} volume={0.12} loop />
            <div style={{ position: 'absolute', top: 60, width: '100%', display: 'flex', justifyContent: 'space-between', padding: '0 80px', zIndex: 100, alignItems: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
                    <div style={{ width: 12, height: 12, borderRadius: '50%', backgroundColor: '#ef4444', boxShadow: '0 0 15px #ef4444' }} />
                    <span style={{ fontSize: 28, fontWeight: '800', letterSpacing: '2px' }}>LIVE SUMMARY</span>
                </div>
                <div style={{ fontSize: 24, padding: '10px 25px', borderRadius: '15px', backgroundColor: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', fontWeight: '700' }}>
                    2026 / 01 / 23
                </div>
            </div>
            <AbsoluteFill style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <Series>
                    <Series.Sequence durationInFrames={Math.round(introDuration * fps)}>
                        <Audio src={staticFile('intro.mp3')} />
                        <IntroText />
                    </Series.Sequence>
                    {topics.map((t, i) => (
                        <Series.Sequence key={i} durationInFrames={Math.round(t.durationInSeconds * fps)}>
                            <Audio src={t.audio} />
                            <TopicCard topic={t} topicIndex={i} />
                        </Series.Sequence>
                    ))}
                </Series>
            </AbsoluteFill>
            <div style={{ position: 'absolute', bottom: 80, left: 0, right: 0, display: 'flex', justifyContent: 'center', gap: 30, zIndex: 100 }}>
                {topics.map((_, i) => {
                    const active = i === currentTopicIndex;
                    return (
                        <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 15 }}>
                            <div style={{ width: active ? 60 : 16, height: 16, borderRadius: '8px', backgroundColor: active ? '#fbbf24' : 'rgba(255,255,255,0.1)', boxShadow: active ? '0 0 20px rgba(251, 191, 36, 0.4)' : 'none', transition: 'all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)' }} />
                        </div>
                    );
                })}
            </div>
        </AbsoluteFill>
    );
};
