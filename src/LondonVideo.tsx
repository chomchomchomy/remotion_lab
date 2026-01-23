import { AbsoluteFill, interpolate, useCurrentFrame, useVideoConfig, Audio, staticFile, Series, spring, Img } from 'remotion';
import React from 'react';

const topics = [
    {
        title: 'Gaslight Streets',
        detail: '19世紀、霧に包まれたロンドン。産業革命の鼓動と、路地裏に潜む影が交差する時代。',
        audio: staticFile('london_intro.mp3'),
        image: staticFile('london_19th_street_cinematic_1769132353089.png'),
        durationInSeconds: 12,
    },
    {
        title: 'Victorian Shadows',
        detail: 'ガス灯が照らす石畳の道。馬車の音が響き、紳士と労働者が行き交う、光と闇の境界線。',
        audio: staticFile('london_topic1.mp3'),
        image: staticFile('london_clock_tower_silhouette_1769132369141.png'),
        durationInSeconds: 12,
    },
    {
        title: 'Industrial Heart',
        detail: 'テムズ川のほとり、立ち並ぶ煙突。絶え間なく吐き出される煙は、大英帝国の繁栄と代償を物語っています。',
        audio: staticFile('london_topic2.mp3'),
        image: staticFile('victorian_industrial_dock_1769132383050.png'),
        durationInSeconds: 14,
    },
];

const FogOverlay: React.FC = () => {
    const frame = useCurrentFrame();
    return (
        <AbsoluteFill style={{ overflow: 'hidden', pointerEvents: 'none' }}>
            <div style={{
                position: 'absolute',
                width: '200%',
                height: '100%',
                background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.05) 50%, transparent 100%)',
                transform: `translateX(${(frame % 500) * -1}px)`,
                filter: 'blur(50px)',
            }} />
        </AbsoluteFill>
    );
};

const LondonScene: React.FC<{ topic: typeof topics[0], index: number }> = ({ topic, index }) => {
    const frame = useCurrentFrame();
    const { fps, width, height } = useVideoConfig();
    const durationInFrames = topic.durationInSeconds * fps;

    const spr = spring({
        frame,
        fps,
        config: { stiffness: 40, damping: 12 },
    });

    const zoom = interpolate(frame, [0, durationInFrames], [1, 1.15]);
    const pan = interpolate(frame, [0, durationInFrames], [0, -40]);
    const opacity = interpolate(frame, [0, 15, durationInFrames - 15, durationInFrames], [0, 1, 1, 0]);

    return (
        <AbsoluteFill style={{ opacity }}>
            {/* Background Image with Parallax */}
            <div style={{ transform: `scale(${zoom}) translateX(${pan}px)`, width: '100%', height: '100%' }}>
                <Img src={topic.image} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>

            {/* Dark Vignette Overlay */}
            <div style={{
                position: 'absolute',
                inset: 0,
                background: 'radial-gradient(circle, transparent 40%, rgba(0,0,0,0.8) 100%)',
            }} />

            <FogOverlay />

            {/* Content Card (Glassmorphism) */}
            <div style={{
                position: 'absolute',
                bottom: 120,
                left: 100,
                right: 100,
                display: 'flex',
                justifyContent: 'center',
                transform: `translateY(${interpolate(spr, [0, 1], [50, 0])}px)`,
            }}>
                <div style={{
                    backgroundColor: 'rgba(0,0,0,0.6)',
                    backdropFilter: 'blur(15px)',
                    padding: '50px 70px',
                    borderRadius: '20px',
                    border: '1px solid rgba(255, 215, 0, 0.2)', // Gold border
                    textAlign: 'center',
                    maxWidth: 1400,
                    boxShadow: '0 30px 60px rgba(0,0,0,0.5)',
                }}>
                    <div style={{
                        fontFamily: '"Cinzel", serif',
                        fontSize: 24,
                        color: '#D4AF37', // Metallic Gold
                        letterSpacing: '8px',
                        marginBottom: 20,
                        textTransform: 'uppercase',
                        fontWeight: '700',
                    }}>
                        Chapter {index + 1}
                    </div>
                    <div style={{
                        fontFamily: '"Cinzel", serif',
                        fontSize: 84,
                        fontWeight: '900',
                        marginBottom: 30,
                        color: '#f3f4f6',
                        textShadow: '0 5px 15px rgba(0,0,0,0.8)',
                    }}>
                        {topic.title}
                    </div>
                    <div style={{
                        fontSize: 34,
                        lineHeight: 1.6,
                        color: '#d1d5db',
                        fontWeight: '500',
                        maxWidth: 1000,
                        margin: '0 auto',
                        fontStyle: 'italic',
                    }}>
                        {topic.detail}
                    </div>
                </div>
            </div>
        </AbsoluteFill>
    );
};

export const LondonVideo: React.FC = () => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    return (
        <AbsoluteFill style={{ backgroundColor: '#000', fontFamily: 'serif' }}>
            <Audio src={staticFile('bgm.mp3')} volume={0.1} loop />

            <Series>
                {topics.map((t, i) => (
                    <Series.Sequence key={i} durationInFrames={Math.round(t.durationInSeconds * fps)}>
                        <Audio src={t.audio} />
                        <LondonScene topic={t} index={i} />
                    </Series.Sequence>
                ))}
            </Series>

            {/* Frame Decoration (Classic Victorian Border) */}
            <div style={{
                position: 'absolute',
                inset: 40,
                border: '2px solid rgba(212, 175, 55, 0.3)',
                pointerEvents: 'none',
                zIndex: 100,
            }} />

            {/* Stamp Style Title */}
            <div style={{
                position: 'absolute',
                top: 80,
                left: 0,
                right: 0,
                display: 'flex',
                justifyContent: 'center',
                zIndex: 100,
                pointerEvents: 'none',
            }}>
                <div style={{
                    fontFamily: '"Cinzel", serif',
                    fontSize: 28,
                    color: '#D4AF37',
                    padding: '10px 40px',
                    border: '1px solid #D4AF37',
                    backgroundColor: 'rgba(0,0,0,0.4)',
                    letterSpacing: '4px',
                }}>
                    LONDON • 1888
                </div>
            </div>
        </AbsoluteFill>
    );
};
