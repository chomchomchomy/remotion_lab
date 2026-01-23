import { AbsoluteFill, interpolate, useCurrentFrame, useVideoConfig, spring, Easing } from 'remotion';
import React from 'react';

const CubeSide: React.FC<{
    rotation: string,
    color: string,
    content: React.ReactNode
}> = ({ rotation, color, content }) => {
    return (
        <div style={{
            position: 'absolute',
            width: 500,
            height: 500,
            background: color,
            border: '2px solid rgba(255,255,255,0.2)',
            transform: rotation,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            backfaceVisibility: 'hidden',
            boxShadow: 'inset 0 0 50px rgba(0,0,0,0.5)',
            overflow: 'hidden'
        }}>
            {content}
        </div>
    );
};

const Particles: React.FC = () => {
    const frame = useCurrentFrame();
    const particles = Array.from({ length: 50 });
    return (
        <AbsoluteFill>
            {particles.map((_, i) => {
                const x = (i * 137) % 100;
                const y = (i * 149) % 100;
                const size = (i * 7) % 10 + 2;
                const delay = (i * 10);
                const opacity = interpolate(Math.sin((frame + delay) / 30), [-1, 1], [0.1, 0.5]);
                return (
                    <div key={i} style={{
                        position: 'absolute',
                        left: `${x}%`,
                        top: `${y}%`,
                        width: size,
                        height: size,
                        borderRadius: '50%',
                        backgroundColor: '#7aa2f7',
                        opacity,
                        filter: 'blur(2px)',
                    }} />
                );
            })}
        </AbsoluteFill>
    );
};

export const Cinematic3DVideo: React.FC = () => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    // Global camera rotation
    const rotationY = frame * 0.5;
    const rotationX = Math.sin(frame / 60) * 10;

    // Floating movement
    const floatY = Math.sin(frame / 40) * 30;

    // Transition effect for content
    const spr = spring({
        frame,
        fps,
        config: { stiffness: 40, damping: 10 },
    });

    const scale = interpolate(spr, [0, 1], [0, 1]);

    return (
        <AbsoluteFill style={{
            backgroundColor: '#020617',
            perspective: '1500px',
            overflow: 'hidden'
        }}>
            <Particles />

            {/* Background Nebula Glow */}
            <div style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                width: 1500,
                height: 1500,
                background: 'radial-gradient(circle, rgba(67, 56, 202, 0.15) 0%, transparent 70%)',
                transform: 'translate(-50%, -50%)',
                filter: 'blur(100px)',
            }} />

            {/* The 3D Cube Container */}
            <div style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                width: 500,
                height: 500,
                marginLeft: -250,
                marginTop: -250,
                transformStyle: 'preserve-3d',
                transform: `translateY(${floatY}px) rotateX(${rotationX}deg) rotateY(${rotationY}deg) scale(${scale})`,
            }}>
                {/* Front */}
                <CubeSide
                    rotation="translateZ(250px)"
                    color="rgba(30, 41, 59, 0.9)"
                    content={
                        <div style={{ textAlign: 'center', padding: 40 }}>
                            <div style={{ fontSize: 40, fontWeight: '900', color: '#7aa2f7', marginBottom: 20 }}>INNOVATION</div>
                            <div style={{ fontSize: 20, color: '#94a3b8' }}>Pushing boundaries of what is possible.</div>
                        </div>
                    }
                />
                {/* Back */}
                <CubeSide
                    rotation="rotateY(180deg) translateZ(250px)"
                    color="rgba(15, 23, 42, 0.9)"
                    content={
                        <div style={{ fontSize: 60, fontWeight: '900', color: '#f43f5e' }}>FUTURE</div>
                    }
                />
                {/* Right */}
                <CubeSide
                    rotation="rotateY(90deg) translateZ(250px)"
                    color="rgba(31, 41, 55, 0.9)"
                    content={
                        <div style={{ fontSize: 50, fontWeight: '900', color: '#10b981' }}>CODE</div>
                    }
                />
                {/* Left */}
                <CubeSide
                    rotation="rotateY(-90deg) translateZ(250px)"
                    color="rgba(17, 24, 39, 0.9)"
                    content={
                        <div style={{ fontSize: 50, fontWeight: '900', color: '#f59e0b' }}>DESIGN</div>
                    }
                />
                {/* Top */}
                <CubeSide
                    rotation="rotateX(90deg) translateZ(250px)"
                    color="rgba(2, 6, 23, 0.9)"
                    content={
                        <div style={{ fontSize: 40, fontWeight: '900', color: '#8b5cf6' }}>STRATEGY</div>
                    }
                />
                {/* Bottom */}
                <CubeSide
                    rotation="rotateX(-90deg) translateZ(250px)"
                    color="rgba(0, 0, 0, 0.9)"
                    content={
                        <div style={{ fontSize: 40, fontWeight: '900', color: '#ffffff' }}>ANTIGRAVITY</div>
                    }
                />

                {/* Internal Glow Effect */}
                <div style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'radial-gradient(circle, rgba(122, 162, 247, 0.4) 0%, transparent 60%)',
                    transform: 'translateZ(0px)',
                    filter: 'blur(30px)',
                }} />
            </div>

            {/* Floating UI Elements */}
            <div style={{
                position: 'absolute',
                top: 100,
                left: 100,
                fontSize: 24,
                fontWeight: '900',
                color: '#7aa2f7',
                letterSpacing: 4,
                opacity: 0.6,
                borderLeft: '4px solid #7aa2f7',
                paddingLeft: 20
            }}>
                3D ENGINE V2.0
            </div>

            <div style={{
                position: 'absolute',
                bottom: 100,
                right: 100,
                textAlign: 'right'
            }}>
                <div style={{ fontSize: 60, fontWeight: '900', color: 'white', opacity: 0.1, marginBottom: -20 }}>NEXTGEN</div>
                <div style={{ fontSize: 24, fontWeight: '500', color: '#94a3b8' }}>Cinematic Motion Systems</div>
            </div>
        </AbsoluteFill>
    );
};
