import { AbsoluteFill, interpolate, useCurrentFrame, useVideoConfig, Audio, staticFile, Series, spring, Img } from 'remotion';
import React from 'react';

const topics = [
    {
        rank: 'Intro',
        title: '心を整える',
        detail: '人生を劇的に変える、引き寄せの法則。',
        audio: staticFile('law_intro.mp3'),
        image: staticFile('re_living.png'),
        durationInSeconds: 6,
    },
    {
        rank: '第3位',
        title: '感謝の先取り',
        detail: 'すでに叶ったかのように「ありがとう」と口に出す。\nこれが宇宙への予約票になります。',
        audio: staticFile('law_rank3.mp3'),
        image: staticFile('re_bedroom.png'),
        durationInSeconds: 12,
    },
    {
        rank: '第2位',
        title: '違和感に従う',
        detail: '心が少しでもNOと言ったものは手放す。\n空いたスペースに、本物が舞い込みます。',
        audio: staticFile('law_rank2.mp3'),
        image: staticFile('victorian_industrial_dock_1769132383050.png'), // Using a moody one, fallback
        durationInSeconds: 12,
    },
    {
        rank: '第1位',
        title: '自己一致',
        detail: '自分の心の声と行動を完全に一致させること。\nこれが最強の磁石になります。',
        audio: staticFile('law_rank1.mp3'),
        image: staticFile('london_19th_street_cinematic_1769132353089.png'), // Using a calm one
        durationInSeconds: 12,
    },
];

const MalamaScene: React.FC<{ topic: typeof topics[0], index: number }> = ({ topic, index }) => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();
    const durationInFrames = topic.durationInSeconds * fps;

    // Extremely smooth and slow zoom
    const zoom = interpolate(frame, [0, durationInFrames], [1, 1.08]);

    // Very gentle fade
    const opacity = interpolate(frame, [0, 30, durationInFrames - 30, durationInFrames], [0, 1, 1, 0]);

    // Very subtle pan
    const pan = interpolate(frame, [0, durationInFrames], [0, -20]);

    return (
        <AbsoluteFill style={{ opacity, backgroundColor: '#fdfbf7' }}>
            <div style={{
                transform: `scale(${zoom}) translateX(${pan}px)`,
                width: '100%',
                height: '100%',
                filter: 'sepia(0.2) contrast(0.9) brightness(1.05)', // Malama warm look
            }}>
                <Img src={topic.image} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>

            {/* Soft Warm Overlay */}
            <div style={{
                position: 'absolute',
                inset: 0,
                background: 'linear-gradient(to top, rgba(253, 251, 247, 0.4) 0%, transparent 50%)',
            }} />

            {/* Minimalist Typography */}
            <AbsoluteFill style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                padding: '0 100px',
            }}>
                <div style={{
                    textAlign: 'center',
                }}>
                    {topic.rank !== 'Intro' && (
                        <div style={{
                            fontSize: 32,
                            fontWeight: '300',
                            color: '#7a7a7a',
                            letterSpacing: '12px',
                            marginBottom: 40,
                            fontFamily: 'serif',
                            opacity: interpolate(frame, [20, 50], [0, 1], { extrapolateLeft: 'clamp' }),
                        }}>
                            {topic.rank}
                        </div>
                    )}
                    <div style={{
                        fontSize: 80,
                        fontWeight: '200',
                        color: '#333',
                        marginBottom: 60,
                        letterSpacing: '4px',
                        fontFamily: 'serif',
                        opacity: interpolate(frame, [40, 70], [0, 1], { extrapolateLeft: 'clamp' }),
                        transform: `translateY(${interpolate(frame, [40, 70], [10, 0], { extrapolateLeft: 'clamp' })}px)`,
                    }}>
                        {topic.title}
                    </div>
                    <div style={{
                        fontSize: 36,
                        fontWeight: '300',
                        color: '#555',
                        lineHeight: 2,
                        letterSpacing: '1px',
                        fontFamily: 'serif',
                        whiteSpace: 'pre-wrap',
                        opacity: interpolate(frame, [60, 90], [0, 1], { extrapolateLeft: 'clamp' }),
                    }}>
                        {topic.detail}
                    </div>
                </div>
            </AbsoluteFill>

            {/* Progress line - very thin */}
            <div style={{
                position: 'absolute',
                bottom: 150,
                left: '25%',
                width: '50%',
                height: 1,
                backgroundColor: 'rgba(0,0,0,0.1)',
            }}>
                <div style={{
                    width: `${(frame / durationInFrames) * 100}%`,
                    height: '100%',
                    backgroundColor: 'rgba(0,0,0,0.3)',
                }} />
            </div>
        </AbsoluteFill>
    );
};

export const MalamaManifest: React.FC = () => {
    const { fps } = useVideoConfig();

    return (
        <AbsoluteFill style={{ backgroundColor: '#fdfbf7' }}>
            {/* Soft, calm music */}
            <Audio src={staticFile('malama_bgm.mp3')} volume={0.12} loop />

            <Series>
                {topics.map((t, i) => (
                    <Series.Sequence key={i} durationInFrames={Math.round(t.durationInSeconds * fps)}>
                        <Audio src={t.audio} />
                        <MalamaScene topic={t} index={i} />
                    </Series.Sequence>
                ))}
            </Series>

            {/* Minimalist Watermark */}
            <div style={{
                position: 'absolute',
                top: 100,
                width: '100%',
                textAlign: 'center',
                fontSize: 18,
                fontWeight: '200',
                letterSpacing: '10px',
                color: 'rgba(0,0,0,0.2)',
                textTransform: 'uppercase',
            }}>
                Minimalist Lifestyle
            </div>
        </AbsoluteFill>
    );
};
