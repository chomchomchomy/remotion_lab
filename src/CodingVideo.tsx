import { AbsoluteFill, interpolate, useCurrentFrame, useVideoConfig, spring, Easing } from 'remotion';
import React from 'react';

const Window: React.FC<{ children: React.ReactNode; title: string; frame: number }> = ({ children, title, frame }) => {
    const { fps } = useVideoConfig();

    // Scale up and rotate into view
    const entry = spring({
        frame,
        fps,
        config: { stiffness: 60, damping: 10 },
    });

    const rotationY = interpolate(entry, [0, 1], [45, 0]);
    const rotationX = interpolate(entry, [0, 1], [-10, 0]);
    const scale = interpolate(entry, [0, 1], [0.5, 1]);
    const opacity = interpolate(entry, [0, 1], [0, 1]);

    return (
        <div style={{
            opacity,
            transform: `perspective(1000px) rotateY(${rotationY}deg) rotateX(${rotationX}deg) scale(${scale})`,
            width: 800,
            height: 500,
            backgroundColor: '#1a1b26', // Tokyo Night Dark
            borderRadius: '12px',
            overflow: 'hidden',
            boxShadow: '0 30px 60px rgba(0,0,0,0.5)',
            border: '1px solid rgba(255,255,255,0.1)',
            display: 'flex',
            flexDirection: 'column',
        }}>
            {/* Title Bar */}
            <div style={{
                height: 40,
                backgroundColor: '#24283b',
                display: 'flex',
                alignItems: 'center',
                padding: '0 15px',
                gap: '8px',
            }}>
                <div style={{ width: 12, height: 12, borderRadius: '50%', backgroundColor: '#ff5f56' }} />
                <div style={{ width: 12, height: 12, borderRadius: '50%', backgroundColor: '#ffbd2e' }} />
                <div style={{ width: 12, height: 12, borderRadius: '50%', backgroundColor: '#27c93f' }} />
                <div style={{
                    flex: 1,
                    textAlign: 'center',
                    color: '#a9b1d6',
                    fontSize: 14,
                    fontFamily: 'monospace',
                    marginRight: 40 // Offset for the buttons
                }}>
                    {title}
                </div>
            </div>
            {/* Body */}
            <div style={{
                flex: 1,
                padding: 20,
                color: '#c0caf5',
                fontFamily: '"Fira Code", monospace',
                fontSize: 18,
                lineHeight: 1.5,
                whiteSpace: 'pre-wrap'
            }}>
                {children}
            </div>
        </div>
    );
};

const Cursor = () => {
    const frame = useCurrentFrame();
    return (
        <span style={{
            opacity: Math.floor(frame / 10) % 2 === 0 ? 1 : 0,
            borderLeft: '10px solid #7aa2f7',
            marginLeft: 5
        }} />
    );
};

export const CodingVideo: React.FC = () => {
    const frame = useCurrentFrame();
    const { fps, width, height } = useVideoConfig();

    // Text to type
    const code = [
        "$ npx skills add remotion-dev/skills",
        "✓ Skill added successfully",
        "",
        "$ remotion create --prompt \"3D Coding Motion\"",
        "Searching for assets...",
        "Generating 3D components...",
        "✓ Video generated in 2.4s"
    ];

    // Typing effect logic
    let displayedLines = [];
    let currentLineIndex = 0;
    let accumulatedChars = 0;
    const typingSpeed = 2; // frames per char

    for (let i = 0; i < code.length; i++) {
        const line = code[i];
        const lineStartTime = 45 + (i * 20); // Delay start for each line
        if (frame > lineStartTime) {
            const charsToShow = Math.floor((frame - lineStartTime) / typingSpeed);
            if (charsToShow < line.length) {
                displayedLines.push(line.substring(0, charsToShow));
                break;
            } else {
                displayedLines.push(line);
            }
        }
    }

    return (
        <AbsoluteFill style={{
            backgroundColor: '#0f172a',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            perspective: '2000px'
        }}>
            {/* Background Ambient Glow */}
            <div style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: 1200,
                height: 1200,
                background: 'radial-gradient(circle, rgba(122, 162, 247, 0.15) 0%, transparent 70%)',
                zIndex: 0
            }} />

            {/* Float effect */}
            <div style={{
                transform: `translateY(${Math.sin(frame / 30) * 15}px) rotateX(${Math.sin(frame / 50) * 2}deg) rotateY(${Math.cos(frame / 60) * 3}deg)`,
                zIndex: 1
            }}>
                <Window title="Terminal — Claude Code" frame={frame}>
                    <div style={{ color: '#7aa2f7' }}>
                        {displayedLines.map((line, i) => (
                            <div key={i} style={{ marginBottom: 5 }}>
                                <span style={{ color: '#9ece6a' }}>➜</span> {line}
                                {i === displayedLines.length - 1 && <Cursor />}
                            </div>
                        ))}
                    </div>
                </Window>
            </div>

            {/* Overlay Grid */}
            <div style={{
                position: 'absolute',
                inset: 0,
                backgroundImage: 'linear-gradient(rgba(122, 162, 247, 0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(122, 162, 247, 0.05) 1px, transparent 1px)',
                backgroundSize: '100px 100px',
                transform: `rotateX(60deg) translateY(${frame}px)`,
                transformOrigin: 'top',
                zIndex: 0
            }} />
        </AbsoluteFill>
    );
};
