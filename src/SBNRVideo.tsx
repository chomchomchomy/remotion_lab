import { AbsoluteFill, interpolate, useCurrentFrame, useVideoConfig, spring, Easing, Series, Audio, staticFile } from 'remotion';
import React from 'react';

// --- Components ---

const Subtitles: React.FC<{ text: string, currentFrame: number, fps: number }> = ({ text, currentFrame, fps }) => {
    // Split text into characters for Japanese high-paced animation
    const chars = text.split('');
    const charDuration = 3;

    return (
        <div style={{
            position: 'absolute',
            bottom: 250,
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexWrap: 'wrap',
            padding: '0 50px',
            zIndex: 100
        }}>
            {chars.map((char, i) => {
                const startFrame = i * charDuration;
                const isCurrent = currentFrame >= startFrame && currentFrame < startFrame + charDuration;

                const spr = spring({
                    frame: currentFrame - startFrame,
                    fps,
                    config: { stiffness: 200, damping: 10 }
                });

                if (currentFrame < startFrame) return null;

                return (
                    <span key={i} style={{
                        fontSize: 90,
                        fontWeight: '900',
                        color: isCurrent ? '#FFD700' : 'white',
                        transform: `scale(${isCurrent ? spr : 1})`,
                        textShadow: '0 0 20px rgba(0,0,0,0.8)',
                    }}>
                        {char}
                    </span>
                );
            })}
        </div>
    );
};

const GlassCard: React.FC<{ title: string, content: string, frame: number, fps: number }> = ({ title, content, frame, fps }) => {
    const spr = spring({
        frame,
        fps,
        config: { stiffness: 100, damping: 20 }
    });

    return (
        <div style={{
            background: 'rgba(255, 255, 255, 0.1)',
            backdropFilter: 'blur(10px)',
            borderRadius: 30,
            padding: 40,
            border: '1px solid rgba(255, 255, 255, 0.2)',
            width: '80%',
            opacity: spr,
            transform: `translateY(${interpolate(spr, [0, 1], [50, 0])}px)`,
        }}>
            <h2 style={{ fontSize: 40, color: '#fff', marginBottom: 20, fontWeight: '700' }}>{title}</h2>
            <p style={{ fontSize: 24, color: 'rgba(255,255,255,0.8)', lineHeight: 1.6 }}>{content}</p>
        </div>
    );
};

const Particles: React.FC<{ count: number }> = ({ count }) => {
    const frame = useCurrentFrame();
    return (
        <AbsoluteFill>
            {Array.from({ length: count }).map((_, i) => {
                const x = (i * 137) % 100;
                const y = (i * 149) % 100;
                const size = (i * 3) % 4 + 1;
                const delay = (i * 5);
                const opacity = interpolate(Math.sin((frame + delay) / 50), [-1, 1], [0.1, 0.4]);
                return (
                    <div key={i} style={{
                        position: 'absolute',
                        left: `${x}%`,
                        top: `${y}%`,
                        width: size,
                        height: size,
                        borderRadius: '50%',
                        backgroundColor: '#fff',
                        opacity,
                        filter: 'blur(1px)',
                    }} />
                );
            })}
        </AbsoluteFill>
    );
};

const LightSweep: React.FC = () => {
    const frame = useCurrentFrame();
    const { width } = useVideoConfig();
    const x = interpolate(frame % 90, [0, 90], [-width, width * 2]);
    return (
        <div style={{
            position: 'absolute',
            top: 0,
            bottom: 0,
            left: x,
            width: 200,
            background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.05), transparent)',
            transform: 'skewX(-20deg)',
            pointerEvents: 'none'
        }} />
    );
};

