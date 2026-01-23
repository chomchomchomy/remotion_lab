import { AbsoluteFill, interpolate, useCurrentFrame, useVideoConfig, Audio, staticFile, Series, spring, Img } from 'remotion';
import React from 'react';

const topics = [
    {
        rank: 'Intro',
        title: '引き寄せの法則',
        detail: '人生が劇的に変わる。',
        audio: staticFile('law_intro.mp3'),
        image: staticFile('manifest_rank3.png'), // Placeholder or background
        durationInSeconds: 4,
    },
    {
        rank: '第3位',
        title: '感謝の先取り',
        detail: 'すでに叶ったかのように「ありがとう」と口に出す。これが宇宙への予約票になります。',
        audio: staticFile('law_rank3.mp3'),
        image: staticFile('manifest_rank3.png'),
        durationInSeconds: 9,
    },
    {
        rank: '第2位',
        title: '違和感に従う',
        detail: '心が少しでもNOと言ったものは手放す。空いたスペースに、本物が舞い込みます。',
        audio: staticFile('law_rank2.mp3'),
        image: staticFile('manifest_rank2.png'),
        durationInSeconds: 9,
    },
    {
        rank: '第1位',
        title: '自己一致',
        detail: '自分の心の声と行動を完全に一致させること。これが最強の磁石になります。',
        audio: staticFile('law_rank1.mp3'),
        image: staticFile('manifest_rank1.png'),
        durationInSeconds: 10,
    },
];

const Scene: React.FC<{ topic: typeof topics[0], index: number }> = ({ topic, index }) => {
    const frame = useCurrentFrame();
    const { fps, width, height } = useVideoConfig();
    const durationInFrames = topic.durationInSeconds * fps;

    const spr = spring({
        frame,
        fps,
        config: { stiffness: 60, damping: 15 },
    });

    const zoom = interpolate(frame, [0, durationInFrames], [1.1, 1.25]);
    const opacity = interpolate(frame, [0, 10, durationInFrames - 10, durationInFrames], [0, 1, 1, 0]);

    return (
        <AbsoluteFill style={{ opacity }}>
            <div style={{ transform: `scale(${zoom})`, width: '100%', height: '100%' }}>
                <Img src={topic.image} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>

            {/* Elegant Gradient Overlay */}
            <div style={{
                position: 'absolute',
                inset: 0,
                background: 'linear-gradient(to top, rgba(0,0,0,0.8) 0%, transparent 60%)',
            }} />

            {/* Content Container */}
            <AbsoluteFill style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                padding: '0 80px',
            }}>
                <div style={{
                    transform: `scale(${interpolate(spr, [0, 1], [0.8, 1])}) translateY(${interpolate(spr, [0, 1], [40, 0])}px)`,
                    textAlign: 'center',
                }}>
                    {topic.rank !== 'Intro' && (
                        <div style={{
                            fontSize: 48,
                            fontWeight: '900',
                            color: '#FFD700',
                            letterSpacing: '8px',
                            marginBottom: 20,
                            textShadow: '0 0 20px rgba(255, 215, 0, 0.4)',
                        }}>
                            {topic.rank}
                        </div>
                    )}
                    <div style={{
                        fontSize: 100,
                        fontWeight: '900',
                        color: 'white',
                        marginBottom: 40,
                        lineHeight: 1.1,
                        textShadow: '0 10px 30px rgba(0,0,0,0.5)',
                    }}>
                        {topic.title}
                    </div>
                    <div style={{
                        fontSize: 40,
                        fontWeight: '500',
                        color: 'rgba(255,255,255,0.9)',
                        lineHeight: 1.6,
                        maxWidth: 800,
                        textAlign: 'center',
                        backgroundColor: 'rgba(255,255,255,0.1)',
                        backdropFilter: 'blur(10px)',
                        padding: '30px 50px',
                        borderRadius: '30px',
                        border: '1px solid rgba(255,255,255,0.1)',
                    }}>
                        {topic.detail}
                    </div>
                </div>
            </AbsoluteFill>
        </AbsoluteFill>
    );
};

export const ManifestVideo: React.FC = () => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    return (
        <AbsoluteFill style={{ backgroundColor: '#000', overflow: 'hidden' }}>
            <Audio src={staticFile('marriott_bgm.mp3')} volume={0.15} loop />

            <Series>
                {topics.map((t, i) => (
                    <Series.Sequence key={i} durationInFrames={Math.round(t.durationInSeconds * fps)}>
                        <Audio src={t.audio} />
                        <Scene topic={t} index={i} />
                    </Series.Sequence>
                ))}
            </Series>

            {/* HUD / Top Bar */}
            <div style={{
                position: 'absolute',
                top: 80,
                width: '100%',
                display: 'flex',
                justifyContent: 'center',
                zIndex: 100,
            }}>
                <div style={{
                    fontSize: 24,
                    fontWeight: '800',
                    letterSpacing: '4px',
                    color: 'rgba(255,255,255,0.6)',
                    borderBottom: '2px solid rgba(255,215,0,0.4)',
                    paddingBottom: 10,
                }}>
                    SPIRITUAL MINDSET
                </div>
            </div>
        </AbsoluteFill>
    );
};