const Scene: React.FC<{
    title: string,
    subtitle: string,
    imageName: string,
    audioSrc: string,
    durationInFrames: number,
    fps: number,
    bgGradient: string
}> = ({ title, subtitle, imageName, audioSrc, durationInFrames, fps, bgGradient }) => {
    const frame = useCurrentFrame();

    // Ken Burns Effect
    const scale = interpolate(frame, [0, durationInFrames], [1, 1.2], {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp'
    });

    const opacity = interpolate(frame, [0, 15, durationInFrames - 15, durationInFrames], [0, 1, 1, 0]);

    return (
        <AbsoluteFill style={{ opacity }}>
            {/* Background Gradient Fallback */}
            <div style={{
                position: 'absolute',
                inset: 0,
                background: bgGradient,
            }} />

            {/* Background Image/Gradient */}
            <div style={{
                position: 'absolute',
                inset: 0,
                backgroundImage: `url(${staticFile(`/${imageName}.png`)})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                transform: `scale(${scale})`,
                opacity: 0.6
            }} />

            <Particles count={30} />
            <LightSweep />

            {/* Content */}
            <AbsoluteFill style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <div style={{ transform: `scale(${interpolate(frame, [0, 20], [0.95, 1], { extrapolateRight: 'clamp' })})` }}>
                    <GlassCard title={title} content={subtitle} frame={frame} fps={fps} />
                </div>
            </AbsoluteFill>

            <Subtitles text={subtitle} currentFrame={frame} fps={fps} />

            <Audio src={staticFile(`/${audioSrc}`)} />
        </AbsoluteFill>
    );
};

export const SBNRVideo: React.FC = () => {
    const { fps } = useVideoConfig();

    return (
        <AbsoluteFill style={{ backgroundColor: '#000' }}>
            <Series>
                <Series.Sequence durationInFrames={Math.round(8.256 * fps)}>
                    <Scene
                        title="心が整う"
                        subtitle="最高の朝の儀式を教えるね。"
                        imageName="sbnr_hook_v3"
                        audioSrc="sbnr_hook.mp3"
                        durationInFrames={Math.round(8.256 * fps)}
                        fps={fps}
                        bgGradient="radial-gradient(circle, #2d3436 0%, #000000 100%)"
                    />
                </Series.Sequence>
                <Series.Sequence durationInFrames={Math.round(11.496 * fps)}>
                    <Scene
                        title="1. 静寂を飲む"
                        subtitle="何も考えず、ただ今の自分を感じる。"
                        imageName="sbnr_ritual1_v2"
                        audioSrc="sbnr_ritual1.mp3"
                        durationInFrames={Math.round(11.496 * fps)}
                        fps={fps}
                        bgGradient="radial-gradient(circle, #0f2027 0%, #203a43 50%, #2c5364 100%)"
                    />
                </Series.Sequence>
                <Series.Sequence durationInFrames={Math.round(10.848 * fps)}>
                    <Scene
                        title="2. 光と呼吸"
                        subtitle="窓を開け、太陽の光で魂を磨く。"
                        imageName="sbnr_ritual2_v2"
                        audioSrc="sbnr_ritual2.mp3"
                        durationInFrames={Math.round(10.848 * fps)}
                        fps={fps}
                        bgGradient="radial-gradient(circle, #FF8008 0%, #FFC837 100%)"
                    />
                </Series.Sequence>
                <Series.Sequence durationInFrames={Math.round(9.192 * fps)}>
                    <Scene
                        title="3. 一杯の白湯"
                        subtitle="今日という奇跡を、丁寧な一口から。"
                        imageName="sbnr_ritual3_v2"
                        audioSrc="sbnr_ritual3.mp3"
                        durationInFrames={Math.round(9.192 * fps)}
                        fps={fps}
                        bgGradient="radial-gradient(circle, #e6e9f0 0%, #eef1f5 100%)"
                    />
                </Series.Sequence>
                <Series.Sequence durationInFrames={Math.round(7.704 * fps)}>
                    <Scene
                        title="光を放とう"
                        subtitle="保存して、明日の朝から始めてみて。"
                        imageName="sbnr_closing_v2"
                        audioSrc="sbnr_closing.mp3"
                        durationInFrames={Math.round(7.704 * fps)}
                        fps={fps}
                        bgGradient="radial-gradient(circle, #1a2a6c 0%, #b21f1f 50%, #fdbb2d 100%)"
                    />
                </Series.Sequence>
            </Series>

            {/* --- Million Dollar BGM Strategy: Automatic Ducking --- */}
            <Audio
                src={staticFile("/Sunrise in Paris - Dan Henig.mp3")}
                volume={(f) => {
                    // Base volume for a "Luxury" feel
                    const baseVolume = 0.4;
                    const duckedVolume = 0.08;

                    // Simple ducking logic: if we are in a sequence that has voice, duck it.
                    // This can be refined by checking exact frames, but for SBNR,
                    // a smooth low volume throughout with slight lifts in "gaps" is better.
                    return interpolate(
                        Math.sin(f / 100), // Subtle breathing volume
                        [-1, 1],
                        [duckedVolume, duckedVolume * 1.2]
                    );
                }}
                loop
            />
        </AbsoluteFill>
    );
};
